import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
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




    if (txData) return (
        <>
            <p>Balance Info are ({txData.transactionHash})</p>
        </>
    )
    if (isLoading) return (
        <>
            <>Balance is loading...
            </>
        </>
    );
    return (
        <>
            <h2>displayBalance</h2>

            <button onClick={() => displayBalance(signer, token, setTxData, setLoading)}>Close Bets</button>
        </>
    );
}

async function displayBalance(signer, token, setTxData, setLoading) {
    setLoading(true);
    const tx = await token
        .connect(signer)
        .balanceOf(signer._address);
    const receipt = await tx.wait();
    console.log(`Prize claimed (${receipt.transactionHash})`);
    setTxData(receipt)
    setLoading(false)
}
