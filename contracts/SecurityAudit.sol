// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SecurityAudit is ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant SECURITY_ADMIN_ROLE = keccak256("SECURITY_ADMIN_ROLE");
    
    struct SecurityEvent {
        uint256 timestamp;
        address actor;
        string eventType;
        string description;
        uint256 severity; // 1-5 scale
        bool resolved;
        string resolution;
    }
    
    struct VulnerabilityReport {
        uint256 timestamp;
        address reporter;
        string vulnerabilityType;
        string description;
        uint256 severity;
        string affectedComponent;
        bool confirmed;
        bool patched;
        string patchDetails;
    }
    
    struct AuditLog {
        uint256 timestamp;
        address auditor;
        string auditType;
        string findings;
        bool passed;
        string recommendations;
    }
    
    mapping(uint256 => SecurityEvent) public securityEvents;
    mapping(uint256 => VulnerabilityReport) public vulnerabilityReports;
    mapping(uint256 => AuditLog) public auditLogs;
    
    uint256 public securityEventCounter;
    uint256 public vulnerabilityCounter;
    uint256 public auditCounter;
    
    event SecurityEventLogged(uint256 indexed eventId, address indexed actor, string eventType, uint256 severity);
    event VulnerabilityReported(uint256 indexed reportId, address indexed reporter, string vulnerabilityType, uint256 severity);
    event AuditCompleted(uint256 indexed auditId, address indexed auditor, bool passed);
    event SecurityAlert(uint256 indexed eventId, string alertType, uint256 severity);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(SECURITY_ADMIN_ROLE, msg.sender);
        _grantRole(AUDITOR_ROLE, msg.sender);
    }
    
    modifier onlyAuditor() {
        require(hasRole(AUDITOR_ROLE, msg.sender), "SecurityAudit: caller is not an auditor");
        _;
    }
    
    modifier onlySecurityAdmin() {
        require(hasRole(SECURITY_ADMIN_ROLE, msg.sender), "SecurityAudit: caller is not a security admin");
        _;
    }
    
    function logSecurityEvent(
        string memory eventType,
        string memory description,
        uint256 severity
    ) external onlyRole(SECURITY_ADMIN_ROLE) nonReentrant {
        require(severity >= 1 && severity <= 5, "Invalid severity level");
        
        securityEventCounter++;
        securityEvents[securityEventCounter] = SecurityEvent({
            timestamp: block.timestamp,
            actor: msg.sender,
            eventType: eventType,
            description: description,
            severity: severity,
            resolved: false,
            resolution: ""
        });
        
        emit SecurityEventLogged(securityEventCounter, msg.sender, eventType, severity);
        
        if (severity >= 4) {
            emit SecurityAlert(securityEventCounter, "HIGH_SEVERITY", severity);
        }
    }
    
    function reportVulnerability(
        string memory vulnerabilityType,
        string memory description,
        uint256 severity,
        string memory affectedComponent
    ) external nonReentrant {
        require(severity >= 1 && severity <= 5, "Invalid severity level");
        require(bytes(description).length > 0, "Description cannot be empty");
        
        vulnerabilityCounter++;
        vulnerabilityReports[vulnerabilityCounter] = VulnerabilityReport({
            timestamp: block.timestamp,
            reporter: msg.sender,
            vulnerabilityType: vulnerabilityType,
            description: description,
            severity: severity,
            affectedComponent: affectedComponent,
            confirmed: false,
            patched: false,
            patchDetails: ""
        });
        
        emit VulnerabilityReported(vulnerabilityCounter, msg.sender, vulnerabilityType, severity);
    }
    
    function confirmVulnerability(uint256 reportId) external onlyAuditor {
        require(reportId <= vulnerabilityCounter, "Invalid report ID");
        vulnerabilityReports[reportId].confirmed = true;
    }
    
    function markVulnerabilityPatched(
        uint256 reportId,
        string memory patchDetails
    ) external onlySecurityAdmin {
        require(reportId <= vulnerabilityCounter, "Invalid report ID");
        require(vulnerabilityReports[reportId].confirmed, "Vulnerability must be confirmed first");
        
        vulnerabilityReports[reportId].patched = true;
        vulnerabilityReports[reportId].patchDetails = patchDetails;
    }
    
    function resolveSecurityEvent(
        uint256 eventId,
        string memory resolution
    ) external onlySecurityAdmin {
        require(eventId <= securityEventCounter, "Invalid event ID");
        require(!securityEvents[eventId].resolved, "Event already resolved");
        
        securityEvents[eventId].resolved = true;
        securityEvents[eventId].resolution = resolution;
    }
    
    function completeAudit(
        string memory auditType,
        string memory findings,
        bool passed,
        string memory recommendations
    ) external onlyAuditor nonReentrant {
        auditCounter++;
        auditLogs[auditCounter] = AuditLog({
            timestamp: block.timestamp,
            auditor: msg.sender,
            auditType: auditType,
            findings: findings,
            passed: passed,
            recommendations: recommendations
        });
        
        emit AuditCompleted(auditCounter, msg.sender, passed);
    }
    
    function getSecurityEvent(uint256 eventId) external view returns (SecurityEvent memory) {
        return securityEvents[eventId];
    }
    
    function getVulnerabilityReport(uint256 reportId) external view returns (VulnerabilityReport memory) {
        return vulnerabilityReports[reportId];
    }
    
    function getAuditLog(uint256 auditId) external view returns (AuditLog memory) {
        return auditLogs[auditId];
    }
    
    function getHighSeverityEvents() external view returns (uint256[] memory) {
        uint256[] memory highSeverityEvents = new uint256[](securityEventCounter);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= securityEventCounter; i++) {
            if (securityEvents[i].severity >= 4 && !securityEvents[i].resolved) {
                highSeverityEvents[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        assembly {
            mstore(highSeverityEvents, count)
        }
        
        return highSeverityEvents;
    }
    
    function getOpenVulnerabilities() external view returns (uint256[] memory) {
        uint256[] memory openVulnerabilities = new uint256[](vulnerabilityCounter);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= vulnerabilityCounter; i++) {
            if (!vulnerabilityReports[i].patched) {
                openVulnerabilities[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        assembly {
            mstore(openVulnerabilities, count)
        }
        
        return openVulnerabilities;
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
