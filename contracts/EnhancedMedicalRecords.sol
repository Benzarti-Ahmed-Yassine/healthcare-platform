// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EnhancedMedicalRecords is ReentrancyGuard, Pausable, AccessControl {
    using ECDSA for bytes32;
    
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    bytes32 public constant NURSE_ROLE = keccak256("NURSE_ROLE");
    bytes32 public constant PHARMACIST_ROLE = keccak256("PHARMACIST_ROLE");
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    
    struct MedicalRecord {
        bytes32 recordId;
        address patient;
        address doctor;
        uint256 timestamp;
        string recordHash;
        string recordType;
        bool encrypted;
        string encryptionKey;
        uint256 accessCount;
        uint256 lastAccessed;
        bool active;
        string metadata;
    }
    
    struct AccessLog {
        uint256 timestamp;
        address requester;
        address patient;
        bytes32 recordId;
        string accessReason;
        bool granted;
        string denialReason;
    }
    
    struct PatientConsent {
        address patient;
        address provider;
        string consentType;
        uint256 grantedAt;
        uint256 expiresAt;
        bool active;
        string scope;
    }
    
    mapping(bytes32 => MedicalRecord) private medicalRecords;
    mapping(address => bytes32[]) private patientRecords;
    mapping(address => mapping(bytes32 => bool)) private accessControl;
    mapping(bytes32 => AccessLog[]) private accessLogs;
    mapping(bytes32 => PatientConsent) private patientConsents;
    mapping(address => uint256) private accessAttempts;
    
    uint256 public recordCounter;
    uint256 public accessLogCounter;
    uint256 public consentCounter;
    
    event RecordCreated(bytes32 indexed recordId, address indexed patient, address indexed doctor);
    event RecordAccessed(bytes32 indexed recordId, address indexed requester, bool granted);
    event ConsentGranted(bytes32 indexed consentId, address indexed patient, address indexed provider);
    event ConsentRevoked(bytes32 indexed consentId, address indexed patient);
    event SecurityViolation(address indexed actor, string violationType, uint256 severity);
    
    uint256 public constant MAX_ACCESS_ATTEMPTS = 5;
    uint256 public constant ACCESS_TIMEOUT = 1 hours;
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AUDITOR_ROLE, msg.sender);
    }
    
    modifier onlyAuthorizedRole() {
        require(
            hasRole(DOCTOR_ROLE, msg.sender) ||
            hasRole(NURSE_ROLE, msg.sender) ||
            hasRole(PHARMACIST_ROLE, msg.sender) ||
            hasRole(AUDITOR_ROLE, msg.sender),
            "EnhancedMedicalRecords: caller is not authorized"
        );
        _;
    }
    
    modifier onlyPatientOrAuthorized(bytes32 recordId) {
        require(
            medicalRecords[recordId].patient == msg.sender ||
            hasRole(AUDITOR_ROLE, msg.sender) ||
            accessControl[msg.sender][recordId],
            "EnhancedMedicalRecords: access denied"
        );
        _;
    }
    
    function createMedicalRecord(
        address patient,
        string memory recordHash,
        string memory recordType,
        string memory metadata
    ) external onlyAuthorizedRole nonReentrant whenNotPaused {
        require(patient != address(0), "Invalid patient address");
        require(bytes(recordHash).length > 0, "Record hash cannot be empty");
        
        recordCounter++;
        bytes32 recordId = keccak256(abi.encodePacked(patient, recordCounter, block.timestamp));
        
        medicalRecords[recordId] = MedicalRecord({
            recordId: recordId,
            patient: patient,
            doctor: msg.sender,
            timestamp: block.timestamp,
            recordHash: recordHash,
            recordType: recordType,
            encrypted: false,
            encryptionKey: "",
            accessCount: 0,
            lastAccessed: 0,
            active: true,
            metadata: metadata
        });
        
        patientRecords[patient].push(recordId);
        
        emit RecordCreated(recordId, patient, msg.sender);
        
        // Log access for creator
        _logAccess(recordId, msg.sender, patient, "Record Creation", true, "");
    }
    
    function grantAccess(
        address user,
        bytes32 recordId,
        string memory reason
    ) external onlyAuthorizedRole nonReentrant whenNotPaused {
        require(medicalRecords[recordId].active, "Record not active");
        require(user != address(0), "Invalid user address");
        
        accessControl[user][recordId] = true;
        
        _logAccess(recordId, user, medicalRecords[recordId].patient, reason, true, "");
    }
    
    function revokeAccess(
        address user,
        bytes32 recordId
    ) external onlyAuthorizedRole nonReentrant whenNotPaused {
        require(medicalRecords[recordId].active, "Record not active");
        
        accessControl[user][recordId] = false;
        
        _logAccess(recordId, user, medicalRecords[recordId].patient, "Access Revoked", false, "Access revoked by authorized user");
    }
    
    function accessMedicalRecord(
        bytes32 recordId,
        string memory accessReason
    ) external nonReentrant whenNotPaused returns (bool) {
        require(medicalRecords[recordId].active, "Record not active");
        
        bool hasAccess = _checkAccess(recordId);
        
        if (hasAccess) {
            medicalRecords[recordId].accessCount++;
            medicalRecords[recordId].lastAccessed = block.timestamp;
            
            _logAccess(recordId, msg.sender, medicalRecords[recordId].patient, accessReason, true, "");
        } else {
            _logAccess(recordId, msg.sender, medicalRecords[recordId].patient, accessReason, false, "Access denied - insufficient permissions");
            _handleFailedAccessAttempt(msg.sender);
        }
        
        emit RecordAccessed(recordId, msg.sender, hasAccess);
        return hasAccess;
    }
    
    function grantConsent(
        address provider,
        string memory consentType,
        uint256 duration,
        string memory scope
    ) external nonReentrant whenNotPaused {
        require(provider != address(0), "Invalid provider address");
        require(duration > 0, "Duration must be positive");
        
        consentCounter++;
        bytes32 consentId = keccak256(abi.encodePacked(msg.sender, provider, consentCounter));
        
        patientConsents[consentId] = PatientConsent({
            patient: msg.sender,
            provider: provider,
            consentType: consentType,
            grantedAt: block.timestamp,
            expiresAt: block.timestamp + duration,
            active: true,
            scope: scope
        });
        
        emit ConsentGranted(consentId, msg.sender, provider);
    }
    
    function revokeConsent(bytes32 consentId) external nonReentrant whenNotPaused {
        require(patientConsents[consentId].patient == msg.sender, "Only patient can revoke consent");
        
        patientConsents[consentId].active = false;
        
        emit ConsentRevoked(consentId, msg.sender);
    }
    
    function getMedicalRecord(bytes32 recordId) external view onlyPatientOrAuthorized(recordId) returns (MedicalRecord memory) {
        return medicalRecords[recordId];
    }
    
    function getPatientRecords(address patient) external view returns (bytes32[] memory) {
        require(
            patient == msg.sender ||
            hasRole(AUDITOR_ROLE, msg.sender) ||
            _hasValidConsent(msg.sender, patient),
            "EnhancedMedicalRecords: access denied"
        );
        
        return patientRecords[patient];
    }
    
    function getAccessLogs(bytes32 recordId) external view onlyPatientOrAuthorized(recordId) returns (AccessLog[] memory) {
        return accessLogs[recordId];
    }
    
    function _checkAccess(bytes32 recordId) private view returns (bool) {
        MedicalRecord storage record = medicalRecords[recordId];
        
        // Patient always has access to their own records
        if (record.patient == msg.sender) {
            return true;
        }
        
        // Check if user has explicit access
        if (accessControl[msg.sender][recordId]) {
            return true;
        }
        
        // Check if user has valid consent
        if (_hasValidConsent(msg.sender, record.patient)) {
            return true;
        }
        
        return false;
    }
    
    function _hasValidConsent(address user, address patient) private view returns (bool) {
        for (uint256 i = 1; i <= consentCounter; i++) {
            bytes32 consentId = keccak256(abi.encodePacked(patient, user, i));
            PatientConsent storage consent = patientConsents[consentId];
            
            if (consent.active && 
                consent.patient == patient && 
                consent.provider == user && 
                consent.expiresAt > block.timestamp) {
                return true;
            }
        }
        return false;
    }
    
    function _logAccess(
        bytes32 recordId,
        address requester,
        address patient,
        string memory reason,
        bool granted,
        string memory denialReason
    ) private {
        accessLogCounter++;
        accessLogs[recordId].push(AccessLog({
            timestamp: block.timestamp,
            requester: requester,
            patient: patient,
            recordId: recordId,
            accessReason: reason,
            granted: granted,
            denialReason: denialReason
        }));
    }
    
    function _handleFailedAccessAttempt(address user) private {
        accessAttempts[user]++;
        
        if (accessAttempts[user] >= MAX_ACCESS_ATTEMPTS) {
            emit SecurityViolation(user, "Excessive Access Attempts", 3);
        }
    }
    
    function resetAccessAttempts(address user) external onlyRole(AUDITOR_ROLE) {
        accessAttempts[user] = 0;
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    function addRole(address user, bytes32 role) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(role, user);
    }
    
    function removeRole(address user, bytes32 role) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(role, user);
    }
}
