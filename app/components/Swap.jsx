import React from 'react';

import InitComponent from './common/InitComponent.jsx';
import withInitComponent from './common/withInitComponent.js';

import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import DoubleCryptoMonCard from './common/DoubleCryptoMonCard.jsx';

import {fallibleSnackPromise, toAddressColor, toReadableAddress} from '../../utils/utils';
import {createAtomicSwap, getSwapData} from '../../services/plasmaServices'
import {cancelSecret, getSwappingRequests, getSwappingTokens, revealSecret} from '../redux/actions';
import ValidateHistoryModal from "./common/ValidateHistoryModal.jsx";
import {withSnackbar} from "notistack";

const styles = theme => ({
	dialogPaper: {
		maxWidth: '40em',
		width: '40em',
	},
});

class Swap extends InitComponent {

  state = {
    secretModalOpen: false
  };

	init = () => {
    const { getSwappingTokens, getSwappingRequests, ethAccount } = this.props;
		getSwappingTokens(ethAccount);
		getSwappingRequests(ethAccount);
	};

	revealSecret = async () => {
		const { tokenToReveal, secretToReveal } = this.state;
		const { revealSecret, enqueueSnackbar } = this.props;

		this.setState({ isRevealingSecret: true });

		fallibleSnackPromise(revealSecret(tokenToReveal, secretToReveal),
			enqueueSnackbar,
			`Secret revealed successfully, wait for all secrets to be revealed`,
			`Revealing secret failed`,
			'warning'
		).finally(() =>{
			this.setState({ isRevealingSecret: false });
			this.closeRevealSecretModal();
		})
	};

	cancelSecret = async () => {
		const { tokenToReveal, hashSecretToCancel } = this.state;
		const { cancelSecret, enqueueSnackbar, getSwappingRequests, ethAccount } = this.props;

		this.setState({ isRevealingSecret: true });

		fallibleSnackPromise(cancelSecret(tokenToReveal, hashSecretToCancel),
			enqueueSnackbar,
			`Secret cancelled successfully, wait for all secrets to be revealed`,
			`Cancelling secret failed`,
		)
		.then(() => getSwappingRequests(ethAccount))
		.finally(() => {
			this.setState({ isRevealingSecret: false });
			this.closeRevealSecretModal();
		});
	};

	swapInPlasma = async (myToken, swapToken) => {
		const { enqueueSnackbar, getSwappingRequests, getSwappingTokens, ethAccount } = this.props;
		this.setState({ isSwapping: true });

		fallibleSnackPromise(createAtomicSwap(ethAccount, myToken, swapToken),
			enqueueSnackbar,
			`Swap submitted successfully`,
			`Swap submission failed secret failed`
		)
			.then(secret => {
				this.setState({secret});
				getSwappingRequests(ethAccount);
				getSwappingTokens(ethAccount);
			})
			.finally(() => {
				this.setState({ isSwapping: false })
			})
	};

	openRevealSecretModal = (myToken, swappingToken, hashSecretToCancel) => () => {
		const savedSecret = localStorage.getItem(`swap_${myToken}_${swappingToken}`);
		this.setState({ 
			secretModalOpen: true,
			otherTokenToReveal: swappingToken,
			tokenToReveal: myToken,
			secretToReveal: savedSecret,
			hashSecretToCancel
		});
	};
	closeRevealSecretModal= () => this.setState({ secretModalOpen: false });

	openAcceptSwapModal= transaction => () => this.setState({ acceptSwapModalOpen: true, transactionToAccept: transaction });
	closeAcceptSwapModal= () => this.setState({ acceptSwapModalOpen: false });

	openValidateHistoryModal = (token) => () => this.setState({
		validateHistoryOpen: true,
		validatingToken: token,
	});
	closeValidateHistoryModal = () => this.setState({ validateHistoryOpen: false });


	handleChange = fieldName => event => {
		this.setState({ [fieldName]: event.target.value });
	};

	renderRevealSecretDialog = () => {
		const { secretModalOpen, isRevealingSecret, tokenToReveal, otherTokenToReveal, secretToReveal, hashSecretToCancel } = this.state;
		const { classes } = this.props;

		return (
			<Dialog onClose={this.closeRevealSecretModal} open={Boolean(secretModalOpen)} classes={{ paper: classes.dialogPaper }}>
				<DialogTitle>Reveal secret</DialogTitle>
				<Grid container style={{ padding: '1em' }}>
					<Grid item xs={12}>
						<Typography variant="body1"><u>Swapping token:</u> {otherTokenToReveal}</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Secret"
							fullWidth
							onChange={this.handleChange('secretToReveal')}
							value={secretToReveal || ''} />
					</Grid>
					<Grid item xs={12} style={{ padding: '1em' }}>
						<Button disabled={isRevealingSecret} color="primary" fullWidth
										onClick={() => this.revealSecret(tokenToReveal)} variant="outlined" size="small">Reveal</Button>
						<Button disabled={isRevealingSecret} color="primary" fullWidth
										onClick={() => this.cancelSecret(tokenToReveal, hashSecretToCancel)} variant="outlined" size="small">Cancel Swap</Button>
					</Grid>
				</Grid>
			</Dialog>
		)
	};

	renderAcceptSwapDialog = () => {
		const { acceptSwapModalOpen, transactionToAccept, isSwapping, secret, validateHistoryOpen } = this.state;
		const { classes, ethAccount } = this.props;

		if (!transactionToAccept) return null;

		return (
			<Dialog onClose={this.closeAcceptSwapModal} open={Boolean(acceptSwapModalOpen)} classes={{ paper: classes.dialogPaper }}>
				<DialogTitle style={{ textAlign: 'center' }} >Do you want to accept this swap request?</DialogTitle>
				<Grid container style={{ padding: '1em', justifyContent: "space-around" }}>
						<DoubleCryptoMonCard
							token1={transactionToAccept.swappingSlot}
							owner1={ethAccount}
							actions1={[{
								title: "Validate History",
								disabled: validateHistoryOpen,
								func: this.openValidateHistoryModal(transactionToAccept.swappingSlot)
							}]}
							token2={transactionToAccept.slot}
							owner2={transactionToAccept.owner}
							actions2={[{
								title: "Validate History",
								disabled: validateHistoryOpen,
								func: this.openValidateHistoryModal(transactionToAccept.slot)
							}]}

						/>
				</Grid>
				{secret && (
					<React.Fragment>
						<Typography variant="body1" style={{ display: 'block', margin: 'auto' }}><b>IMPORTANT!</b></Typography>
						<Typography variant="body1" style={{ display: 'block', margin: 'auto' }}>This is the random generated secret you will need to reveal in order to validate the transaction later:</Typography>
						<Typography variant="body1" style={{ display: 'block', margin: 'auto' }}><b>{secret}</b></Typography>
					</React.Fragment>
				)}
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={() => this.swapInPlasma(transactionToAccept.swappingSlot, transactionToAccept.slot)}
					disabled={Boolean(isSwapping || secret)}
				>
					Accept
				</Button>
			</Dialog>
		)
	}

  renderSwappingTokensSection = () => {
		const { swappingTokens, ethAccount } = this.props;
		const { validateHistoryOpen } = this.state;

    if (swappingTokens.length == 0){
      return <Typography style={{ margin: 'auto' }}  variant="body1">There are no swaps to confirm</Typography>
		}

    return(
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {swappingTokens.map(transaction => (
					<Paper key={transaction.hash} style={{padding: "1em", margin: "1em"}}>
						<DoubleCryptoMonCard
							token1={transaction.slot}
							owner1={ethAccount}
							actions1={[{
								title: "Validate History",
								disabled: validateHistoryOpen,
								func: this.openValidateHistoryModal(transaction.slot)
							}]}
							token2={transaction.swappingSlot}
							owner2={transaction.recipient}
							actions2={[{
								title: "Validate History",
								disabled: validateHistoryOpen,
								func: this.openValidateHistoryModal(transaction.swappingSlot)
							}]}
						/>
						<Button fullWidth variant="outlined" color="primary"
										onClick={this.openRevealSecretModal(transaction.slot, transaction.swappingSlot, transaction.hashSecret)}>
							See detail
						</Button>
					</Paper>
        ))}
      </div>
    )
	};

	renderValidateHistoryDialog = () => {
		const { validateHistoryOpen, validatingToken } = this.state;
		return (
			(validateHistoryOpen &&
				<ValidateHistoryModal
					open={validateHistoryOpen}
					handleClose={this.closeValidateHistoryModal}
					token={validatingToken}
				/>)
		)
	};

  renderSwappingRequestsSection = () => {
		const { swappingRequests, ethAccount } = this.props;

    if (swappingRequests.length == 0){
      return <Typography style={{ margin: 'auto' }}  variant="body1">There are no swapping requests for now</Typography>
    }

    return(
				<div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
					{swappingRequests.map(transaction => (
						<Grid item key={transaction.hash}>
							<Paper style={{ padding: '1em', margin: '1em' }}>
								<Grid container spacing={3} direction="column" alignItems="center">
									<Grid item xs={12}>
										<Typography variant="body1" style={{ maxWidth: '25em', textAlign: 'center' }}>
											<span style={{ color: toAddressColor(transaction.owner)}}>{toReadableAddress(transaction.owner)}</span> wants to swap with you!
										</Typography>
									</Grid>
									<Grid item xs={12} style={{ display: 'flex', alignItems: 'center',  }}>
										<DoubleCryptoMonCard
											token1={transaction.swappingSlot}
											owner1={ethAccount}
											token2={transaction.slot}
											owner2={transaction.owner}
										/>
									</Grid>
									<Grid item xs={8}>
										<Button variant="contained" size="large" color="primary" fullWidth onClick={this.openAcceptSwapModal(transaction)}>View</Button>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					))}
				</div>
    )
  };

  render = () => {
		const { rootChainContract } = this.props;

		if (!rootChainContract) return <div>Loading...</div>

    return (
			<div style={{ padding: '1em' }}>
				{this.renderRevealSecretDialog()}
				{this.renderAcceptSwapDialog()}
				{this.renderValidateHistoryDialog()}
				<Typography variant="h5" gutterBottom>Swaps</Typography>
				<ExpansionPanel defaultExpanded style={{ marginTop: '1em' }}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}>
						<Typography>Swapping tokens</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
            {this.renderSwappingTokensSection()}
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel defaultExpanded>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}>
						<Typography>Swapping requests</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
            {this.renderSwappingRequestsSection()}
					</ExpansionPanelDetails>
				</ExpansionPanel>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  ethAccount: state.ethAccount,
  swappingTokens: state.swappingTokens,
  swappingRequests: state.swappingRequests,
  rootChainContract: state.rootChainContract,
});

const mapDispatchToProps = dispatch => ({
  getSwappingTokens: address => dispatch(getSwappingTokens(address)),
  getSwappingRequests: address => dispatch(getSwappingRequests(address)),
	revealSecret: (token, secret) => dispatch(revealSecret(token, secret)),
	cancelSecret: (token, secret) => dispatch(cancelSecret(token, secret)),
});

const withInitSwap = withInitComponent(Swap);
const connectedSwap = connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withInitSwap));
const styledSwap = withStyles(styles)(connectedSwap);
export default styledSwap;