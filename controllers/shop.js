const fs = require('fs');
const path = require('path');
const Product = require('../models/product');
const Order = require('../models/order');
const PDFDoc = require('pdfkit');

exports.getProducts = (req,res,next) => {
    const brand = req.query.brand || '';
    if(brand){
        Product.find({brand:brand}).then(products => {
            res.render('shop/product-list', {
                prods: products,
                brand: brand,
                pageTitle: 'All Listings',
                path: '/products'
            });
        }).catch(err => {
            const error = new Error('Error on server side!');
            error.httpStatusCode=500;
            next(error);
        });
    }else{
        Product.find().then(products => {
            res.render('shop/product-list', {
                prods: products,
                brand: brand,
                pageTitle: 'All Listings',
                path: '/products'
            });
        }).catch(err => {
            const error = new Error('Error on server side!');
            error.httpStatusCode=500;
            next(error);
        });
    }
};
exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode=500;
        next(error);
    });
};
exports.getCart = (req,res,next) => {
    req.user.populate('cart.items.productId').execPopulate().then(user => {
        const products = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Cart',
            products: products
        });
    }).catch(err => {
        const error=new Error('Error on server side!');
        error.httpStatusCode=500;
        next(error);
    });
};
exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product);
    }).then(result => {
        res.redirect('/cart');
    });
};
exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode=500;
        next(error);
    });
};
exports.postOrder = (req,res,next) => {
    req.user.populate('cart.items.productId').execPopulate().then(user => {
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity,product: {...i.productId._doc}};
        });
        const order = new Order({
            user: {
                email: req.user.email,
                userId: req.user
            },
            products: products
        });
        return order.save();
    }).then(result => {
        return req.user.clearCart();
    }).then(() => {
        res.redirect('/orders');
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode=500;
        next(error);
    });
};
exports.getOrders = (req,res,next) => {
    Order.find({'user.userId': req.user._id}).then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Orders',
            orders: orders
        });
    }).catch(err => {
        const error = new Error('Error on server side!');
        error.httpStatusCode=500;
        next(error);
    });
};
exports.getInvoice = (req,res,next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId).then(order => {
        if(!order){
            return next(new Error('No order found.'));
        }
        if(order.user.userId.toString() !== req.user._id.toString()){
            return next(new Error('Unauthorized'));
        }
        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);
        const pdfDoc = new PDFDoc();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
        pdfDoc.text('Hello World!');
        pdfDoc.text('Invoice!');
        pdfDoc.end();
    }).catch(err => next(err));
};
