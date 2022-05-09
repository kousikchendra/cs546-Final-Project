@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
*{box-sizing:border-box;}
body{padding:0;margin:0;font-family:'Open Sans', sans-serif;}
main{padding:1rem;margin:auto;}
form{display:inline;}
.centered{text-align:center;}
.image{height:20rem;}
.image img{height:100%;}
.main-header{width:100%;height:3.5rem;background-color:#00695c;padding:0 1.5rem;display:flex;align-items:center;}
.main-header__nav{height:100%;width:100%;display:none;align-items:center;justify-content:space-between;}
.main-header__item-list{list-style:none;margin:0;padding:0;display:flex;}
.main-header__item{margin:0 1rem;padding:0;}
.main-header__item a,
.main-header__item button{font:inherit;background:transparent;border:none;text-decoration:none;color:white;cursor:pointer;}
.main-header__item a:hover,
.main-header__item a:active,
.main-header__item a.active,
.main-header__item button:hover,
.main-header__item button:active{color:#ffeb3b;}
.mobile-nav{width:30rem;height:100vh;max-width:90%;position:fixed;left:0;top:0;background:white;z-index:10;padding:2rem 1rem 1rem 2rem;transform:translateX(-100%);transition:transform 0.3s ease-out;}
.mobile-nav.open{transform:translateX(0);}
.mobile-nav__item-list{list-style:none;display:flex;flex-direction:column;margin:0;padding:0;}
.mobile-nav__item{margin:1rem;padding:0;}
.mobile-nav__item a,
.mobile-nav__item button{font:inherit;text-decoration:none;color:black;font-size:1.5rem;padding:0.5rem 2rem;background:transparent;border:none;cursor:pointer;}
.mobile-nav__item a:active,
.mobile-nav__item a:hover,
.mobile-nav__item a.active,
.mobile-nav__item button:hover,
.mobile-nav__item button:active{background:#00695c;color:white;border-radius:3px;}
#side-menu-toggle{border:1px solid white;font:inherit;padding:0.5rem;display:block;background:transparent;color:white;cursor:pointer;}
#side-menu-toggle:focus{outline:none;}
#side-menu-toggle:active,
#side-menu-toggle:hover{color:#ffeb3b;border-color:#ffeb3b;}
.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0, 0, 0, 0.5);z-index:5;display:none;}
.grid{display:flex;flex-wrap:wrap;align-items:stretch;}
.card{box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);}
.card__header,
.card__content{padding:1rem;}
.card__header h1,
.card__content h1,
.card__content h2,
.card__content p{margin:0;}
.card__image{width:100%;height:10rem;text-align:center;}
.card__image img{max-width:100%;max-height:100%;}
.card__actions{padding:1rem;text-align:center;}
.card__actions button,
.card__actions a{margin:0 0.25rem;}
.btn{display:inline-block;padding:0.25rem 1rem;text-decoration:none;font:inherit;border:1px solid #00695c;color:#00695c;background:white;border-radius:3px;cursor:pointer;}
.btn:hover,
.btn:active{background-color:#00695c;color:white;}
.btn.danger{color:red;border-color:red;}
.btn.danger:hover,
.btn.danger:active{background:red;color:white;}
.user-message{margin:auto;width:90%;border:1px solid #4771fa;padding:0.5rem;border-radius:3px;background:#b9c9ff;text-align:center;}
.user-message--error{border-color:red;background:rgb(255, 176, 176);color:red;}
.pagination{margin-top:2rem;text-align:center;}
.pagination a{text-decoration:none;color:#00695c;padding:0.5rem;border:1px solid #00695c;margin:0 1rem;}
.pagination a:hover,
.pagination a:active,
.pagination a.active{background:#00695c;color:white;}
.bi-custom-container{display:flex;flex-direction:row;}
.bi-custom-container .grid{flex:1;}
.filter-wrap{width:300px;display:flex;flex-direction:column;margin-top:1rem;}
.filter-wrap .filter-heading{background:#f9f9f9;padding:10px 20px;font-size:15px;font-weight:600;}
.filter-wrap .filter-form{background:#fff;padding:20px;display:flex;flex-direction:column;row-gap:20px;}
.filter-wrap .filter-form .bi-form-control{padding:8px 15px;border:1px solid #ddd;border-radius:6px;}
.filter-wrap .filter-form .btn{display:flex;align-items:center;justify-content:center;padding:10px 30px;align-self:center;background:#00695c;color:#fff;}
@media (min-width:768px){
    .main-header__nav{display:flex;}
    #side-menu-toggle{display:none;}
    .user-message{width:30rem;}
}
