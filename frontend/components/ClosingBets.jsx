import { ethers } from 'ethers';
import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function ClosingLottery() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const chainId1 = 80001; // This is the chainId for Mumbai Testnet
    // const chainId2 = 11155111

    const provider = new ethers.providers.AlchemyProvider(
        chainId1, 
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

    const lotteryContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS, 
        lotteryJson.abi, 
        provider);

    if (txData) return (
        <>
            <p>Bets closed : <a href={"https://mumbai.polygonscan.com/tx/" + txData.transactionHash} target="_blank">{txData.transactionHash}</a>
         </p>
        
        </>
    )
    if (isLoading) return (
        <>
            <>Bet wait to be open...
            </>
        </>
    );
    return (
        <>
            
            <button onClick={() => closingBets(signer,lotteryContract, setTxData, setLoading)}>Close Bets</button>
        </>
    );
}

async function closingBets(signer, contract, setTxData, setLoading) {
    setLoading(true);
    const tx = await contract.connect(signer).closeLottery();
    const receipt = await tx.wait();
    setTxData(receipt)
    setLoading(false)
}
