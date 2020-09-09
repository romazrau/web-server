const express = require("express");
const app = express();

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.get('/', (req, res)=>{
    res.send("Hi");
})





//靜態資料夾
app.use( express.static('public') );


//樣板
app.set('view engine', 'ejs');
app.get('/home' , (req, res)=>{
    res.render('home', { name: "PJJ" })
});


//回傳檔案
app.get('/member', (req, res) => {

    const data = require(__dirname + "/../data/member.json");
    // res.json(  data );
    res.render('member', {member: data});
})



//request query string
app.get('/try-query' , (req, res)=>{
    res.json( req.query );
});


//post
app.post('/try-post', (req, res)=>{
    res.json(req.body);
});




// D2 get and post
app.get('/try-post-form', (req, res)=>{
    res.render('D2_try_post');
})

app.post('/try-post-form', (req, res)=>{
    res.render('D2_try_post', req.body);
})


// D2 multer 檔案上傳
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads' });
const fs = require('fs');
const { v4:uuidv4 } = require('uuid');

app.post('/try-img',upload.single('avatar')  , (req, res)=>{
    // res.json(req.file);
    if(req.file && req.file.originalname){

        if(/\.(jpg|jpeg|png|gif)$/i.test(req.file.originalname)){
            let fileTo = './public/img_uploads/' + uuidv4() + req.file.originalname;
            fs.rename(req.file.path, fileTo, error => {
                res.json({result:true, msg:"success", fileName: fileTo});
            })
        }else{
            fs.unlink(req.file.path, error => {
                res.json({result:false, msg:"file is not img"});

            })
        }

    }else{
        res.json({ result:false, msg:"沒有接收到檔案" })
    }

})


// D2 multer module 檔案上傳
const upload2 = require('./upload-module');

app.post("/try-img-module", upload2.single('myimg'), (req, res)=>{
    res.json({
        file:req.file,
        body:req.body
    });
})

//多個檔案
app.post("/try-imgs-module", upload2.array('myimgs' , 10), (req, res)=>{
    res.json({
        files:req.files,
        body:req.body
    });
})



// request parameter
app.get("/my-params/:my1?/:my2?", (req, res)=>{
    res.json(req.params);
})


// D3  router module
app.use((req, res, next)=>{
    res.locals.mydataName = "PJ";
    res.locals.myObj = {name: "pj", age: 29};
    res.locals.name = "Bad PJ";

    next();
})



// D3  router module
const adminsRouter = require("./admins/admin2");

app.use('/admins', adminsRouter);


// D3 session 
const session = require('express-session');
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'pjjppnicepj',
    cookie: {
        maxAge: 1000 * 60 * 20,
    }
}))

app.get("/try-session",  (req, res)=>{

    req.session.userCount = req.session.userCount || 0;
    req.session.userCount++;
    res.json({
        'count': req.session.userCount,
    });
})


// D3 mpment
const moment = require('moment-timezone');
app.get("/try-moment",  (req, res)=>{

    const fm = 'YYYY-MM-DD HH:mm:ss';

    const moCookie = moment(req.session.cookie.expires);
    const moNow = moment(new Date());


    res.json({
        'now-orgin': moNow,

        'Now': moNow.format(fm),
        'cookie': moCookie.format(fm),
       
        'Now-London':  moNow.tz('Europe/London').format(fm)
    });
})


//D3 SQL SELECT  LIST
const sqllistRouter = require('./routers/sqllist');
app.use('/sql' , sqllistRouter );










// 404 放在 router 最後面
app.use((req, res)=>{
    res.status(404);
    res.send("<h2>404 - Not Found</h2>");
})


app.listen(3500 , () => { console.log("server listen on 3500"); })