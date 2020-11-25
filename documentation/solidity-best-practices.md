# solidity: Best practices

## Use Openzepplin lib, don't write your own code

ERC20/ERC721/ERC777/ERC155
SafeMath, Counters, Ownable,
The objective of a developper is to write less code as possible.

> “Good programmers write good code. Great programmers write no code. Zen programmers delete code.”

## last compiler please 0.7.X PLEASE!!!

## Code style and design guidelines:

Follow https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/GUIDELINES.md
Config repository of all openzepllin config file:  
https://github.com/OpenZeppelin/code-style
Follow https://docs.soliditylang.org/en/latest/style-guide.html

## Work with interface registration

erc165 and more ?

## upgradable smart contract

example

## Prefer the ERC667 + ERC 20 + ERC165 = ERC777

tokenreceived, no approve and no token lock ?? please demo

## Favor pull over push for externals call and payment

There is a security flaw for this.

## NATSPEC and documentation generation

find the solidity natspec binary for libraries generation

## smart contract file name shoudl match smart contract name

## use contract name in revert message

## create pausable smart contract

In case of hijack it can be good.  
But care about ERC, it adds centralization so pauser role can lock a token for ever.

## write unit testing, short, small use a lot of utility function
