require('dotenv');

const { ethers } = require("hardhat");
const { SEPOLIA_CONTRACT_ADDRESS } = process.env;

async function main() {
    const contractAddress = SEPOLIA_CONTRACT_ADDRESS;
    const Contract = await ethers.getContractFactory("SepoliaToBobaBridge");
    const contract = Contract.attach(contractAddress);

    // call testResponse func
    const response = await contract.testResponse();
    console.log("Response from contract: ", response);
}   

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
});
