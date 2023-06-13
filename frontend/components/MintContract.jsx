// import { ethers } from 'ethers';
// import lotteryJson from '../assets/Lottery.json';
// import { useState } from 'react';
// import dotenv from "dotenv";
// import { useSigner, useNetwork, useBalance } from 'wagmi';

// import { LotteryToken__factory, Lo } from '../../contract/typechain-types';


// export function MintContract() {
//     const { data: signer } = useSigner();
//     const [txData, setTxData] = useState(null);
//     const [isLoading, setLoading] = useState(false);
// j


//     const [amountToMint, setAmountToMint] = useState("0.1");


//     const handleAmountToMint = (event) => {
//         setAmountToMint(event.target.value);
//       };



//     const chainId1 = 80001; // This is the chainId for Mumbai Testnet
//     // const chainId2 = 11155111

//     const provider = new ethers.providers.AlchemyProvider(
//         chainId1, 
//         process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

//     const lotteryContract = new ethers.Contract(
//         process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS, 
//         lotteryJson.abi, 
//         provider);

//     if (txData) return (
//         <>
//             <p>Mint Contract ({txData.transactionHash})</p>
//         </>
//     )
//     if (isLoading) return (
//         <>
//             <>Claimed prize wait to be processed...
//             </>
//         </>
//     );
//     return (
//         <>

//             <p><input type="text" value={amountToMint} onChange={handleAmountToMint} />Token Amount</p>
            
//             <button onClick={() => mintContract(signer,lotteryContract, amountToMint, setTxData, setLoading)}>Claim Prize</button>
//         </>
//     );
// }

// async function mintContract(signer, contract, amount, setTxData, setLoading) {
//     const contractFactory = new Lottery__factory(signer);
//     contract = await contractFactory.deploy("LotteryToken", "LTO02", TOKEN_RATIO, ethers.utils.parseEther(BET_PRICE.toFixed(10)), ethers.utils.parseEther(BET_FEE.toFixed(10)));
//     await contract.deployed();
//     const tokenAddress = await contract.paymentToken();
//     const tokenFactory = new LotteryToken__factory();
//     token = tokenFactory.attach(tokenAddress).connect(accounts[0]);
//     console.log("Deployed lottery contract to address " + contract.address);
//     console.log("Deployed Token contract to address " + token.address);
// }
