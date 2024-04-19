const { ethers } = require("hardhat");

async function main() {
    // get the contract factory
    const BridgeContract = await ethers.getContractFactory("SepoliaToBobaBridge");


    // deploy contract
    const bridgeContract = await BridgeContract.deploy();
    await bridgeContract.deployed();
    console.log("SepoliaToBobaBridge deployed to: ", bridgeContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })