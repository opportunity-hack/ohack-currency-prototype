require('dotenv');

const { ethers } = require("hardhat");
const { SEPOLIA_CONTRACT_ADDRESS, METAMASK_WALLET_ADDRESS } = process.env;

async function main() {
    const contractAddress = SEPOLIA_CONTRACT_ADDRESS;
    const Contract = await ethers.getContractFactory("SepoliaToBobaBridge");
    const contract = Contract.attach(contractAddress);

    const targetAddress = METAMASK_WALLET_ADDRESS;
    const amountToWrapAndBridge = ethers.utils.parseEther("0.01"); // 0.01 SepoliaWETH
    const l2GasLimit = 200000;
    const data = ethers.utils.formatBytes32String("Testnet transfer L1 to L2");
    

    try {
        let tx;
        let receipt;

        tx = await contract.wrapAndApprove(amountToWrapAndBridge, { value: amountToWrapAndBridge });
        console.log("Wrap WETH Transaction sent! Hash: ", tx.hash);
        receipt = await tx.wait();
        console.log("Wrap WETH Transaction confirmed! Block #: ", receipt.blockNumber);


   
        // execute bridge function
        tx = await contract.bridgeSepoliaWETHTo(targetAddress, amountToWrapAndBridge, l2GasLimit, data, {
            gasLimit: 500000
        });
        console.log("Bridging Transaction sent! Hash: ", tx.hash);
        receipt = await tx.wait();
        console.log("Bridging Transaction confirmed! Block #: ", receipt.blockNumber);

   
    } catch (error) {
         // Generic error handling to extract and log the revert reason if available
         if (error.reason) {
            console.error("Transaction failed with revert reason:", error.reason);
        } else if (error.message) {
            console.error("Transaction failed with error message:", error.message);
        } else {
            console.error("Error:", error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });