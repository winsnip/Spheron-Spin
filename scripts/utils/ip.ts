import "dotenv/config"
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders, Method} from "axios"
import { SocksProxyAgent } from "socks-proxy-agent"
import { HttpsProxyAgent } from "https-proxy-agent"
import { request, ProxyAgent } from "undici"

function getProxyAgent(proxyUrl: string){
    if(proxyUrl.startsWith("socks4://") || proxyUrl.startsWith("socks5://")){
        return new SocksProxyAgent(proxyUrl)
    }else if(proxyUrl.startsWith("http://") || proxyUrl.startsWith("https://")){
        return new HttpsProxyAgent(proxyUrl)
    }
}

async function fetchWithProxyAxios(
    url: string, 
    proxyUrl: string = "", 
    config: AxiosRequestConfig = {},
    headers: RawAxiosRequestHeaders = {},
    method: Method = "GET"
) {
  const isUsingProxy = proxyUrl.trim() !== ""
  const agent = isUsingProxy?  getProxyAgent(proxyUrl) : undefined
  try {
    return await axios.request({
      method,
      url,  
      ...config,
      ...(isUsingProxy && {
        httpAgent: agent,
        httpsAgent: agent,
      }),
      proxy: false,
      timeout: 5000,
      headers
    })
  } catch (error) {
    // Optional: log or enrich the error
    throw new Error(`Failed to fetch via proxy ${proxyUrl}: ${error}`)
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"
interface FetchOption {
  url:string,
  proxyUrl?:string,
  method?: HttpMethod,
  headers?: Record<string, string>,
  body?: string | Buffer | null

}

async function fetchWithProxyUndici({
  url,
  proxyUrl = "",
  method = "GET",
  headers = {},
  body = null
}:FetchOption) {
  const isUsingProxy = proxyUrl.trim() !== ""
  const agent = isUsingProxy ? new ProxyAgent(proxyUrl) : undefined
  try {
    const response = await request(url,{
      method,
      headers,
      body,
      dispatcher: agent,
      maxRedirections: 3,
      headersTimeout: 60000,
      bodyTimeout: 120000    // optional, for body download

    })
    const responseBody = await response.body.text()
    return {
      status: response.statusCode,
      headers: response.headers,
      body: responseBody
    }
  } catch (error) {
    throw new Error(`Failed to fetch via ${proxyUrl || 'direct connection'}: ${error}`)
  }
}



export {
    fetchWithProxyAxios,
    fetchWithProxyUndici
}