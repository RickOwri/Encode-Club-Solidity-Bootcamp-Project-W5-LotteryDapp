import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import lotteryJson from '../assets/Lottery.json';
// import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import { useSigner, useNetwork, useBalance } from 'wagmi';

export function DisplayPrize() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState("");
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

    if (txData) return (
        <>
            <p>The owner pool has {txData} Tokens in prize</p>
            {/* `The account of address {signer.getAddress()} has earned a prize of {txData} Tokens` */}
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
            <button onClick={() => displayPrize(signer, lotteryContract, setTxData, setLoading)}>Display Prize</button>
        </>
    );
}

async function displayPrize(signer, lotteryContract, setTxData, setLoading) {
    setLoading(true);
    const prizeBN = await lotteryContract.prize(signer.getAddress());
    const prize = ethers.utils.formatEther(prizeBN);
    console.log(prize)
    setTxData(prize)
    setLoading(false)
  }