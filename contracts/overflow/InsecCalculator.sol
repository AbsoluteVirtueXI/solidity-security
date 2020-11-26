// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

contract InsecCalculator {
    function add(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1 + nb2;
    }

    function sub(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1 - nb2;
    }

    function mul(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1 * nb2;
    }

    function div(uint256 nb1, uint256 nb2) public pure returns (uint256) {
        return nb1 / nb2;
    }
}
