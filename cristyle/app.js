const express = require ('express');
const path = require ('path');

const app = express ();

const publicPath = path.resolve (__dirname, './public');

app.use(express.static (publicPath));

app.set("view engine", "ejs");

app.set('puerto', process.env.PORT || 3500);
app.listen (app.get('puerto'), () => {
    console.log ( 'Servidor Funcionando')
} );

app.get('/',(req,res)=>{
    res.render (path.resolve (__dirname, './views/index.ejs'))
});

app.get('/login',(req,res)=>{
    res.render (path.resolve (__dirname, './views/login.ejs'))
});

app.get('/register',(req,res)=>{
    res.render (path.resolve (__dirname, './views/register.ejs'))
});

app.get('/productCart',(req,res)=>{
    res.render (path.resolve (__dirname, './views/productCart.ejs'))
});

app.get('/productDetail',(req,res)=>{
    res.render (path.resolve (__dirname, './views/productDetail.ejs'))
});
