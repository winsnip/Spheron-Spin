import fs from "fs"
import path from "path"

async function main() {
    const REFRESH_FIREBASE = process.env.REFRESH_FIREBASE ?? ""
    const APIKEY_FIREBASE = process.env.APIKEY_FIREBASE ?? ""
    const PROXY_URL = process.env.PROXY_URL ?? ""
    const data = [
        `REFRESH_FIREBASE=${REFRESH_FIREBASE}`,
        `APIKEY_FIREBASE=${APIKEY_FIREBASE}`,
        `PROXY_URL=${PROXY_URL}`
    ]
    const env = data.join("\n")
    const fileName = path.join(__dirname, "../.env")
    fs.writeFile(fileName,env, error => {
        if(error) {
            console.error(error)
        }else{
            console.log(`successfulyy load env to ${fileName}`)
        }
    } )
}

main().catch(console.error)
