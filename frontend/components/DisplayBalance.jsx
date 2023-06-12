import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function DisplayBalance() {
    
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const chainId1 = 80001; 

    const provider = new ethers.providers.AlchemyProvider(
        chainId1,
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

    const token = new ethers.Contract(
        process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
        LTK.abi,
        provider);




    if (txData) return (
        <>
            <p>The account address signer has {txData} ETH</p>
        </>
    )
    if (isLoading) return (
        <>
            <>Balance ETH is loading...
            </>
        </>
    );

    return (
        <>
            <h2>display Balance</h2>

            <button onClick={() => displayBalance(signer, provider, setTxData, setLoading)}>Display Balance</button>
        </>
    );
}

async function displayBalance(signer, provider, setTxData, setLoading) {
    setLoading(true);
    const balanceBN = await provider.getBalance(signer.getAddress());
    console.log("azaeazeazea"+signer+provider)
    // const balanceBN = await signer.getBalance();
    const balance = ethers.utils.formatEther(balanceBN);
    setTxData(balance)
    setLoading(false)
}
