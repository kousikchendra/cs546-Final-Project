const fs = require('fs');
const Product = require('../models/product');
const uniqid = require('uniqid');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Listing',
        path: '/admin/add-product',
        editing: false
    });
};
exports.postAddProduct = async(req,res,next) => {
    var imageFile = ((req.files && typeof req.files.image_url !== "undefined") ? (uniqid() +'-'+ req.files.image_url.name) : "");
    if(imageFile != ""){
        var productImage = req.files.image_url;
        var path = 'public/images/'+imageFile;
        productImage.mv(path,function(err){
            if(err){
                return console.log("ERROR IN PRODUCT IMAGE MV "+err);
            }
        });
    }
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const brand = req.body.brand;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        brand: brand,
        imageUrl: '/images/'+imageFile,
        userId: req.user
    });
    product.save().then(result => {
        res.redirect('/admin/products');
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode = 500;
        next(error);
    });
};
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Listing',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode = 500;
        next(error);
    });
};
exports.postEditProduct = async(req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedBrand = req.body.brand;
    var imageFile = ((req.files && typeof req.files.image_url !== "undefined") ? (uniqid() +'-'+ req.files.image_url.name) : "");
    if(imageFile != ""){
        var productImage = req.files.image_url;
        var path = 'public/images/'+imageFile;
        productImage.mv(path,function(err){
            if(err){
                return console.log("ERROR IN PRODUCT IMAGE MV "+err);
            }
        });
    }
    Product.findById(prodId).then(product => {
        if(product.userId.toString() !== req.user._id.toString()){
            return res.redirect('/');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.brand = updatedBrand;
        if(imageFile != ""){
            product.imageUrl = '/images/'+imageFile;
        }
        return product.save().then(result => {
            res.redirect('/admin/products');
        });
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode = 500;
        next(error);
    });
};
exports.getProducts = (req,res,next) => {
    Product.find({userId: req.user._id}).then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'My Listings',
            path: '/admin/products'
        });
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode = 500;
        next(error);
    });
};
exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product=>{
        const fileDelPath = product.imageUrl;
        fs.unlink('./public'+fileDelPath,(err) => {
            if(err){
                next(err);
            }
        });
        return Product.deleteOne({_id: prodId, userId: req.user._id}).then(result=>{
            res.redirect('/admin/products');
        }).catch(err=>console.log(err));
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode = 500;
        next(error);
    });
};
