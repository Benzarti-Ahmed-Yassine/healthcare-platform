// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecordAccess {
    address public owner;
    mapping(address => mapping(bytes32 => bool)) private accessControl;
    mapping(bytes32 => string) private recordHashes;

    event AccessGranted(address indexed user, bytes32 recordId);
    event AccessRevoked(address indexed user, bytes32 recordId);
    event RecordStored(bytes32 recordId, string recordHash);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function storeRecord(bytes32 recordId, string memory recordHash) public onlyOwner {
        recordHashes[recordId] = recordHash;
        emit RecordStored(recordId, recordHash);
    }

    function grantAccess(address user, bytes32 recordId) public onlyOwner {
        accessControl[user][recordId] = true;
        emit AccessGranted(user, recordId);
    }

    function revokeAccess(address user, bytes32 recordId) public onlyOwner {
        accessControl[user][recordId] = false;
        emit AccessRevoked(user, recordId);
    }

    function hasAccess(address user, bytes32 recordId) public view returns (bool) {
        return accessControl[user][recordId];
    }

    function getRecordHash(bytes32 recordId) public view returns (string memory) {
        return recordHashes[recordId];
    }
}