

//vue 项目接口的 路由模块

var express=require("express");

var router=express.Router();

var {conn}=require("./utils/db");
var {setError,aesEncrypt,keys}=require("./utils");
var {ObjectID}=require("mongodb");

// 登录
router.post("/login",(req,res)=>{
    var body = req.body;
    console.log("body ==== ")
    console.log(body);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("userinfo").findOne({name:body.username},(err,result)=>{
            setError(err,res,db);
            console.log(result);
            if(result){
                const token = aesEncrypt(body.username+new Date().getTime(),keys);
                req.session.token=token;
                res.json({
                    code:200,
                    msg:"登录成功",
                    type:1,
                    token
                })
            }else{
                res.json({
                    code:200,
                    msg:"登录失败-login",
                    type:0
                })
            }
        })
    })
}) 

//注册
router.post("/register",(req,res)=>{
    var body=req.body.params;
    console.log(body);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("userinfo").findOne({name:body.username},(err,result)=>{
            setError(err,res,db);
            console.log(result);
            if(result){
                res.json({
                    msg:"用户名已经被注册",
                    code:200
                })
            }else{
                db.collection("userinfo").insert(({name:body.username,pwd:body.userpwd}),(err,result)=>{
                    setError(err,res,db);
                    res.json({
                        msg:"注册成功",
                        code:200
                    })
                })
            }
            db.close();
        })
    })
})

//根据type读取商品信息
router.get("/getGoodsList",(req,res)=>{
    var query = req.query;
    var limit  = query.limit * 1 || 0;
    var keyword = query.keyword;
    console.log(keyword)
    var obj = {};
    if(keyword){
        obj = {
            $or:[
                {title:new RegExp(keyword)},
                {type:new RegExp(keyword)}
            ]
        }
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("goods").find(obj,{}).sort({_id:-1}).limit(limit).toArray((err,result)=>{
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

//根据商品id 获取商品详情
router.get("/getGoodOne",(req,res)=>{
    var goodId=req.query.goodId;
    var obj={};
    if(goodId){
        obj._id=ObjectID(goodId);
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("goods").findOne(obj,(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"查询商品详情数据成功",
                code:200,
                result
            })
            db.close();
        })
    })
})

//把商品信息插入到购物车表
router.get("/setGoodGuwu",(req,res)=>{
    var Xinxi=req.query;
    if(Xinxi.gname!=""){
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("shopping").findOne({goodID:Xinxi.gId,uName:Xinxi.gname},(err,result)=>{
                setError(err,res,db);
                // console.log(result.goodNum);
                if(result){
                    var Xnum=result.goodNum*1+Xinxi.gNum*1;
                    db.collection("shopping").update({uName:Xinxi.gname,goodID:Xinxi.gId},{$set:{goodNum:Xnum}},(err,result)=>{
                        setError(err,res,db);
                        res.json({
                            msg:"添加成功",
                            code:200,
                            result
                        })
                        db.close();
                    })
                }else{
                    db.collection("shopping").insert({
                        uName:Xinxi.gname,goodID:Xinxi.gId,goodImg:Xinxi.gImg,goodtitle:Xinxi.gTitle,goodPrice:Xinxi.gPrice,goodNum:Xinxi.gNum}
                        ,(err,result)=>{
                            setError(err,res,db);
                            res.json({
                                msg:"添加成功",
                                code:200,
                                result
                            })
                            db.close();
                    })
                }
            }) 
        })
    }else{
        res.json({
            msg:"用户名已经过期,请重新登录",
            code:200,
        })
    }
})

//查询该用户的所有商品
router.get("/setGood",(req,res)=>{
    var quanbu=req.query;
    if(quanbu.gname!=""){
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("shopping").find({uName:quanbu.gname}).toArray((err,result)=>{
                setError(err,res,db);
                console.log(result)
                res.json({
                    msg:"查询成功",
                    code:200,
                    result
                })
                db.close();
            }) 
        })
    }else{
        res.json({
            msg:"用户名已经过期,请重新登录",
            code:200
        })
    }
})

//购物车删除商品
router.get("/deleteOne",(req,res)=>{
    var quanbu=req.query.gid;
    var obj={};
    if(quanbu){
        obj._id=ObjectID(quanbu);
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("shopping").deleteOne(obj,(err,result)=>{
            setError(err,res,db);
            console.log(result)
            res.json({
                msg:"删除成功",
                code:200,
            })
            db.close();
        }) 
    })
})

//新增用户地址
router.post("/inUserSite",(req,res)=>{
    var Udizhi=req.body.params;
    var dizhi2=Udizhi.province+"_"+Udizhi.city+"_"+Udizhi.county+"_"+Udizhi.addressDetail;
    console.log(Udizhi);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("UserSite").insert({
            id:Udizhi.length+1,
            sName:Udizhi.username,
            name:Udizhi.name,
            tel:Udizhi.tel,
            address:dizhi2,
            postalCode:Udizhi.postalCode,
            isDefault:Udizhi.isDefault,
            areaCode:Udizhi.areaCode
        },(err,result1)=>{
            setError(err,res,db);
            console.log(result1)
            res.json({
                msg:"添加成功",
                code:200,
            })
            db.close();
        })
        // db.collection("UserSite").find({
        //     sName:Udizhi.username
        // }).toArray((err,result)=>{
        //     setError(err,res,db);
        //     console.log(result);
            
        // })
    })
})

//查询用户地址
router.post("/SelUserSite",(req,res)=>{
    var Udizhi=req.body.params;
    console.log(Udizhi);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("UserSite").find({
            sName:Udizhi
        }).toArray((err,result)=>{
            setError(err,res,db);
            console.log(result)
            res.json({
                msg:"查询成功",
                code:200,
                result
            })
            db.close();
        })
    })
})

//修改用户地址
router.post("/upUserSite",(req,res)=>{
    var Udizhi=req.body.params;
    var dizhi2=Udizhi.province+"_"+Udizhi.city+"_"+Udizhi.county+"_"+Udizhi.addressDetail;
    var id=ObjectID(Udizhi._id);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("UserSite").update({
            _id:id
        },
        {
            $set:{
                name:Udizhi.name,
                tel:Udizhi.tel,
                address:dizhi2,
                postalCode:Udizhi.postalCode,
                isDefault:Udizhi.isDefault,
                areaCode:Udizhi.areaCode
            }
        },(err,result2)=>{
            setError(err,res,db);
            console.log(result2)
            res.json({
                msg:"修改成功",
                code:200,
            })
            db.close();
        })
    })
})

//删除用户地址
router.post("/delUserSite",(req,res)=>{
    var Udizhi=req.body.params;
    console.log(Udizhi)
    var obj={};
    if(Udizhi){
        obj._id=ObjectID(Udizhi._id);
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("UserSite").deleteOne(obj,(err,result3)=>{
            setError(err,res,db);
            // console.log(result3);
            db.collection("UserSite").updateMany(
                {
                    id:{
                        $gt:Udizhi.id
                    }
                },
                {
                    $inc:{
                        id:-1
                    }
                },
                (err,result4)=>{
                    setError(err,res,db);
                    res.json({
                        msg:"删除成功",
                        code:200
                    })
                    db.close();
                }
            )
        })
    })
})

module.exports=router;