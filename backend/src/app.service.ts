import { Injectable } from '@nestjs/common';
import {BigNumber, ethers} from 'ethers';
import { ConfigService } from '@nestjs/config';
import * as tokenJson from './assets/LotteryToken.json';
import * as TokenizedBetsJson from './assets/Lottery.json';
import { request } from 'http';

// const NEXT_PUBLIC_BET_CONTRACT_ADDRESS="0x4aA7bc013c9Dc1339181962A51dfDDEDC5b6Ad4c"

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  tokenContract: ethers.Contract;
  TokenizedBetsContract: ethers.Contract;
  

  constructor(private configService: ConfigService) {

    const chainId1 = 80001;
    
    this.provider = new ethers.providers.AlchemyProvider(
      chainId1, 
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);    
    
    const contractAddressToken = this.configService.get<string>('NEXT_PUBLIC_TOKEN_ADDRESS')
    const contractAddressTokenizedBets = this.configService.get<string>('NEXT_PUBLIC_BET_CONTRACT_ADDRESS')

    this.tokenContract = new ethers.Contract(
      contractAddressToken,
      tokenJson.abi,
      this.provider
    )
    this.TokenizedBetsContract = new ethers.Contract(
      contractAddressTokenizedBets,
      TokenizedBetsJson.abi,      
      this.provider
    );

  }

  async awaitTx(tx: ethers.providers.TransactionResponse)
    {
      return await tx.wait();
    }



  getHello(): string {
    return 'Hello World!';
  }

  async getLastBlock() 
   {
    const lastblockTx = await this.provider.getBlock("latest")
    const blockNumber = lastblockTx.number
    return blockNumber;
  }

  getTokenContractAddress() {
    const contractAddressToken = this.configService.get<string>('NEXT_PUBLIC_TOKEN_ADDRESS')
    return contractAddressToken
  }

  getTokenizedBetsAddress() {
    const contractAddressTokenizedBets = this.configService.get<string>('NEXT_PUBLIC_BET_CONTRACT_ADDRESS')
    return contractAddressTokenizedBets
  }


  async getReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await this.awaitTx(tx);
    return receipt;
  }

  async mint(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await this.awaitTx(tx);
    return receipt;
  }

  

  async buyTokens(address: string, MINT_VALUE:string, signature:string) {

    const pKey = this.configService.get<string>('NEXT_PUBLIC_PRIVATE_KEY_SANGOKU');

    const wallet = new ethers.Wallet(pKey);

    const signer = wallet.connect(this.provider);

    const currentBlock = await this.provider.getBlock("latest");
    
    const mintValue = ethers.utils.parseUnits(MINT_VALUE)
    // const requestTx = this.TokenizedBetsContract.connect(signer).mint(mintValue);

    // return requestTx
  }

  // async function displayBalance(index) {
  //   // const balanceBN = await provider.getBalance(accounts[Number(index)].getAddress());
  //   const balanceBN = await accounts[Number(index)].getBalance();
  //   const balance = ethers.utils.formatEther(balanceBN);
  //   console.log(
  //     `The account address ${accounts[Number(index)].getAddress()} has ${balance} ETH\n`
  //   );
  // }

}
