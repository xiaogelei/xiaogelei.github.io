
//react 项目接口的 路由模块
var express=require("express");

var router=express.Router();

var {conn}=require("./utils/db");
var {setError,aesEncrypt,keys}=require("./utils");
var {ObjectID}=require("mongodb");
var {series,waterfall} =require("async");
var util = require('./config/index.js');

router.get("/index",(req,res)=>{
    res.json({
        msg:"这是 react 项目的后台接口路径"
    })
})

//获取所有评论
router.get("/getComments",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("comments").find({},{}).sort({_id:1}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"评论查询成功",
                result
            })
            db.close();
        })
    })
})

//删除评论
router.get("/delComment",(req,res)=>{
    var _id=req.query._id || "";
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("comments").remove({_id:ObjectID(_id)},(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"评论删除成功",
                result
            })
            db.close();
        })
    })
})

//添加评论
//先插入  再查询
router.post("/addComment",(req,res)=>{
    var body=req.body;
    console.log(body);
    conn((err,db)=>{
        setError(err,res,db);
        var comments=db.collection("comments");
        series([
            (callback)=>{
                comments.insert(body,(err,result)=>{
                    callback(err,result);
                })
            },
            (callback)=>{
                comments.find({},{}).sort({_id:1}).toArray((err,result)=>{
                    callback(err,result);
                })
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"评论添加成功",
                result:result[1]
            })
            db.close();
        })
    })
})

// 短信验证码接口
// 生成验证码的函数
function getCode(){
    return 1000 + Math.floor(Math.random() * 9000);
}

//获取短信验证码
router.post('/sendCode',function(req,res,next){
    console.log(req.body);
    const mobile=req.body.mobile; //需要发送的号码
    var param=getCode() //变量内容 需要发送手机的验证码
    console.log(param);

    if(mobile==''){
        res.json({
            msg:"手机号不能为空",
            code:200
        })
    }else{
        // 云之讯发送验证码到手机 
        util.getResult(param, mobile).then(function(response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {  // 发送成功 
                conn((err,db)=>{
                    setError(err,res,db);
                    var codes = db.collection("codes");
                    // 数据库 判断验证码是否存在 
                    // 验证码不存在 直接插入
                    // 发送的验证码相同  改变插入时间 
                    waterfall([
                        (callback)=>{
                            codes.findOne({mobile},(err,result)=>{
                                callback(err,result);
                            })
                        },
                        (args,callback)=>{
                            if(args){
                                // 修改数据 时间
                                var time =  new Date().getTime();
                                codes.update({
                                    mobile
                                },{
                                    $set:{
                                        time,
                                        code:param
                                    }
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }else{
                                // 直接插入 
                                codes.insert({
                                    mobile,
                                    code:param,
                                    time: new Date().getTime(),
                                    username:"",
                                    usersex:"未知",
                                    userImg:"img1"
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }
                        }
                    ],(err,result)=>{
                        setError(err,res,db);
                        res.json({
                            msg:"验证码发送成功",
                            result:param,
                            code:200
                        })
                    })
                })
            } else {
               res.json({
                   msg:"发送验证码失败",
                   code:200
               })
            }
    
        }, function(err) {
            res.json({
                msg:"云之讯数据库错误",
                code:200
            })
        })
    }
})

// 接收验证码  判断验证码 正确 
router.post("/testCode",(req,res)=>{
    var mobile = req.body.mobile;
    var code = req.body.code * 1;

    conn((err,db)=>{
        setError(err,res,db);
        var codes = db.collection("codes");

        codes.findOne({mobile,code},(err,result)=>{
            setError(err,res,db);
            if(result){
                var time = new Date().getTime();
                var alias = mobile + "wh1901" + code ;
                var token = aesEncrypt(alias,keys);
                req.session.token = token;
                if(time-result.time<60*1000){
                    res.json({
                        code:200,
                        msg:"验证码通过",
                        type:1,
                        token,
                        result
                    })
                }else{
                    res.json({
                        code:200,
                        msg:"验证码失效",
                        type:0,
                    })
                }
            }else{
                res.json({
                    msg:"验证码不匹配",
                    code:200,
                    type:0
                })
            }
        })

    })

})

// 查看版区
router.get("/getBoadrs",(req,res)=>{
    var bq=req.query.bq;
    conn((err,db)=>{
        setError(err,res,db);
        series([
            (callback)=>{
                db.collection("dongman").updateMany({},{$set:{typeC:"+加入"}},(err,result)=>{
                    callback(err,result);
                })
            },
            (callback)=>{
                if(bq){
                    db.collection("dongman").updateMany({title:{$in:bq}},{$set:{typeC:"已加入"}},(err,result)=>{
                        callback(err,result);
                    })
                }else{
                    callback(err,null);
                }
            },
            (callback)=>{
                db.collection("dongman").find({},{}).sort({_id:1}).toArray((err,result)=>{
                    callback(err,result);
                    // console.log(result)
                })
            },
            (callback)=>{
                db.collection("dongman").find({num:{$in:[10,20,30]}},{}).sort({_id:1}).toArray((err,result)=>{
                    callback(err,result);
                })
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"查询成功",
                result:result[2],
                result1:result[3]
            })
            db.close();
        })       
    })
})

//查询发贴量最多的版区
router.get("/getBoadrsCount",(req,res)=>{
    conn((err,db)=>{
        db.collection("dongman").find({},{}).sort({member:-1}).limit(9).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"查询成功",
                result
            })
            db.close();
        })
    })
})

// 查看电视列表
router.get("/getTelevision",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("dianshi").find({},{}).sort({_id:1}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"查询成功",
                result
            })
            db.close();
        })
    })
})

//随机三个版区
router.get("/suiji",(req,res)=>{
    var aa,bb,cc;
    aa=Math.floor(Math.random()*104)+1;
    bb=Math.floor(Math.random()*104)+1;
    cc=Math.floor(Math.random()*104)+1;
    if(bb==aa){
        bb=Math.floor(Math.random()*104)+1;
    }else{
        if(cc==bb||cc==aa){
            cc=Math.floor(Math.random()*104)+1;
        }else{
            // console.log(aa,bb,cc)
            conn((err,db)=>{
                setError(err,res,db);
                db.collection("dongman").find({
                    num:{
                        $in:[aa,bb,cc]
                    }
                }).toArray((err,result)=>{
                    // console.log(result)
                    setError(err,res,db);
                    res.json({
                        code:200,
                        msg:"查询成功",
                        result
                    })
                    db.close();
                })
            })
        }
    }
})

//添加版区
router.post("/setBqu",(req,res)=>{
    var body=req.body;
    console.log(body.params.san);
    conn((err,db)=>{
        setError(err,res,db);
        waterfall([
            (callback)=>{
                db.collection("dongman").findOne({num:body.params.type},(err,result)=>{
                    callback(err,result);
                    // console.log(result)
                })
            },
            (args,callback)=>{
                // console.log(args)
                // args.userId=1;
                db.collection("userBoadrs").insert({
                    spId:args._id,
                    sptitle:args.title,
                    spimg:args.imgs,
                    spUsed:body.params.userid
                },(err,result)=>{
                    callback(err,result);
                })
            },
            (args1,callback)=>{
                var id=args1.ops[0].spId;
                // console.log(id)
                db.collection("dongman").update({_id:ObjectID(id)},{$set:{typeC:'已加入'}},(err,result)=>{
                    callback(err,result);
                })
            },
            (args2,callback)=>{
                // console.log(body.params.userid)
                db.collection("userBoadrs").find({
                    spUsed:body.params.userid
                }).toArray((err,result)=>{
                    callback(err,result);
                })
            },
            (args3,callback)=>{
                db.collection("dongman").find({
                    _id:{
                        $in:[
                            ObjectID(body.params.san[0]._id),
                            ObjectID(body.params.san[1]._id),
                            ObjectID(body.params.san[2]._id)
                        ]
                    }
                }).toArray((err,result)=>{
                    callback(err,result,args3);
                })
            }
        ],(err,result,args3)=>{
            setError(err,res,db);
            console.log(args3)
            res.json({
                code:200,
                msg:"添加成功",
                result:args3,
                result1:result
            })
        })
    })
})

//查询用户的版区
router.get("/userBanqu",(req,res)=>{
    var query=req.query.siyou;
    if(query){
        console.log(query)
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("userBoadrs").find({
                spUsed:query
            }).toArray((err,result)=>{
                setError(err,res,db);
                // console.log(result)
                res.json({
                    code:200,
                    msg:"查询成功",
                    result
                })
            })
        })
    }
})

//查询影片详情
router.get("/getDianshi",(req,res)=>{
    var query=req.query.id;
    if(query){
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("dianshi").findOne({
                _id:ObjectID(query)
            },(err,result)=>{
                setError(err,res,db);
                console.log(result)
                res.json({
                    code:200,
                    msg:"查询成功",
                    result
                })
            })
        })
    }
})

//搜索电视剧
router.get("/selDianshi",(req,res)=>{
    var query=req.query.num;
    if(query){
        console.log(query)
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("dianshi").find({
                zbiaoti:new RegExp(query)
            }).toArray((err,result)=>{
                setError(err,res,db);
                console.log(result)
                res.json({
                    code:200,
                    msg:"查询成功",
                    result
                })
            })
        })
    }
})

//查询所有的小视频
router.get("/getVideos",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("videos").find({},{}).toArray((err,result)=>{
            setError(err,res.db);
            res.json({
                code:200,
                msg:"查询成功",
                result
            })
        })
    })
})

//插入qq信息或者微信信息
router.get("/insertXinx",(req,res)=>{
    var yonghuid=req.query.shuju.headimgurl.split("/")[5];
    var nickname=req.query.shuju.nickname;
    var gender=req.query.shuju.gender;
    var headimgurl=req.query.shuju.figureurl_qq;
    conn((err,db)=>{
        setError(err,res,db);
        waterfall([
            (callback)=>{
                db.collection("codes").findOne({mobile:yonghuid},(err,result)=>{
                    callback(err,result);
                })
            },
            (agrs,callback)=>{
                if(args){
                    db.collection("codes").updateOne(
                        {
                            mobile:yonghuid
                        },
                        {
                            $set:{
                                username:nickname,
                                usersex:gender,
                                userImg:headimgurl
                            }
                        },(err,result)=>{
                        callback(err,result);
                    })
                }else{
                    db.collection("codes").insert({
                        mobile:yonghuid,
                        username:nickname,
                        usersex:gender,
                        userImg:headimgurl
                    },(err,result)=>{
                        callback(err,result);
                    })
                }
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"登录成功",
                result:param,
                code:200
            })
        })
    })
})

//查询用户信息,防止刷新信息丢失
router.get('/setYonghu',(req,res)=>{
    var query=req.query.mobile;
    console.log(query)
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("codes").findOne({mobile:query},{},(err,result)=>{
            setError(err,res.db);
            res.json({
                code:200,
                msg:"查询成功",
                result
            })
        })
    })
})
module.exports=router;