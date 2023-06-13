import { ethers } from 'ethers';
import Router, { useRouter } from "next/router";
import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import { useSigner, useNetwork, useBalance } from 'wagmi';



export function State() {
    return (
        <>
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
  setCompleted(false)
  const state = await contract.betsOpen();
  console.log(state)
  const currentBlock = await provider.getBlock("latest");
  const currentBlockDate = new Date(currentBlock.timestamp * 1000);
  const closingTime = await contract.betsClosingTime();
  const closingTimeDate = new Date(closingTime.toNumber() * 1000);
  setOpen(state)
  setCurrentBlockDate(currentBlockDate)
  setClosingTimeDate(closingTimeDate)
  setCompleted(true)
  setLoading(false)
}
