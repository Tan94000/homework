import axios from "axios"
import { getToken } from "./getToken"

export const getMymsg = async () => {
    const token = getToken()
    if (token === "") return "未登录"

    try {
        const response = await axios.get("http://47.113.145.226:3000/look", {
            params: {
                token: token,
                appkey: "sbhyz"
            }
        })
        return response.data
    } catch (error) {
        return "未登录"
    }
}