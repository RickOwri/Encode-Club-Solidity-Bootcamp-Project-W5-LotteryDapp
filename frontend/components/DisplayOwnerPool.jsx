import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import lotteryJson from '../assets/Lottery.json';
// import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function DisplayOwnerPool() {
    const { data: signer } = useSigner();
    const [txBalance, setTxBalance] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const chainId1 = 80001; // This is the chainId for Mumbai Testnet
    // const chainId2 = 11155111

    const provider = new ethers.providers.AlchemyProvider(
        chainId1,
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

    // const token = new ethers.Contract(
    //     process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    //     LTK.abi,
    //     provider);

    const lotteryContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
        lotteryJson.abi,
        provider);

    if (txBalance) return (
        <>
            <p>The owner pool has {txBalance} Tokens--</p>
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

            <button onClick={() => displayOwnerPool(signer, lotteryContract, setTxBalance, setLoading)}>Display OwnerPool</button>
        </>
    );
}

async function displayOwnerPool(signer, contract, setTxBalance, setLoading) {
    setLoading(true);
    const balanceBN = await contract.ownerPool();
    const balance = ethers.utils.formatEther(balanceBN);
    setTxBalance(balance)
    setLoading(false)
}
