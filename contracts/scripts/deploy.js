async function main() {
  console.log('Starting deployment to Hedera testnet...');
  
  // Deploy EnhancedMedicalRecords contract
  console.log('Deploying EnhancedMedicalRecords...');
  const EnhancedMedicalRecords = await ethers.getContractFactory('EnhancedMedicalRecords');
  const enhancedMedicalRecords = await EnhancedMedicalRecords.deploy();
  await enhancedMedicalRecords.deployed();
  console.log('✅ EnhancedMedicalRecords deployed to:', enhancedMedicalRecords.address);

  // Deploy ConsentManagement contract
  console.log('Deploying ConsentManagement...');
  const ConsentManagement = await ethers.getContractFactory('ConsentManagement');
  const consentManagement = await ConsentManagement.deploy();
  await consentManagement.deployed();
  console.log('✅ ConsentManagement deployed to:', consentManagement.address);
  
  console.log('\n🎉 Deployment Complete!');
  console.log('\n====== UPDATE YOUR .ENV FILES WITH THESE ADDRESSES ======');
  console.log(`NEXT_PUBLIC_RECORD_CONTRACT_ADDRESS=${enhancedMedicalRecords.address}`);
  console.log(`NEXT_PUBLIC_CONSENT_CONTRACT_ADDRESS=${consentManagement.address}`);
  console.log('==========================================================');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
