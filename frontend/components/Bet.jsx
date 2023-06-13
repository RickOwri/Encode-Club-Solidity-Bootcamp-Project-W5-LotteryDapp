import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import lotteryJson from '../assets/Lottery.json';
// import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';


export function BettingToken() {
    return (
        <>
                <BetToken></BetToken>
        </>
    )
}

function BetToken() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [tokenAmountToBet, setTokenAmountToBet] = useState("1");
    

    const chainId1 = 80001; 

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

    const handleTokenAmountToBet = (event) => {
        setTokenAmountToBet(event.target.value);
        };


    if (txData) return (
        <>
            <p>Bets placed : <a href={"https://mumbai.polygonscan.com/tx/" + txData.transactionHash} target="_blank">{txData.transactionHash}</a>
            </p>

        </>
    )
    if (isLoading) return (
        <>
            <>The Bet is processing...
            </>
        </>
    );
    return (
        <>
            <p><input type="text" value={tokenAmountToBet} onChange={handleTokenAmountToBet} />Token Amount To Bet </p>
            <button onClick={() => betTokens(signer, token, lotteryContract, tokenAmountToBet, setTxData, setLoading, setTokenAmountToBet)}>Bet Token</button>
        </>
    );
}


async function betTokens(signer, token, contract, amount, setTxData, setLoading, setTokenAmountToBet) {
    setLoading(true);
    const allowTx = await token
      .connect(signer)
      .approve(contract.address, ethers.constants.MaxUint256);
    await allowTx.wait();
    const tx = await contract.connect(signer).betMany(amount);
    const receipt = await tx.wait();
    setTxData(receipt)
    setTokenAmountToBet(amount)
    setLoading(false)
  }
