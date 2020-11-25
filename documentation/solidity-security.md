# solidity: Security

## security tools

### manticore by trail of bits

https://github.com/trailofbits/manticore
view demo

oyente mithril

### other tools

...

## Consensys smart contract best practice

https://consensys.github.io/smart-contract-best-practices/

## Integer Overflow and Underflow

### Description

An overflow/underflow happens when an arithmetic operation reaches the maximum or minimum size of a type. For instance if a number is stored in the uint8 type, it means that the number is stored in a 8 bits unsigned number ranging from 0 to 2^8-1. If a number is stored in the uint256 type, it means that the number is stored in a 256 bits unsigned number ranging from 0 to 2^256-1.  
In computer programming, an integer overflow occurs when an arithmetic operation attempts to create a numeric value that is outside of the range that can be represented with a given number of bits – either larger than the maximum or lower than the minimum representable value.  
There are around 20 cases for overflow and underflow:

- overflow in unsigned->signed conversion
- overflow in signed->unsigned conversion
- overflow in size-decreasing implicit conversion
- overflow in addition of two signed numbers
- overflow in addition of two unsigned numbers
- underflow in subtraction of two signed numbers
- underflow in subtraction of two unsigned numbers
- overflow in multiplication of two signed numbers
- overflow in multiplication of two unsigned numbers
- overflow in shifts
- overflow in ++ on a signed number
- overflow in ++ on an unsigned number
- underflow in -- on a signed number
- underflow in -- on an unsigned number
- overflow in +=
- overflow in -=
- overflow in \*=
- overflow in /=
- exponentiation

### Demonstration

### Defense

Use [SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol) library from Openzepplin for arithmetic functions.

## reentrency DAO flaw

https://blog.openzeppelin.com/reentrancy-after-istanbul/

### single function reentrancy attack

### cross-function reentrance attack

### Defense against reentrancy

#### checks-effects-interactions pattern

#### reentrancy guards

#### pull payments.

### Defense against

## DDOS
