import "dotenv/config"
import { fetchWithProxyUndici } from "../utils/ip"
import { getIdToken } from "./access"
import { header } from "./header"

const { PROXY_URL = "" } = process.env
const url = "https://tge.spheron.network/api/auth/loginWithFirebase"

export async function setCookie() {
    const idToken = await getIdToken()
    try {
        const response = await fetchWithProxyUndici({
            url: url,
            proxyUrl: PROXY_URL,
            method: "POST",
            headers: {
                ...header,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idToken": idToken
            })
        })
        const cookie = response.headers["set-cookie"]?.toString().split(";")[0]
        return cookie
    } catch (error) {
        console.error(error)
    }    
}