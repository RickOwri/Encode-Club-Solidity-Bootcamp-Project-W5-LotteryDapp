import { ethers } from 'ethers';
import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function ClaimPrize() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [isLoading, setLoading] = useState(false);


    const [amountToclaim, setAmountToclaim] = useState("360");


    const handleAmountToclaim = (event) => {
        setAmountToclaim(event.target.value);
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
            <p>Prize claimed ({txData.transactionHash})</p>
        </>
    )
    if (isLoading) return (
        <>
            <>Claimed prize wait to be processed...
            </>
        </>
    );
    return (
        <>
            <h2>Claim prize</h2>

            <p><input type="text" value={amountToclaim} onChange={handleAmountToclaim} />Token Amount</p>
            
            <button onClick={() => claimPrize(signer,lotteryContract, amountToclaim, setTxData, setLoading)}>Claim Prize</button>
        </>
    );
}

async function claimPrize(signer, contract, amount, setTxData, setLoading) {
    setLoading(true);
    const tx = await contract
        .connect(signer)
        .prizeWithdraw(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(`Prize claimed (${receipt.transactionHash})`);
    setTxData(receipt)
    setLoading(false)
}
