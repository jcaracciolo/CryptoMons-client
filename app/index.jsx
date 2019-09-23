import React from 'react';
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import CryptoMons from './components/CryptoMons.jsx';
import PlasmaTokens from './components/PlasmaTokens.jsx';

import async from 'async';

import {
	subscribeToDeposits, subscribeToSubmittedBlocks, subscribeToStartedExit, subscribeToCoinReset, subscribeToChallengeRespond,
	subscribeToFinalizedExit, subscribeToWithdrew, subscribeToFreeBond, subscribeToSlashedBond,
	getChallengedFrom, finalizeExit, withdraw, getChallengeable, challengeAfter, challengeBefore,
	challengeBetween, getChallenge, respondChallenge, getBalance, withdrawBonds,
	checkEmptyBlock, checkInclusion } from '../services/ethService';

import { loadContracts, getProofHistory } from '../services/plasmaServices';
import { recover, decodeTransactionBytes, generateTransactionHash } from '../utils/cryptoUtils';

import { getCryptoMonsFrom, getOwnedTokens, getExitingFrom, getExitedTokens } from './redux/actions'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			myChallengedTokens: [],
			withdrawableAmount: '0'
		}
	}

	componentDidMount = () => {
		const interval = setInterval(() => {
			if (web3.eth.defaultAccount) {
				this.ethAccount = web3.eth.defaultAccount;
				this.init();
				clearInterval(interval);
			}
		}, 100);
	};

	init = () => {
		this.loadContracts().then(() => {
			this.subscribeToEvents(this.ethAccount);
			this.getCryptoMonsFrom(this.ethAccount);
			this.getPlasmaTokensFrom(this.ethAccount);
			this.getExitingFrom(this.ethAccount);
			this.getChallengedFrom(this.ethAccount);
			this.getBalance();
			this.setState({ loading: false })
		});

	}


	loadContracts = async () => {
		const res = await loadContracts();
		return this.setState({
			rootChain: { ...res.RootChain, address: res.RootChain.networks['5777'].address },
			cryptoMons: { ...res.CryptoMons, address: res.CryptoMons.networks['5777'].address },
			vmc: { ...res.ValidatorManagerContract, address: res.ValidatorManagerContract.networks['5777'].address }
		});
	};

	subscribeToEvents = address => {
		const { rootChain } = this.state;

		subscribeToDeposits(rootChain, address,(r => {
			this.getCryptoMonsFrom(this.ethAccount);
			this.getPlasmaTokensFrom(this.ethAccount);
			console.log("DEPOSIT - Slot: " + r.args.slot.toFixed())
		}));

		subscribeToCoinReset(rootChain, address,(r => {
			this.getPlasmaTokensFrom(this.ethAccount);
			this.getExitingFrom(this.ethAccount);
			this.getChallengedFrom(this.ethAccount);
			getChallengeable(this.ethAccount, rootChain);
			console.log("Coin Reset - Slot: " + r.args.slot.toFixed())
		}));

		subscribeToFinalizedExit(rootChain, address,(r => {
			this.getExitingFrom(this.ethAccount);
			this.props.getExitedTokens(address, rootChain);
			console.log("Finalized Exit - Slot: " + r.args.slot.toFixed())
		}));

		subscribeToStartedExit(rootChain, address,(r => {
			this.getPlasmaTokensFrom(this.ethAccount);
			this.getExitingFrom(this.ethAccount);
			console.log("Started Exit - Slot: " + r.args.slot.toFixed())
		}));

		subscribeToSubmittedBlocks(rootChain,(r => {
			this.getPlasmaTokensFrom(this.ethAccount);
			console.log("Block Submitted - BlockNumber: " + r.args.blockNumber.toFixed())
		}));

		subscribeToWithdrew(rootChain, address,(r => {
			this.props.getExitedTokens(address, rootChain);
			this.getCryptoMonsFrom(this.ethAccount);
			console.log("Withdrawal - Slot: " + r.args.slot.toFixed())
		}));

		subscribeToFreeBond(rootChain, address, (r => {
			console.log('Free Bond event');
			this.getBalance().then(withdrawableAmount => {
				if (withdrawableAmount > 0) {
					/// TODO: uncomment when events aren't called 11+ times
					// withdrawBonds(rootChain).then(() => console.log(`You have withdrew ${withdrawableAmount} wei.`))
				}
			});
		}))

		subscribeToSlashedBond(rootChain, address, (r => {
			console.log('Slashed Bond event');
			this.getBalance().then(withdrawableAmount => {
				if (withdrawableAmount > 0) {
					/// TODO: uncomment when events aren't called 11+ times
					// withdrawBonds(rootChain).then(() => console.log(`You have withdrew ${withdrawableAmount} wei.`))
				}
			});
		}))

		subscribeToChallengeRespond(rootChain, address, (r => {
			getChallengeable(this.ethAccount, rootChain);
			this.getChallengedFrom(this.ethAccount);
			this.getBalance();
			console.log('RespondedExitChallenge event');
		}))
	};

	getBalance = () => {
		const { rootChain } = this.state;
		return getBalance(rootChain).then(async withdrawable => {
			await this.setState({ withdrawableAmount: withdrawable.toFixed() });
			return withdrawable;
		})
	}

	withdrawBonds = () => {
		const { rootChain, withdrawableAmount } = this.state;
		withdrawBonds(rootChain).then(() => {
			console.log(`You have withdrew ${withdrawableAmount} wei.`);
			this.setState({ withdrawableAmount: 0 });
		})
	}

	getCryptoMonsFrom = async address => {
		const { cryptoMons } = this.state;
		const { getCryptoMonsFrom } = this.props;
		getCryptoMonsFrom(address, cryptoMons);
	};

	getPlasmaTokensFrom = async address => {
		this.props.getOwnedTokens(address, false);
	};

  getExitingFrom = async address => {
		const { rootChain } = this.state;
		this.props.getExitingFrom(address, rootChain);
	};

	getChallengedFrom = async address => {
		const { rootChain } = this.state;
		const challenges = await getChallengedFrom(address, rootChain);
		this.setState({ myChallengedTokens: challenges });
	};

	finalizeExit = async token => {
		const { rootChain } = this.state;
		await finalizeExit(rootChain, token);
		console.log("Finalized Exit successful");
	};

	respondChallenge = async (token, hash) => {
		const { rootChain } = this.state;
		const challenge = await getChallenge(token, hash, rootChain);
		const challengingBlock = challenge[3];
		respondChallenge(token, challengingBlock, hash, rootChain);
	};

	verifyToken = async () => {
		const { tokenToVerify: token, rootChain } = this.state;
		const { history } = await getProofHistory(token);
		console.log(history)

		console.log(`validating ${Object.keys(history).length} blocks`)

		let included = await Promise.all(
		  Object.keys(history).map(blockNumber => {
        const { transactionBytes, hash, proof } = history[blockNumber];
        if (!transactionBytes && proof == "0x0000000000000000") {
          return checkEmptyBlock(blockNumber, rootChain);
        } else {
          return checkInclusion(hash, blockNumber, token, proof, rootChain)
        }
      })
		);
		console.log(included)
		let fail = included.indexOf(false);
		//TODO API returns block before they are propagated
    if(fail != -1 && fail != included.length - 1) {
      let blockNumber = Object.keys(history)[fail];
      console.log(`Error in history! Fail validation in block ${blockNumber}`);
      return this.setState({ historyValid: false, lastValidOwner: "unknown", lastValidBlock: blockNumber });
    }

    let transactions = Object.keys(history).filter(blockNumber => history[blockNumber].transactionBytes);

		async.waterfall([
			async cb => {
				// Deposit
				const depositBlock = Object.keys(history)[0];
				const { transactionBytes, proof } = history[depositBlock];
				const { slot, blockSpent, recipient } = decodeTransactionBytes(transactionBytes);
				const hash = generateTransactionHash(slot, blockSpent, recipient);

				if (await checkInclusion(hash, depositBlock, token, proof, rootChain)) {
					return cb(null, recipient);
				} else {
					return cb({error: "Validation failed", blockNumber: blockSpent, lastOwner: owner})
				}

			},
			// Other blocks
			...transactions.slice(1).map(blockNumber => async (owner, cb) => {
				const { transactionBytes, signature, hash } = history[blockNumber];

				if (transactionBytes) {
					const { slot, blockSpent, recipient } = decodeTransactionBytes(transactionBytes);
					const generatedHash = generateTransactionHash(slot, blockSpent, recipient);

					if(generatedHash.toLowerCase() != hash.toLowerCase()) {
            return cb({error: "Hash does not match", blockNumber: blockSpent, lastOwner: owner})
          }

					if(recover(hash, signature) != owner.toLowerCase()) {
						return cb({error: "Not signed correctly", blockNumber: blockSpent, lastOwner: owner})
					}

          return cb(null, recipient);
				}
			})
		], (err, lastOwner) => {
				if (err) {
					console.log(`Error in history! Last true owner: ${err.lastOwner} in block ${err.blockNumber}`);
					this.setState({ historyValid: false, lastValidOwner: err.lastOwner, lastValidBlock: err.blockNumber })
				} else {
          console.log(`Correct history! Last true owner: ${lastOwner}`);
          this.setState({historyValid: true, lastValidOwner: lastOwner});
        }

			});
	}

	handleChange = fieldName => event => {
		this.setState({ [fieldName]: event.target.value });
	}

	render() {
		const { loading, rootChain, cryptoMons, vmc,
			myChallengedTokens, withdrawableAmount, tokenToVerify, historyValid, lastValidOwner, lastValidBlock } = this.state;

		if (loading) return (<div>Loading...</div>)

		return (
			<React.Fragment>
				<p>Calling with address: {this.ethAccount}</p>
				<button onClick={this.loadContracts}>Load contracts</button>
				{withdrawableAmount != '0' && <button onClick={this.withdrawBonds}>Withdraw all bonds (total: {withdrawableAmount}) </button>}
				<p>RootChain address: {rootChain && rootChain.address}</p>
				<p>CryptoMon address: {cryptoMons && cryptoMons.address}</p>
				<p>VMC address: {vmc && vmc.address}</p>

				<div>
					<p style={{ display: "inline-block" }}>Verify token history:</p>
					<input
						value={tokenToVerify || ''}
						onChange={event => {
							this.handleChange("tokenToVerify")(event);
							this.setState({ historyValid: undefined });
						}}
						placeholder="Token" />
					<button onClick={this.verifyToken}>Verify</button>
					{tokenToVerify && historyValid === true && <p style={{ display: 'inline', color: 'green' }}>Valid history! Last owner: {lastValidOwner}</p>}
					{tokenToVerify && historyValid === false && <p style={{ display: 'inline', color: 'red' }}>Invalid history! Last owner: {lastValidOwner} in block {lastValidBlock}</p>}
				</div>

				<CryptoMons cryptoMonsContract={cryptoMons} rootChainContract={rootChain} />

				<PlasmaTokens cryptoMonsContract={cryptoMons} rootChainContract={rootChain} ethAccount={this.ethAccount} />

				<p>My Challenged Tokens:</p>
				{myChallengedTokens.map(challenge => (
					<div key={challenge.slot}>
						<p style={{ display: "inline" }}>{challenge.slot}</p>
						{challenge.txHash.map(hash =>
							<div>
								<button key={hash} onClick={() => this.respondChallenge(challenge.slot, hash)}>Respond</button>
								<button key={hash + "exit"} onClick={() => this.finalizeExit(challenge.slot)}>Finalize Exit</button>
							</div>
						)}
					</div>
				))}

				<Link to="/hacks/">Hacks!</Link>

			</React.Fragment>
		)
	}
}


const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
	getOwnedTokens: (address, exiting) => dispatch(getOwnedTokens(address, exiting)),
	getCryptoMonsFrom: (address, cryptoMonsContract) => dispatch(getCryptoMonsFrom(address, cryptoMonsContract)),
	getExitingFrom: (address, rootChainContract) => dispatch(getExitingFrom(address, rootChainContract)),
	getExitedTokens: (address, rootChainContract) => dispatch(getExitedTokens(address, rootChainContract)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);