
const url=require("url");
export function getQuery(search){
    return url.parse(search,true).query;
}