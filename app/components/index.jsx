import React from 'react';
import {connect} from "react-redux";

import {withSnackbar} from 'notistack';

import InitComponent from './common/InitComponent.jsx'
import withInitComponent from './common/withInitComponent.js'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CryptoMons from '../components/CryptoMons.jsx';
import PlasmaTokens from '../components/PlasmaTokens.jsx';

import {getBalance, withdrawBonds} from '../../services/ethService';
import {buyCryptoMon, loadContracts} from '../redux/actions';
const BN = require('bn.js');

class App extends InitComponent {

	constructor(props) {
		super(props)
		this.state = {
			loading: !props.rootChainContract,
		}
	}

	init = () => {
		this.getBalance();
		this.setState({ loading: false })
	}

	getBalance = () => {
		const { rootChainContract } = this.props;
		return getBalance(rootChainContract).then(async withdrawable => {
			await this.setState({ withdrawableAmount: withdrawable });
			return withdrawable;
		})
	}

	withdrawBonds = () => {
		const { rootChainContract, withdrawableAmount } = this.props;
		withdrawBonds(rootChainContract).then(() => {
			console.log(`You have withdrew ${withdrawableAmount} wei.`);
			this.setState({ withdrawableAmount: "0" });
		})
	}

	buyCryptoMon = async () => {
		const { buyCryptoMon, cryptoMonsContract, ethAccount, enqueueSnackbar } = this.props;
		buyCryptoMon(ethAccount, cryptoMonsContract).then(() => {
			enqueueSnackbar('Cryptomon successfully bought!', { variant: 'success' })
		})
	};

	render() {
		const { cryptoMonsContract, rootChainContract, vmcContract, ethAccount, withdrawableAmount} = this.props;
		const { loading } = this.state;
		const withdrawableAmountBN = new BN(withdrawableAmount);

		if (loading) return (<div>Loading...</div>)

		return (
			<div style={{ padding: '1em', marginBottom: '10em' }}>
			<Typography variant="h5" gutterBottom>Hi {ethAccount}!</Typography>
				<Grid container direction="column">
					<Grid item style={{ alignSelf: 'center' }}>
						<Paper style={{ padding: '1em', display: 'inline-block' }}>
							<Typography variant="h5" component="h3">Contracts</Typography>
							<Typography variant="body2"><b>RootChain address:</b> {rootChainContract && rootChainContract.address}</Typography>
							<Typography variant="body2"><b>CryptoMon address:</b> {cryptoMonsContract && cryptoMonsContract.address}</Typography>
							<Typography variant="body2"><b>VMC address:</b> {vmcContract && vmcContract.address}</Typography>
						</Paper>
					</Grid>
					<Grid item>
					</Grid>
					<Grid item>
						{!withdrawableAmountBN.isZero() && (
							<React.Fragment>
								<Typography style={{ display: 'inline-block', marginRight: '0.5em' }}>You have {withdrawableAmount / 1000000000000000000} ETH to withdraw</Typography>
								<Button color="primary" variant="contained" size="small" onClick={this.withdrawBonds}>Withdraw all bonds</Button>
							</React.Fragment>
						)}
					</Grid>
					<Grid item>
						<Button onClick={this.buyCryptoMon} variant="contained" color="primary">Buy CryptoMon</Button>
					</Grid>
				</Grid>
				<ExpansionPanel defaultExpanded style={{ marginTop: '1em' }}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}>
						<Typography>My CryptoMons</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ minHeight: '21em' }}>
						<CryptoMons/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel defaultExpanded>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}>
						<Typography>My Plasma Tokens</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ minHeight: '21em' }}>
						<PlasmaTokens/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	vmcContract: state.vmcContract,
	cryptoMonsContract: state.cryptoMonsContract,
	rootChainContract: state.rootChainContract,
	ethAccount: state.ethAccount,
	withdrawableAmount: state.withdrawableAmount
 });

const mapDispatchToProps = dispatch => ({
	loadContracts: () => dispatch(loadContracts()),
	buyCryptoMon: (address, cryptoMonsContract) => dispatch(buyCryptoMon(address, cryptoMonsContract)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withInitComponent(App)));