import axios from "axios";
import { getToken } from "./getToken";

export const getaddress = async () => {
    const token = getToken()

    try{
        const res = await axios.get("http://47.113.145.226:3000/addressall", {
            params: {
                token: token,
                appkey: "sbhyz"
            }
        })
        return res.data
    }
    catch(error){
        return error
    }
}