
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