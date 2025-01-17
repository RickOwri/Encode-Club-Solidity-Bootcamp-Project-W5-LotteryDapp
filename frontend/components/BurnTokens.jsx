import { ethers } from 'ethers';
import LTK from '../assets/LotteryToken.json';
import lotteryJson from '../assets/Lottery.json';
// import lotteryJson from '../assets/Lottery.json';
import { useState } from 'react';
import dotenv from "dotenv";
import { useSigner, useNetwork, useBalance } from 'wagmi';


export function BurningToken() {
    return (
        <>
                <BurnToken></BurnToken>
        </>
    )
}

function BurnToken() {
    const { data: signer } = useSigner();
    const [txData, setTxData] = useState(null);
    const [txDataAllow, setTxDataAllow] = useState(null);

    const [isLoading, setLoading] = useState(false);
    const [amountToBurn, setAmountToBurn] = useState("1");
    

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

    const handleAmountToBurn = (event) => {
        setAmountToBurn(event.target.value);
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
            <>Burning tokens to be minted...
            </>
        </>
    );
    return (
        <>
            <p><input type="text" value={amountToBurn} onChange={handleAmountToBurn} />Token Amount To Burn </p>
            <button onClick={() => burnTokens(signer, lotteryContract, token, amountToBurn, setTxData, setLoading, setAmountToBurn, setTxDataAllow)}>Burn tokens</button>
        </>
    );
}



async function burnTokens(signer, contract, token, amount, setTxData, setLoading, setAmountToBurn, setTxDataAllow) {
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
    setAmountToBurn(amount)
    setLoading(false)
  }
  