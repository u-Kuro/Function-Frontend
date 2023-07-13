import hre from 'hardhat';

async function main() {
    // Retrieve the contract factory
    const Token = await hre.ethers.getContractFactory('Token');

    const token = await Token.deploy();
    // Wait for the contract to be mined
    await token.deployed();

    // Log the deployed contract address
    console.log(`A contract deployed to: ${token.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
