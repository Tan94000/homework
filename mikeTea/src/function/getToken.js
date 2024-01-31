import { ref } from "vue"

export const getToken = () => {
    const token = ref("")

    if(!localStorage.getItem("token")) token.value = ""
    else token.value = localStorage.getItem("token")

    return token.value
}