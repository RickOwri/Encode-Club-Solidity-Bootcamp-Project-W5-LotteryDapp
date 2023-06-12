import { ApiProperty } from "@nestjs/swagger";
import { BigNumber, ethers } from "ethers";


export class BuyTokenDto {
    @ApiProperty()
    readonly address:string;
    @ApiProperty()
    readonly mintValue:string;
    @ApiProperty()
    readonly signature:string;
    
}

export class TransferTokenDto {
    @ApiProperty()
    readonly addressReceiver:string;
    @ApiProperty()
    readonly transferedUnits:string;
}

export class CastVoteDto {
    @ApiProperty()
    readonly SIGNER:ethers.Wallet;
    @ApiProperty()
    readonly PROPOSAL:string;
    @ApiProperty()
    readonly VOTED_AMOUNT:string;
    @ApiProperty()
    readonly signature:string;
}
