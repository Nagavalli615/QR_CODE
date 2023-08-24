const path = require('path');
const ejs = require('ejs');
const express = require('express');
const QR  =require('qrcode');
const app = express();
const bp = require('body-parser')
const port = process.env.port || 3000;

app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));

app.get('/',(req,res,next)=>{
    res.render('index');
});
app.post("/scan",(req,res,next)=>{
    const Input = req.body.text;
    QR.toDataURL(Input,(err,src)=>{
        if(err){
            res.send('error while load qr code')
        }
        res.render("scan", { src }); 
    })
})

app.listen(port,console.log(`Listen on ${port}`));

