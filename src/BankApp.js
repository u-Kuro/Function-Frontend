import { React, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import styles from './Bank.module.css'
import atm_abi from './artifacts/Contracts/Token.sol/Token.json'

const BankApp = () => {

	// deploy simple token contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [transferHash, setTransferHash] = useState(null);
	const [accbalance, setAccBalance] = useState("");

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					accountChangedHandler(result);
					setConnButtonText('Wallet Connected');
				})
				.catch(error => {
					setErrorMessage(error.message);
				});
		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount[0]);
		updateEthers();
		AccountBalance();
	}
	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	useEffect(() => {
		window.ethereum.on('accountsChanged', accountChangedHandler);
		window.ethereum.on('chainChanged', chainChangedHandler);
	}, []);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, atm_abi.abi, tempSigner);
		setContract(tempContract);
	}

	const AccountBalance = async () => {
		try {
			let balanceWei = await contract.accountBalance();
			let balanceEth = ethers.utils.formatUnits(balanceWei, 'ether');
			setAccBalance(balanceEth + " ETH");
		} catch (ex) {
			console.log(ex)
		}
	}

	const transferHandler = async (e) => {
		e.preventDefault();
		try {
			let transferEthAmount = await e.target.sendAmount.value;
			let transferWeiAmount = ethers.utils.parseEther(transferEthAmount);
			let recieverAddress = await e.target.recieverAddress.value;
			let txt = await contract.transferEther(recieverAddress, { value: transferWeiAmount, gasLimit: 3e7 });
			if (txt.hash) {
				setTransferHash("Transfer confirmation hash: " + txt.hash);
			}
		} catch (ex) {
			console.log(ex)
			setErrorMessage('Failed to transfer.');
		}
	}


	return (
		<div >
			<h2> DAPP - Balance and Transfer (ETH & MetaMask)</h2>
			<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
			<div className={styles.walletCard}>
				<div>
					<h3>Address: {defaultAccount}</h3>
				</div>

				<div>
					<button onClick={AccountBalance}>Account Balance</button> <h3>Balance in the Bank: {accbalance} </h3>
				</div>

				{errorMessage}
			</div>
			<div className={styles.interactionsCard}>
				<form onSubmit={transferHandler}>
					<h3> Transfer money </h3>
					<p> Reciever Address </p>
					<input type='text' id='recieverAddress' className={styles.addressInput} />

					<p> Transfer Amount </p>
					<input type='number' id='sendAmount' min='0' step="0.00000001" />

					<button type='submit'>Transfer</button>
					<div>
						{transferHash}
					</div>
				</form>
			</div>

		</div>
	)
}

export default BankApp;