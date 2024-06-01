const hre = require("hardhat");

 async function main() {
    const Tracking = await hre.ethers.getContractFactory("Tracking");
    const tracking = await Tracking.deploy();


        await tracking.deployed();

        console.log(`Tracking deployed to ${tracking.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})


// npx hardhat run --network localhost scripts/deploy.js