const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const fileUpload=require('express-fileupload');
const errorController = require('./controllers/error');
const isAuth = require('./middleware/is-auth');
const User = require('./models/user')
const app = express();
const store = new MongoDBStore({
    uri: 'mongodb+srv://GoatSneakers:FHgyplHgQgHT5ajk@cluster0.dzar7.mongodb.net/GoatSneakers',
    collection: 'sessions'
});
const csrfProtection = new csrf();
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUpload());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'nightwayne', 
    resave: false, 
    saveUninitialized: false,
    store: store
}))
app.use(csrfProtection);
app.use(flash());
app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
});
app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/admin',isAuth);
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get500)
app.use(errorController.get404);
app.use(function(err,req,res,next){
    res.redirect('/500');
});
mongoose.connect('mongodb+srv://GoatSneakers:FHgyplHgQgHT5ajk@cluster0.dzar7.mongodb.net/GoatSneakers?retryWrites=true&w=majority',{useNewUrlParser:true}).then(result => {
    console.log('Connected to local server!');
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
