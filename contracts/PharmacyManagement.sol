// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PharmacyManagement is ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant PHARMACIST_ROLE = keccak256("PHARMACIST_ROLE");
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    
    struct Medication {
        bytes32 medicationId;
        string name;
        string description;
        string manufacturer;
        uint256 quantity;
        uint256 price;
        bool requiresPrescription;
        bool active;
        uint256 expiryDate;
        string batchNumber;
        string storageConditions;
    }
    
    struct Prescription {
        bytes32 prescriptionId;
        address patient;
        address doctor;
        bytes32 medicationId;
        uint256 quantity;
        uint256 prescribedAt;
        uint256 expiresAt;
        string dosage;
        string instructions;
        bool filled;
        bool active;
        address filledBy;
        uint256 filledAt;
    }
    
    struct InventoryLog {
        uint256 timestamp;
        bytes32 medicationId;
        uint256 quantity;
        string action; // "added", "removed", "expired", "damaged"
        address actor;
        string reason;
    }
    
    struct DrugInteraction {
        bytes32 medicationId1;
        bytes32 medicationId2;
        string interactionType;
        string severity;
        string description;
        bool active;
    }
    
    mapping(bytes32 => Medication) private medications;
    mapping(bytes32 => Prescription) private prescriptions;
    mapping(bytes32 => InventoryLog[]) private inventoryLogs;
    mapping(bytes32 => DrugInteraction[]) private drugInteractions;
    mapping(address => bytes32[]) private patientPrescriptions;
    mapping(bytes32 => uint256) private medicationStock;
    
    uint256 public medicationCounter;
    uint256 public prescriptionCounter;
    uint256 public inventoryLogCounter;
    uint256 public interactionCounter;
    
    event MedicationAdded(bytes32 indexed medicationId, string name, uint256 quantity);
    event PrescriptionCreated(bytes32 indexed prescriptionId, address indexed patient, bytes32 indexed medicationId);
    event PrescriptionFilled(bytes32 indexed prescriptionId, address indexed pharmacist);
    event InventoryUpdated(bytes32 indexed medicationId, uint256 quantity, string action);
    event DrugInteractionDetected(bytes32 indexed medicationId1, bytes32 indexed medicationId2, string severity);
    event SecurityAlert(string alertType, string description, uint256 severity);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AUDITOR_ROLE, msg.sender);
    }
    
    modifier onlyPharmacist() {
        require(hasRole(PHARMACIST_ROLE, msg.sender), "PharmacyManagement: caller is not a pharmacist");
        _;
    }
    
    modifier onlyDoctor() {
        require(hasRole(DOCTOR_ROLE, msg.sender), "PharmacyManagement: caller is not a doctor");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            hasRole(PHARMACIST_ROLE, msg.sender) ||
            hasRole(DOCTOR_ROLE, msg.sender) ||
            hasRole(AUDITOR_ROLE, msg.sender),
            "PharmacyManagement: caller is not authorized"
        );
        _;
    }
    
    function addMedication(
        string memory name,
        string memory description,
        string memory manufacturer,
        uint256 quantity,
        uint256 price,
        bool requiresPrescription,
        uint256 expiryDate,
        string memory batchNumber,
        string memory storageConditions
    ) external onlyPharmacist nonReentrant whenNotPaused {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(quantity > 0, "Quantity must be positive");
        require(expiryDate > block.timestamp, "Expiry date must be in the future");
        
        medicationCounter++;
        bytes32 medicationId = keccak256(abi.encodePacked(name, batchNumber, medicationCounter));
        
        medications[medicationId] = Medication({
            medicationId: medicationId,
            name: name,
            description: description,
            manufacturer: manufacturer,
            quantity: quantity,
            price: price,
            requiresPrescription: requiresPrescription,
            active: true,
            expiryDate: expiryDate,
            batchNumber: batchNumber,
            storageConditions: storageConditions
        });
        
        medicationStock[medicationId] = quantity;
        
        _logInventoryChange(medicationId, quantity, "added", "Initial stock");
        
        emit MedicationAdded(medicationId, name, quantity);
    }
    
    function createPrescription(
        address patient,
        bytes32 medicationId,
        uint256 quantity,
        uint256 duration,
        string memory dosage,
        string memory instructions
    ) external onlyDoctor nonReentrant whenNotPaused {
        require(patient != address(0), "Invalid patient address");
        require(medications[medicationId].active, "Medication not available");
        require(quantity > 0, "Quantity must be positive");
        require(duration > 0, "Duration must be positive");
        
        prescriptionCounter++;
        bytes32 prescriptionId = keccak256(abi.encodePacked(patient, medicationId, prescriptionCounter));
        
        prescriptions[prescriptionId] = Prescription({
            prescriptionId: prescriptionId,
            patient: patient,
            doctor: msg.sender,
            medicationId: medicationId,
            quantity: quantity,
            prescribedAt: block.timestamp,
            expiresAt: block.timestamp + duration,
            dosage: dosage,
            instructions: instructions,
            filled: false,
            active: true,
            filledBy: address(0),
            filledAt: 0
        });
        
        patientPrescriptions[patient].push(prescriptionId);
        
        emit PrescriptionCreated(prescriptionId, patient, medicationId);
    }
    
    function fillPrescription(
        bytes32 prescriptionId,
        uint256 quantity
    ) external onlyPharmacist nonReentrant whenNotPaused {
        Prescription storage prescription = prescriptions[prescriptionId];
        require(prescription.active, "Prescription not active");
        require(!prescription.filled, "Prescription already filled");
        require(prescription.expiresAt > block.timestamp, "Prescription expired");
        require(quantity <= prescription.quantity, "Quantity exceeds prescription");
        
        bytes32 medicationId = prescription.medicationId;
        require(medicationStock[medicationId] >= quantity, "Insufficient stock");
        
        // Check for drug interactions
        _checkDrugInteractions(prescription.patient, medicationId);
        
        // Update stock
        medicationStock[medicationId] -= quantity;
        
        // Mark prescription as filled
        prescription.filled = true;
        prescription.filledBy = msg.sender;
        prescription.filledAt = block.timestamp;
        
        _logInventoryChange(medicationId, quantity, "removed", "Prescription filled");
        
        emit PrescriptionFilled(prescriptionId, msg.sender);
        emit InventoryUpdated(medicationId, quantity, "removed");
    }
    
    function updateInventory(
        bytes32 medicationId,
        uint256 quantity,
        string memory action,
        string memory reason
    ) external onlyPharmacist nonReentrant whenNotPaused {
        require(medications[medicationId].active, "Medication not available");
        
        if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("added"))) {
            medicationStock[medicationId] += quantity;
        } else if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("removed"))) {
            require(medicationStock[medicationId] >= quantity, "Insufficient stock");
            medicationStock[medicationId] -= quantity;
        }
        
        _logInventoryChange(medicationId, quantity, action, reason);
        emit InventoryUpdated(medicationId, quantity, action);
    }
    
    function addDrugInteraction(
        bytes32 medicationId1,
        bytes32 medicationId2,
        string memory interactionType,
        string memory severity,
        string memory description
    ) external onlyPharmacist nonReentrant whenNotPaused {
        require(medications[medicationId1].active, "Medication 1 not available");
        require(medications[medicationId2].active, "Medication 2 not available");
        require(medicationId1 != medicationId2, "Cannot interact with itself");
        
        interactionCounter++;
        drugInteractions[medicationId1].push(DrugInteraction({
            medicationId1: medicationId1,
            medicationId2: medicationId2,
            interactionType: interactionType,
            severity: severity,
            description: description,
            active: true
        }));
        
        // Add reverse interaction
        drugInteractions[medicationId2].push(DrugInteraction({
            medicationId1: medicationId2,
            medicationId2: medicationId1,
            interactionType: interactionType,
            severity: severity,
            description: description,
            active: true
        }));
    }
    
    function getMedication(bytes32 medicationId) external view returns (Medication memory) {
        return medications[medicationId];
    }
    
    function getPrescription(bytes32 prescriptionId) external view returns (Prescription memory) {
        return prescriptions[prescriptionId];
    }
    
    function getPatientPrescriptions(address patient) external view returns (bytes32[] memory) {
        return patientPrescriptions[patient];
    }
    
    function getMedicationStock(bytes32 medicationId) external view returns (uint256) {
        return medicationStock[medicationId];
    }
    
    function getInventoryLogs(bytes32 medicationId) external view onlyAuthorized returns (InventoryLog[] memory) {
        return inventoryLogs[medicationId];
    }
    
    function getDrugInteractions(bytes32 medicationId) external view returns (DrugInteraction[] memory) {
        return drugInteractions[medicationId];
    }
    
    function _checkDrugInteractions(address patient, bytes32 medicationId) private {
        bytes32[] memory patientPrescriptions = patientPrescriptions[patient];
        
        for (uint256 i = 0; i < patientPrescriptions.length; i++) {
            Prescription storage prescription = prescriptions[patientPrescriptions[i]];
            
            if (prescription.filled && prescription.active) {
                DrugInteraction[] memory interactions = drugInteractions[medicationId];
                
                for (uint256 j = 0; j < interactions.length; j++) {
                    if (interactions[j].active && 
                        interactions[j].medicationId2 == prescription.medicationId) {
                        
                        emit DrugInteractionDetected(medicationId, prescription.medicationId, interactions[j].severity);
                        
                        if (keccak256(abi.encodePacked(interactions[j].severity)) == keccak256(abi.encodePacked("high"))) {
                            emit SecurityAlert("DRUG_INTERACTION", "High severity drug interaction detected", 4);
                        }
                    }
                }
            }
        }
    }
    
    function _logInventoryChange(
        bytes32 medicationId,
        uint256 quantity,
        string memory action,
        string memory reason
    ) private {
        inventoryLogCounter++;
        inventoryLogs[medicationId].push(InventoryLog({
            timestamp: block.timestamp,
            medicationId: medicationId,
            quantity: quantity,
            action: action,
            actor: msg.sender,
            reason: reason
        }));
    }
    
    function checkExpiredMedications() external onlyPharmacist {
        for (uint256 i = 1; i <= medicationCounter; i++) {
            bytes32 medicationId = keccak256(abi.encodePacked(medications[i].name, medications[i].batchNumber, i));
            
            if (medications[medicationId].expiryDate <= block.timestamp && 
                medications[medicationId].active) {
                
                medications[medicationId].active = false;
                _logInventoryChange(medicationId, medicationStock[medicationId], "expired", "Medication expired");
                
                emit SecurityAlert("EXPIRED_MEDICATION", "Medication expired and deactivated", 2);
            }
        }
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
