# solidity: Optimization

MUST READ:
https://medium.com/coinmonks/gas-optimization-in-solidity-part-i-variables-9d5775e43dde

Some of the techniques we cover will violate well known code patterns. Before optimizing, we should always consider the technical debt and maintenance costs we might incur.

Optimization is the art of saving gas for user  
https://ethereum.stackexchange.com/questions/28813/how-to-write-an-optimized-gas-cost-smart-contract

2 way variable packing and no more useless code

All gas cost are in appendix G https://ethereum.github.io/yellowpaper/paper.pdf
Here is a spreadsheet of all the OPCODE 2017-04-12:
https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0

Please check maybe old one: https://docs.google.com/spreadsheets/d/1m89CVujrQe5LAFJ8-YAUCcNK950dUzMQPMJBxRtGCqs/edit#gid=0

## variable packing

How are stored variable in storage, struct too

## short revert message

## multiple revert (optimization or best practices ???)

## only index revelant variable in event, indexed cost gas
