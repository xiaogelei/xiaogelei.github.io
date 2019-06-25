import { INCREMENT } from "../actions";

const defaultState={
    count:1314,
    city:"武汉",
    list:[],
    foots:[
        {txt:"首页",path:"/app/home",name:"home",icon:"icon-home",on:"home-on.png",off:"home-off.png"},
        {txt:"版区",path:"/app/boadrs",name:"boadrs",icon:"icon-goodsfill"},
        {txt:"消息",path:"/app/message",name:"message",icon:"icon-shop_car"},
        {txt:"我",path:"/app/my",name:"my",icon:"icon-minefill"}
    ],
    selectedTab:"home",
}

export const reducers=(state=defaultState,action)=>{
    console.log("-------------------",action.type)
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
            console.log("++++++++",state,action.banner)
            return {...state,list:action.banner}
            break;
        case "changeSelectTabs":
            return {...state,selectedTab:action.tab}
            break;
        default:
            return state;
            break;
    }
}