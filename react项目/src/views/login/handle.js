// 调用硬件必须先执行  设备准备好这个回调 
document.addEventListener("plusready",plusReady,false);
   		
function plusReady(){
    getAuthServices()
}

var auths = null;
// 获取第三方登录的服务列表 
function getAuthServices(){
    plus.oauth.getServices((services)=>{
        auths = services;
        console.log(JSON.stringify(auths));
    },(e)=>{
        plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
    })
}
export const authLogin=(id)=>{
    // console.log("123");
    for(var s in auths){
        if(auths[s].id==id){
            var obj = auths[s];
            obj.login(function(e){
                plus.nativeUI.alert("登录认证成功!");
                obj.getUserInfo( function(e){
                    plus.nativeUI.alert("获取用户信息成功："+JSON.stringify(obj.userInfo));
                }, function(e){
                    plus.nativeUI.alert("获取用户信息失败： "+JSON.stringify(e));
                } );
            }, function(e){
                plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
            } );
        }
    }
}