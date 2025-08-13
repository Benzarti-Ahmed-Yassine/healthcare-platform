const {
    AccountId,
    PrivateKey,
    Client,
    ContractCreateFlow
} = require("@hashgraph/sdk");
const fs = require('fs');
const solc = require('solc');

async function compileContract(contractName, sourceCode) {
    console.log(`📝 Compiling ${contractName}...`);
    
    const input = {
        language: 'Solidity',
        sources: {
            [`${contractName}.sol`]: {
                content: sourceCode
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    try {
        const output = JSON.parse(solc.compile(JSON.stringify(input)));
        
        if (output.errors) {
            const hasErrors = output.errors.some(error => error.severity === 'error');
            if (hasErrors) {
                console.error(`❌ Compilation errors for ${contractName}:`);
                output.errors.forEach(error => console.error(error.formattedMessage));
                return null;
            }
        }

        const contract = output.contracts[`${contractName}.sol`][contractName];
        const bytecode = contract.evm.bytecode.object;
        
        console.log(`✅ ${contractName} compiled successfully`);
        return bytecode;
    } catch (error) {
        console.error(`❌ Failed to compile ${contractName}:`, error.message);
        return null;
    }
}

async function deployContract(contractName, bytecode, client) {
    try {
        console.log(`🚀 Deploying ${contractName}...`);
        
        // Create the transaction
        const contractCreateFlow = new ContractCreateFlow()
            .setGas(1000000)  // Increased gas limit
            .setBytecode(bytecode);

        // Sign the transaction with the client operator key and submit to a Hedera network
        const txContractCreateFlowResponse = await contractCreateFlow.execute(client);

        // Get the receipt of the transaction
        const receiptContractCreateFlow = await txContractCreateFlowResponse.getReceipt(client);

        // Get the status of the transaction
        const statusContractCreateFlow = receiptContractCreateFlow.status;

        // Get the Transaction ID
        const txContractCreateId = txContractCreateFlowResponse.transactionId.toString();

        // Get the new contract ID
        const contractId = receiptContractCreateFlow.contractId;

        console.log(`--------------------------------- Create ${contractName} ---------------------------------`);
        console.log("Consensus status           :", statusContractCreateFlow.toString());
        console.log("Transaction ID             :", txContractCreateId);
        console.log("Hashscan URL               :", "https://hashscan.io/testnet/tx/" + txContractCreateId);
        console.log("Contract ID                :", contractId.toString());
        console.log('');

        return contractId.toString();
    } catch (error) {
        console.error(`❌ Failed to deploy ${contractName}:`, error.message);
        throw error;
    }
}

async function main() {
    let client;
    try {
        require('dotenv').config({ path: '../.env' });
        
        // Your account ID and private key from environment variables
        const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
        const MY_PRIVATE_KEY = PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY);

        console.log('🌟 Starting Hedera Smart Contract Deployment...');
        console.log(`Account ID: ${MY_ACCOUNT_ID}`);
        console.log('Network: Hedera Testnet\\n');

        // Pre-configured client for test network (testnet)
        client = Client.forTestnet();

        // Set the operator with the account ID and private key
        client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

        // Read and compile contracts
        console.log('📚 Reading contract files...');
        
        // Read ConsentManagement contract
        const consentSource = fs.readFileSync('./ConsentManagement.sol', 'utf8');
        
        // For EnhancedMedicalRecords, we'll use a simplified version without OpenZeppelin dependencies
        const simpleRecordsSource = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleMedicalRecords {
    struct MedicalRecord {
        bytes32 recordId;
        address patient;
        address doctor;
        uint256 timestamp;
        string recordHash;
        string recordType;
        bool active;
    }
    
    mapping(bytes32 => MedicalRecord) private medicalRecords;
    mapping(address => bytes32[]) private patientRecords;
    uint256 public recordCounter;
    
    event RecordCreated(bytes32 indexed recordId, address indexed patient, address indexed doctor);
    event RecordAccessed(bytes32 indexed recordId, address indexed requester);
    
    function createMedicalRecord(
        address patient,
        string memory recordHash,
        string memory recordType
    ) external {
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
            active: true
        });
        
        patientRecords[patient].push(recordId);
        
        emit RecordCreated(recordId, patient, msg.sender);
    }
    
    function getMedicalRecord(bytes32 recordId) external view returns (MedicalRecord memory) {
        require(medicalRecords[recordId].active, "Record not active");
        return medicalRecords[recordId];
    }
    
    function accessMedicalRecord(bytes32 recordId) external returns (bool) {
        require(medicalRecords[recordId].active, "Record not active");
        emit RecordAccessed(recordId, msg.sender);
        return true;
    }
    
    function getPatientRecords(address patient) external view returns (bytes32[] memory) {
        return patientRecords[patient];
    }
}`;

        // Compile contracts
        const consentBytecode = await compileContract('ConsentManagement', consentSource);
        const recordsBytecode = await compileContract('SimpleMedicalRecords', simpleRecordsSource);

        if (!consentBytecode || !recordsBytecode) {
            console.error('❌ Contract compilation failed');
            return;
        }

        // Deploy contracts
        console.log('🚀 Starting contract deployment...\\n');
        
        const consentContractId = await deployContract('ConsentManagement', consentBytecode, client);
        const recordsContractId = await deployContract('SimpleMedicalRecords', recordsBytecode, client);

        // Display results
        console.log('🎉 Deployment Complete!\\n');
        console.log('====== UPDATE YOUR .ENV FILES WITH THESE ADDRESSES ======');
        console.log(`NEXT_PUBLIC_RECORD_CONTRACT_ADDRESS=${recordsContractId}`);
        console.log(`NEXT_PUBLIC_CONSENT_CONTRACT_ADDRESS=${consentContractId}`);
        console.log('===========================================================\\n');

        return {
            recordsContractId,
            consentContractId
        };

    } catch (error) {
        console.error('❌ Deployment failed:', error);
    } finally {
        if (client) client.close();
    }
}

main();
