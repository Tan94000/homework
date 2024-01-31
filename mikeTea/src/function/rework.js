import axios from "axios";

export const rework = async (username, password, newPassword) => {
    const params = {
        username: username,
        password: password,
        newpasswrod: newPassword
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post("http://47.113.145.226:3000/change", params, config)
        return res
    }catch(error){
        return error
    }
}