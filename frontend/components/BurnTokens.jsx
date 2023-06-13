import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import lotteryJson from '../assets/Lottery.json';
// import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';


export function BuyingToken() {
    return (
        <>
                <BuyToken></BuyToken>
        </>
    )
}

function BuyToken() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [txDataAllow, setTxDataAllow] = useState(null);

    const [isLoading, setLoading] = useState(false);
    const [amountToBuy, setAmountToBuy] = useState("1");
    

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

    const handleAmountToBuy = (event) => {
        setAmountToBuy(event.target.value);
        };

    
    if (txData) return (
        <>
            <p>Allowance confirmed ({txDataAllow.transactionHash})</p>
            <p>Burn confirmed ({txData.transactionHash});
</p>
            <a href={"https://mumbai.polygonscan.com/tx/" + txData.transactionHash} target="_blank">{txData.transactionHash}</a>
        </>
    )
    if (isLoading) return (
        <>
            <>Buying tokens to be minted...
            </>
        </>
    );
    return (
        <>
            <p><input type="text" value={amountToBuy} onChange={handleAmountToBuy} />Token Amount To buy </p>
            <button onClick={() => buyTokens(signer, lotteryContract, token, amountToBuy, setTxData, setLoading, setAmountToBuy, setTxDataAllow)}>buy tokens</button>
        </>
    );
}



async function burnTokens(signer, contract, token, amount, setTxData, setLoading, setAmountToBuy, setTxDataAllow) {
    setLoading(true);
    const allowTx = await token
      .connect(signer)
      .approve(contract.address, ethers.constants.MaxUint256);
    const receiptAllow = await allowTx.wait();
    const tx = await contract
      .connect(signer)
      .returnTokens(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    setTxDataAllow(receiptAllow)
    setTxData(receipt)
    setAmountToBuy(amount)
    setLoading(false)
  }
  