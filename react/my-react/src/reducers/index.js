import { INCREMENT } from "../actions";

const defaultState={
    count:1314,
    city:"武汉",
    list:[],
    foots:[
        {txt:"首页",path:"/app/home",name:"home",icon:"iconfont icon-shouye",on:"home-on.png",off:"home-off.png"},
        {txt:"版区",path:"/app/boadrs",name:"boadrs",icon:"iconfont icon-shequ"},
        {txt:"视频",path:"/app/message",name:"message",icon:"iconfont icon-shipin"},
        {txt:"我",path:"/app/my",name:"my",icon:"iconfont icon-wode"}
    ],
    selectedTab:"home",
    // suiji:[10,20,30],
    suiji2:[
        // {"title":"配音/声控","imgs":"https://image.diyidan.net/tag/2016/12/29/VP9DO9oO48zn3Kde.jpg!tiny2","member":"1843000","works":"29547000","typeA":"影音","typeB":"次元之声","num":10},
        // {"title":"女装乐园","imgs":"https://image.diyidan.net/post/2017/11/9/liN7rlv2qbIHDfUT.jpg!tiny2","member":"167000","works":"1754000","typeA":"次元","typeB":"装扮","num":20},
        // {"title":"萌宠","imgs":"https://image.diyidan.net/post/2017/7/17/qKagvqfalf6lpOaX.jpg!tiny2","member":"88000","works":"1205000","typeA":"日常","typeB":"日常娱乐","num":30}
    ],
    banqu:[],
    user:[
        // { _id : "5d10cac4467f4c1f04e7f3bf", mobile : "15571230395", code: 7397, time : 1561615218682 }
    ],
    data:[],
    dianshiXQ:[],
    sou:[],
    shiping:[]
}

export const reducers=(state=defaultState,action)=>{
    switch(action.type){
        case "countAdd":
            return {...state,count:++state.count}
            break;
        case INCREMENT:
            return {...state,count:state.count+action.num}
            break;
        case "desc":
            return {...state,count:state.count-action.num}
            break;
        case "updateText":
            return {...state,city:action.city}
            break;
        case "getBanner":
            // console.log("++++++++",state,action.banner)
            return {...state,list:action.banner}
            break;
        case "changeSelectTabs":
            return {...state,selectedTab:action.tab}
            break;
        case "getSuiji":
            return {...state,suiji2:action.suiji}
            break;
        case "insertBanqu":
            return {...state,banqu:action.banqu,suiji2:action.suiji2}
            break;
        case "userMing": 
            return {...state,user:action.ming}
            break;
        case "userBanqu":
            console.log("进reducers"+action.banqu)
            return {...state,banqu:action.banqu}
            break;
        case "setSuiji2":
            return {...state,suiji2:action.suiji2,data:action.data}
            break;
        case "getDianshi":
            return {...state,dianshiXQ:action.data}
            break;
        case "selDianshi":
            return {...state,sou:action.data}
            break;
        case "getVideos":
            return {...state,shiping:action.shiping}
            break;
        case "insertXinx":
            return {...state,user:action.xinxi}
            break;
        case "setYonghu":
            return {...state,user:action.xinxi}
            break;
        default:
            return state;
            break;
    }
}