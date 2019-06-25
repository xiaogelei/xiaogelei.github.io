
//Promise

//then 成功回调
//catch 错误回调

// Promise.prototype.then = resolve
// Promise.prototype.catch = reject

const querystring=require("querystring");
export const ajax={
    get(url,params){
        const promise =new Promise(function(resolve,reject){
            const handler=function(){
                if(this.readyState!==4){
                    return;
                }
                if(this.status==200){
                    resolve({data:this.response});
                }else{
                    reject(new Error(this.statusText))
                }
            }
            var xhr=new XMLHttpRequest();
            xhr.open("GET",url+"?"+querystring.stringify(params),true);
            xhr.responseType="json";
            xhr.setRequestHeader("Accept","application/json");
            xhr.send();
            xhr.onreadystatechange=handler;
        })
        return promise;
    },
    post(){}
}