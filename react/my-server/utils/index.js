
/*
*** 加密 模块 crypto  Node 

*/ 


var crypto = require("crypto"); // node 模块 

// 加密函数
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1901";
// daydayup   daydayup+wuhan1807
exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 



/*
***  数据库错误  500 
**   返回结果给前端
*/ 
function setError(err,res,db){
    if(err){
        res.json({
            statusCode:500,
            msg:"数据库错误",
            err
        })
        db.close();
        throw err;
    }
}
exports.setError = setError;


/*
***  判断用户是否登录  500 
**   
*/ 
exports.checkIsLogin = function(req,res,next){
    // var token = req.session.token;
    // if(token){
    //     callback();  // 书写业务逻辑 
    // }else{
    //     res.send(`<script>alert('session已经过期,请重新登录');location.href='/login'</script>`)
    // }
    console.log("检测--------------token");
    console.log(req.path);
    if(req.path!=="/vue/login"&&req.path!=="/react/sendCode"&&req.path!=="/react/testCode"){
        // 判断 token 
        const res_token = req.headers.token;   // 前端 请求头带过来 的token 
        console.log(res_token);
        if(res_token){
            const req_token = req.session.token;   // 后端登录 成功存储  token 
            if(req_token){
                if(req_token==res_token){
                    next();  // token 通过 
                }else{
                    res.json({
                        code:401,
                        msg:"token 不匹配 ,请重新登录",
                        type:0
                    })
                }
            }else{
                res.json({
                    code:401,
                    msg:"token 过期 ,请重新登录",
                    type:0
                })
            }
        }else{
            res.json({
                code:401,
                msg:"token 不存在,请马上登录",
                type:0
            })
        }
        
    }else{
        next()
    }
}


//配置 login 登录的中间件
var {conn} = require("./db");
exports.login = function(req,res,next){
    next();
}


/*
***  获取解密的用户名 
**   
*/ 
exports.username = function(req){
    return aesDecrypt(req.session.token,keys)
}


exports.dateFormat = function(time){
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;

}