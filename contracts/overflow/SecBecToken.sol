// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./InsecBecToken.sol";

/**
 * @title Pausable token
 *
 * @dev StandardToken modified with pausable transfers.
 **/

contract SecPausableToken is StandardToken, Pausable {
    using SafeMath for uint256;

    function transfer(address _to, uint256 _value) public override whenNotPaused returns (bool) {
        return super.transfer(_to, _value);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override whenNotPaused returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public override whenNotPaused returns (bool) {
        return super.approve(_spender, _value);
    }

    function batchTransfer(address[] memory _receivers, uint256 _value) public whenNotPaused returns (bool) {
        uint256 cnt = _receivers.length;
        uint256 amount = uint256(cnt).mul(_value);
        require(cnt > 0 && cnt <= 20);
        require(_value > 0 && _balances[msg.sender] >= amount);

        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        for (uint256 i = 0; i < cnt; i++) {
            _balances[_receivers[i]] = _balances[_receivers[i]].add(_value);
            Transfer(msg.sender, _receivers[i], _value);
        }
        return true;
    }
}

/**
 * @title Bec Token
 *
 * @dev Implementation of Bec Token based on the basic standard token.
 */
contract SecBecToken is SecPausableToken {
    /**
     * Public variables of the token
     * The following variables are OPTIONAL vanities. One does not have to include them.
     * They allow one to customise the token contract & in no way influences the core functionality.
     * Some wallets/interfaces might not even bother to look at this information.
     */
    string public name = "BeautyChain";
    string public symbol = "BEC";
    string public version = "1.0.0";
    uint8 public decimals = 18;

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     */
    constructor() public {
        totalSupply = 7000000000 * (10**(uint256(decimals)));
        _balances[msg.sender] = totalSupply; // Give the creator all initial tokens
    }

    fallback() external payable {
        //if ether is sent to this address, send it back.
        revert();
    }
}
