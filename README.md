# Lesson 20 - Lottery

## Lottery contract

* (Review) Design patterns
* Architecture overview
* Lottery structure

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

### References

<https://coinsbench.com/how-to-create-a-lottery-smart-contract-with-solidity-4515ff6f849a>

## Coding the contract

* Implementing the relatively safe randomness source from `prevrandao`
* Implementing the time lock using block timestamp
* Block time estimation
* Implementing the fee
  * (Review) Dealing with decimals
* Withdrawing from pool and redeeming eth
* (Bonus) "Normal" factory pattern and clone pattern overview

## Homework

* Create Github Issues with your questions about this lesson
* Read the references

---

## Weekend Project
1. Finish those functions :

```
- [x] closeLottery()

- [x] displayPrize(index: string)

- [x] claimPrize(index: string, amount: string)

- [x] displayOwnerPool()

- [x] withdrawTokens(amount: string)

- [x] burnTokens(index: string, amount: string)

```
2. Build a frontend for the Lottery dApp
  * Use any framework of your preference
- I will use create-web3-react tools

## Contract
NEXT_PUBLIC_BET_CONTRACT_ADDRESS="0x183d89f2aa311C6ccCE2383131d3946316b3ea4A"
NEXT_PUBLIC_TOKEN_ADDRESS="0x110661228FDA5eaCd86449c73719D19109B758b2"

## Ressource 
https://www.researchgate.net/publication/338064306_ABCDE_--_Agile_Block_Chain_Dapp_Engineering