// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/math/SafeMath.sol";

contract SecCalculator {
    using SafeMath for uint256;

    function add(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1.add(nb2);
    }

    function sub(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1.sub(nb2);
    }

    function mul(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1.mul(nb2);
    }

    function div(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1.div(nb2);
    }
}
