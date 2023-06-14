# Lesson 20 - Lottery

## Lottery contract

### Implementation details

* Implement ownable
* Owner deploy lottery and define betting price and fee
* Owner start lottery
  * Define a block timestamp target
* Players must buy an ERC20 with ETH
* Players pay ERC20 to bet
  * Only possible before block timestamp met
* Anyone can roll the lottery
  * Only after block timestamp target is met
  * Randomness from RANDAO
* Winner receives the pooled ERC20 minus fee
* Owner can withdraw fees and restart lottery
* Players can burn ERC20 tokens and redeem ETH
* Implementing the relatively safe randomness source from `prevrandao`
* Implementing the time lock using block timestamp
* Block time estimation
* Implementing the fee
  * (Review) Dealing with decimals
* Withdrawing from pool and redeeming eth
* (Bonus) "Normal" factory pattern and clone pattern overview

# Homework and Weekend 5 Project

- Build a frontend for the Lottery dApp
- Use any framework of your preference
- I will use create-web3-react tools

---

All implemented functions in the project (checked) :

```
- [x] Bet
- [x] burnTokens
- [x] buyTokens
- [x] Check>tate
- [x] ClaimPrize
- [x] ClosingBets
- [x] DisplayBalance
- [x] DisplayOwnerPool
- [x] DisplayPrize
- [x] DisplayTokenBalance
- [ ] MintContract
- [x] OpenBets
- [x] WalletInfo
- [x] withdrawTokens 

```


## Ballot operation

### Contract
[LotteryContract](https://mumbai.polygonscan.com/address/0x183d89f2aa311c6ccce2383131d3946316b3ea4a)
[LotteryToken LTO02 Contract](https://mumbai.polygonscan.com/address/0x110661228fda5eacd86449c73719d19109b758b2)

### Participant or signer
[signer1](https://mumbai.polygonscan.com/address/0xc8e653ea3f2245c640506659180a3f2a2189afb3)
[signer2 and prize winner](https://mumbai.polygonscan.com/address/0x2471b1373f20f52e5ce6cd0d08b4ce56a75acc44)
