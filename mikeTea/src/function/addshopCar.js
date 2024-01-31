import axios from "axios";
import { getToken } from "./getToken";

export const addshopCar = async (name, img, indexOne, indexTwo, suger, ice, number) => {
    const token = getToken()

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const params = {
        token: token,
        img: img,
        indexOne: indexOne,
        indexTwo: indexTwo,
        name: name,
        suger: suger,
        ice: ice,
        number: number
    }

    try {
        const res = await axios.post("http://47.113.145.226:3000/addShopCar", params, config)
        return res.data
    }
    catch (error) {
        // router.push({path: "/login"})
        return error
    }
}