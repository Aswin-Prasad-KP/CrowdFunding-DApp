// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage {
    uint256 private storedData;

    // Store the given number
    function set(uint256 x) public {
        storedData = x;
    }

    // Retrieve the stored number
    function get() public view returns (uint256) {
        return storedData;
    }
}
