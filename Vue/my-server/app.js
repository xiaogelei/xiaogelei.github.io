

var express=require("express");

var app=express();

var hostname="0.0.0.0";

var port=1901;

var http=require("http");

var server=http.createServer(app);

app.use(express.json());   // req.body 来 获取 POST 请求 提交的 formData 数据 
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// 处理跨域方法   CORS 处理方式 
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

var session = require("express-session");

// 设置 session 中间件  在路由中间件之前 
app.use(session({
  secret:"keyboard cat",
  name:"appTest",
  cookie:{maxAge:60*60*1000},
  resave:false,
  saveUninitialized:true
}));

var {login} = require("./utils/index");
app.use(login);

var {checkIsLogin}=require("./utils/index");
// app.use(checkIsLogin);


app.get("/",(req,res)=>{
    res.send("这是我所有项目的接口服务器地址");
})

app.get("/index",(req,res)=>{
    res.json({
        msg:"获取数据成功"+req.query,
        code:200,
        type:1
    })
})

var vue=require("./vue");
// var react=require("./react");
app.use("/vue",vue);
// app.use("/react",react);

server.listen(
    port,hostname,()=>{
        console.log(`my server is running at http://${hostname}:${port}`)
    }
)

