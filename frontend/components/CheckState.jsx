import { ethers } from 'ethers';
import Router, { useRouter } from "next/router";
import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import { useSigner, useNetwork, useBalance } from 'wagmi';



export function State() {
    return (
        <>
                <h2>CheckState</h2>
                <CheckState></CheckState>
        </>
    )
}


function CheckState() {
    const [open, setOpen] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [currentBlockDate, setCurrentBlockDate] = useState(null);
    const [closingTimeDate, setClosingTimeDate] = useState(null);
    const [completed, setCompleted] = useState(false)

    const router = useRouter();


    const lotteryAddress = process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS;

    
    const chainId1 = 80001;

    const provider = new ethers.providers.AlchemyProvider(
        chainId1, 
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);  

    const lotteryContract = new ethers.Contract(
        lotteryAddress, 
        lotteryJson.abi, 
        provider);    

    if (completed) return (
        <>
            <p>The lottery is {open ? "open" : "closed"}</p>
            <p>The last block was mined at {currentBlockDate.toLocaleDateString()} : {currentBlockDate.toLocaleTimeString()}</p>
            <p>Lottey should close at {closingTimeDate.toLocaleDateString()} : {closingTimeDate.toLocaleTimeString()}</p>
            <p></p>
        </>
    )
    if (isLoading) return (
        <>
            <>Looking for checkState...
            </>
        </>
    );
    return (
        <>
            <p>Check the State</p>
            <button onClick={() => checkState(
                lotteryContract, 
                provider, 
                setLoading, 
                setOpen,
                setCurrentBlockDate, 
                setClosingTimeDate,
                setCompleted)}>Check State</button>
        </>
    );
}



async function checkState(
    contract,  
    provider,
    setLoading, 
    setOpen,
    setCurrentBlockDate,
    setClosingTimeDate,
    setCompleted
) {
  setLoading(true)
  const state = await contract.betsOpen();
  const currentBlock = await provider.getBlock("latest");
  const currentBlockDateData = new Date(currentBlock.timestamp * 1000);
  const closingTime = await contract.betsClosingTime();
  const closingTimeDate = new Date(closingTime.toNumber() * 1000);
  setOpen(state)
  setCurrentBlockDate(currentBlockDateData)
  setClosingTimeDate(closingTimeDate)
  setCompleted(true)
  setLoading(false)
}
