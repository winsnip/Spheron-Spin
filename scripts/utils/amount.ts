import { ethers } from "hardhat"

interface NumberType {
    min: number,
    max: number
}

async function getCoinBalance(ownerAddress:string){
    const balanceInWei = await ethers.provider.getBalance(ownerAddress)
    const balance = ethers.formatEther(balanceInWei)
    return balance
}

async function getTokenBalance(walletAddress:string, contractToken:string, abi: Array<string>) {
    const contract = new ethers.Contract(contractToken, abi, ethers.provider)
    const [name, symbol, decimals, rawBalance] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.balanceOf(walletAddress)
    ])
    const balance = Number(ethers.formatUnits(rawBalance, decimals))
    const result = {
        name: name,
        symbol: symbol,
        balance: balance
    }
    return result
}

const getRandomRange: (range: NumberType) => number = (range) => (Math.random() * (range.max - range.min) + range.min)

export {
    getCoinBalance,
    getTokenBalance,
    getRandomRange
}