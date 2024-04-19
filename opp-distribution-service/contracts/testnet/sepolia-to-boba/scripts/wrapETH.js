const { ethers } = require("hardhat");

const { SEPOLIA_CONTRACT_ADDRESS, METAMASK_WALLET_ADDRESS } = process.env;

async function main() {
    const contractAddress = SEPOLIA_CONTRACT_ADDRESS;
    const Contract = await ethers.getContractFactory("SepoliaToBobaBridge");
    const contract = Contract.attach(contractAddress);

    const amountToWrap = ethers.utils.parseEther("0.1");

    const tx = await contract.wrapAndApprove(amountToWrap, { value: amountToWrap });
    console.log("Transaction sent! Hash: ", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed! Block #:", receipt.blockNumber);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
});