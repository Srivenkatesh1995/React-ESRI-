import axios from "axios";

export default axios.create({
    baseURL: "http://prod.wyndd.org/geoserver/",
    method: "get",
    mode: "no-cors",
    headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Max-Age": "1728000",
        "Access-Control-Allow-Creadentials": true
    }
});