// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsentManagement {
    struct Consent {
        address patient;
        address provider;
        bool active;
        uint256 timestamp;
    }

    mapping(bytes32 => Consent) private consents;
    event ConsentGranted(bytes32 consentId, address patient, address provider);
    event ConsentRevoked(bytes32 consentId, address patient);

    function grantConsent(bytes32 consentId, address provider) public {
        consents[consentId] = Consent(msg.sender, provider, true, block.timestamp);
        emit ConsentGranted(consentId, msg.sender, provider);
    }

    function revokeConsent(bytes32 consentId) public {
        require(consents[consentId].patient == msg.sender, "Only patient can revoke");
        consents[consentId].active = false;
        emit ConsentRevoked(consentId, msg.sender);
    }

    function isConsentActive(bytes32 consentId) public view returns (bool) {
        return consents[consentId].active;
    }
}