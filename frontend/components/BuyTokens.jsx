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
            <p>Token buyed completed!</p>
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
            <button onClick={() => buyTokens(signer, lotteryContract, amountToBuy, setTxData, setLoading, setAmountToBuy)}>buy tokens</button>
        </>
    );
}



async function buyTokens(signer, contract, amount, setTxData, setLoading, setAmountToBuy) {
    setLoading(true);
    const tx = await contract.connect(signer).purchaseTokens({ value: ethers.utils.parseUnits(amount) });
    const receipt = await tx.wait();
    setTxData(receipt)
    setAmountToBuy(amount)
    setLoading(false)
}

// function buyToken(signer, signature, setLoading, setTxData) {
//     setLoading(true);

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ address: signer._address, mintValue: "20", signature: signature })
//     };

//     fetch('http://localhost:3001/buy-tokens', requestOptions)
//         .then(response => response.json())
//         .then((data) => {
//             setTxData(data);
//             setLoading(false);
//         });
// }