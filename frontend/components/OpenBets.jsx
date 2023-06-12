import { ethers } from 'ethers';
import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function OpenBets() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [betsDuration, setBetsDuration] = useState("360");

    const handleBetsDuration = (event) => {
        setBetsDuration(event.target.value);
      };


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
            <p>Bet Opened!</p>
            <a href={"https://mumbai.polygonscan.com/tx/" + TxData.transactionHash} target="_blank">{txData.hash}</a>
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
            <h2>Open Bet</h2>
            <p><input type="text" value={betsDuration} onChange={handleBetsDuration} />Bets Duration</p>
            
            <button onClick={() => openBets(signer,provider,lotteryContract, betsDuration, setTxData, setLoading)}>Open bets</button>
        </>
    );
}

async function openBets(signer, provider,contract, duration, setTxData, setLoading) {
    setLoading(true);
	const currentBlock = await provider.getBlock("latest");
	const requestTx = await contract.connect(signer).openBets(currentBlock.timestamp + duration);;
	const TxData = await requestTx.wait();
    setTxData(TxData)
}
