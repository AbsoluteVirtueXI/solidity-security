// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/math/SafeMath.sol";

// Need to send ethers to the smart contract for the demonstration
// of single function reentrancy attack on withdraw and
// a cross-functions reentrancy attack on transfer.
contract VulReentrantWallet {
    using SafeMath for uint256;

    mapping(address => uint256) private _balances;

    function deposit() public payable {
        _balances[msg.sender] = _balances[msg.sender].add(msg.value);
    }

    function balanceOf(address addr) public view returns (uint256) {
        return _balances[addr];
    }

    // Vulnerable to cross-functions reentrancy attack
    // because it shares same state as withdraw
    function transfer(address dst, uint256 amount) public {
        require(_balances[msg.sender] >= amount, "VulMultiWallet: Not enough funds for transfer");
        _balances[dst] = _balances[dst].add(amount);
        _balances[msg.sender] = _balances[msg.sender].sub(amount);
    }

    // Vulnerable to single function reentrancy attack
    function withdraw() public {
        require(_balances[msg.sender] > 0, "VulReentrantWallet: 0 ethers in wallet");

        uint256 amount = _balances[msg.sender];

        // Can call a reiceve or fallback function on a malicious smart contract
        // And  the malicious smart contract will call again withdraw() before
        // balances[msg.sender] is updated
        (bool success, ) = msg.sender.call{value: amount}("");
        //msg.sender.transfer(amount); a verifier si custom gas maximum
        //require(success);

        // BAD: balances update come after ethers sending
        _balances[msg.sender] = 0;
    }
}
