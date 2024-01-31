import axios from "axios";
import { getToken } from "./getToken"

export const reMymsg = async (name, introduce, tel) => {
    const token = getToken()

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const params = {
        token: token,
        name: name,
        introduce: introduce,
        tel: tel
    }

    try {
        const res = await axios.post("http://47.113.145.226:3000/rework", params, config)
        return res.data
    }
    catch (error) {
        return error
    }
}