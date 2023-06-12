import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import lotteryJson from '../assets/Lottery.json';
// import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function DisplayTokenBalance() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const chainId1 = 80001; // This is the chainId for Mumbai Testnet
    // const chainId2 = 11155111

    const provider = new ethers.providers.AlchemyProvider(
        chainId1,
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

    const token = new ethers.Contract(
        process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
        LTK.abi,
        provider);

    const lotteryContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
        lotteryJson.abi,
        provider);

    if (txData) return (
        <>
            <p>Token balance is {txData} -- Symbols there --</p>
        </>
    )
    if (isLoading) return (
        <>
            <>Balance Token is loading...
            </>
        </>
    );
    return (
        <>

            <button onClick={() => displayTokenBalance(signer, token, setTxData, setLoading)}>DisplayTokenBalance</button>
        </>
    );
}

async function displayTokenBalance(signer, contract, setTxData, setLoading) {
    setLoading(true);
    console.log(signer.getAddress())
    const balanceBN = await contract.balanceOf(signer.getAddress());
    const balance = ethers.utils.formatEther(balanceBN);
    setTxData(balance)
    setLoading(false)
}
