/*
docs: 
https://firebase.google.com/docs/reference/rest/auth
*/

import "dotenv/config"
import { fetchWithProxyUndici } from "../utils/ip"

const {
    REFRESH_FIREBASE = "", 
    APIKEY_FIREBASE = "",
    PROXY_URL = ""
} = process.env
const baseURL = "https://securetoken.googleapis.com/v1/token"


export async function getIdToken() {
    const url = new URL(baseURL)
    url.searchParams.append("key",APIKEY_FIREBASE)
    try {
        const response = await fetchWithProxyUndici({
            url: url.href,
            proxyUrl: PROXY_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "grant_type": "refresh_token",
                "refresh_token": REFRESH_FIREBASE
            }).toString()
        })
        const data = JSON.parse(response.body)
        return data.id_token
    } catch (error) {
        console.error(error)
    }
}

getIdToken().catch(console.error)