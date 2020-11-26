// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

// Need to send ethers to the smart contract for the demonstration
// of an Authorization bypass through tx.origin and its remediation
contract TxWallet {
    address private _owner;

    constructor() public {
        _owner = msg.sender;
    }

    function vulnerableTransferTo(address payable dst, uint256 amount) public {
        require(tx.origin == _owner, "TxWallet: Only owner can transfer ethers");
        dst.transfer(amount);
    }

    function safeTransferTo(address payable dst, uint256 amount) public {
        require(msg.sender == _owner, "TxWallet: Only owner can transfer ethers");
        dst.transfer(amount);
    }

    receive() external payable {}
}
