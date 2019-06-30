
import axios from "@/utils/axios"
export const INCREMENT = "increment";
export const increment = (num) => {
    return {
        type: INCREMENT,
        num
    }
}

export const desc = (num) => {
    return {
        type: "desc",
        num
    }
}

export const updateText = (city) => {
    return {
        type: "updateText",
        city
    }
}

export const getBanner = () => {

    return axios.get("/vue/movie", {
        params: {
            limit: 5
        },
    }).then(res => {
        // cb();
        console.log(res)
        return {
            type: "getBanner",
            banner: res.data.result
        }
    })
}

export const changeSelectTabs=(tab)=>{
    return{
        type:"changeSelectTabs",
        tab
    }
}

export const getSuiji=()=>{
    return axios.get("/react/suiji").then(res=>{
        console.log("res",res)
        return {
            type:"getSuiji",
            suiji:res.data.result
        }
    })
}

export const insertBanqu=(type,userid,san)=>{
    return axios.post("/react/setBqu",{
        params:{
            type,
            userid,
            san
        }
    }).then(res=>{
        console.log(res.data.result)
        return {
            type:"insertBanqu",
            banqu:res.data.result,
            suiji2:res.data.result1
        }
    })
}

export const userMing=(ming)=>{
    console.log("进action")
    return {
        type:"userMing",
        ming
    }
}

export const userBanqu=(siyou)=>{
    return axios.get("/react/userBanqu",{
        params:{
            siyou
        }
    }).then(res=>{
        return{
            type:'userBanqu',
            banqu:res.data.result
        }
    })
}

export const setSuiji2=(bq)=>{
    return axios.get("/react/getBoadrs",{
        params:{
            bq
        }
    }).then(res=>{
        return{
            type:'setSuiji2',
            data:res.data.result,
            suiji2:res.data.result1
        }
    })
}

export const getDianshi=(dsId)=>{
    console.log(dsId);
    return axios.get("/react/getDianshi",{
        params:{
            id:dsId
        }
    }).then(res=>{
        return{
            type:"getDianshi",
            data:res.data.result
        }
    })
}

export const selDianshi=(num)=>{
    console.log(num)
    return axios.get("/react/selDianshi",{
        params:{
            num
        }
    }).then(res=>{
        return{
            type:"selDianshi",
            data:res.data.result
        }
    })
}

export const getVideos=()=>{
    return axios.get("/react/getVideos")
    .then(res=>{
        return{
            type:"getVideos",
            shiping:res.data.result
        }
    })
}

export const insertXinx=(shuju)=>{
    return axios.get("/react/insertXinx",{
        params:{
            shuju
        }
    })
    .then(res=>{
        return{
            type:"insertXinx",
            xinxi:res.data.result
        }
    })
}

export const setYonghu=(mobile)=>{
    console.log(mobile)
    return axios.get("/react/setYonghu",{
        params:{
            mobile
        }
    })
    .then(res=>{
        return{
            type:"setYonghu",
            xinxi:res.data.result
        }
    })
}
