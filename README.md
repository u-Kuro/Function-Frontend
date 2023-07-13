## DAPP - Balance and Transfer (ETH & MetaMask)

This repository contains a decentralized application (DAPP) that allows users to check their account balance and transfer funds using Ethereum and MetaMask. The DAPP is built using React and Solidity.

### Features
- Connect Wallet: Users can connect their MetaMask wallet to the DAPP.
- Account Balance: Users can view their account balance in the DAPP.
- Transfer Funds: Users can transfer funds to another Ethereum address by specifying the recipient address and the transfer amount.

### Smart Contract
The smart contract is implemented in Solidity and is named `Token.sol`. It includes the following functions:

- `transferEther`: Allows users to transfer Ether to another address. It requires the sender to have a sufficient balance.
- `accountBalance`: Returns the account balance of the caller.

### Frontend
The frontend of the DAPP is implemented using React and is contained in the `DAPP.js` file. It includes the following functionality:

- Connect Wallet: Allows users to connect their MetaMask wallet to the DAPP.
- Account Balance: Displays the account balance of the connected wallet.
- Transfer Funds: Enables users to specify a recipient address and transfer amount to send funds.

The DAPP uses the Ethereum provider and signer from MetaMask to interact with the smart contract. The ABI (Application Binary Interface) of the smart contract is imported from `Token.json`.

### Usage
1. Install MetaMask browser extension.
2. Open the DAPP in a web browser.
3. Click on the "Connect Wallet" button to connect your MetaMask wallet.
4. Once connected, you can view your account balance.
5. To transfer funds, enter the recipient address and the transfer amount in the provided input fields and click the "Transfer" button.
6. The transaction confirmation hash will be displayed upon successful transfer.
