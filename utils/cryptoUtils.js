import { toCMBBytes } from "./CryptoMonsBattles";

const EthUtils	= require('ethereumjs-util');
const BN = require('bn.js');
const RLP = require('rlp');
const Buffer = require('buffer').Buffer;
const abi = require('ethereumjs-abi');

export const generateTransactionHash = (slot, blockSpent, recipient) => {
	const slotBN = new BN(slot);
	const blockSpentBN = new BN(blockSpent);

	if(blockSpentBN.isZero()) {
		return EthUtils.bufferToHex(EthUtils.keccak256(EthUtils.setLengthLeft(slotBN.toArrayLike(Buffer), 64/8))) //uint64 little endian
	} else {
		return EthUtils.bufferToHex(EthUtils.keccak256(getTransactionBytes(slotBN, blockSpentBN, recipient)))
	}
};

export const keccak256 = (...args) => {
	return EthUtils.bufferToHex(EthUtils.keccak256(EthUtils.bufferToHex(Buffer.concat(args))));
}

export const generateSwapHash = (slot, blockSpent, hashSecret, recipient, swappingSlot) => {
	const slotBN = new BN(slot);
	const blockSpentBN = new BN(blockSpent);
	const swappingSlotBN = new BN(swappingSlot);

	let params = [
		//TODO check if this can be less than 256 (using other than toUint() in solidity. Maybe to Address())?
		EthUtils.setLengthLeft(slotBN.toArrayLike(Buffer), 64/8), 		 // uint256 little endian
		EthUtils.setLengthLeft(blockSpentBN.toArrayLike(Buffer), 256/8),	 // uint256 little endian
		EthUtils.toBuffer(hashSecret),													 // must start with 0x
		EthUtils.toBuffer(recipient),												     // must start with 0x
		EthUtils.setLengthLeft(swappingSlotBN.toArrayLike(Buffer), 64/8), // uint256 little endian
	];

	return EthUtils.bufferToHex(EthUtils.keccak256(EthUtils.bufferToHex(Buffer.concat(params))));
};

export const getHash = (message) => {
	return EthUtils.bufferToHex(EthUtils.keccak256(message))
};

const getTransactionBytes = (slot, blockSpent, recipient) => {
	const params = [
		EthUtils.setLengthLeft(slot.toArrayLike(Buffer), 256/8), 			// uint256 little endian
		EthUtils.setLengthLeft(blockSpent.toArrayLike(Buffer), 256/8),	// uint256 little endian
		EthUtils.toBuffer(recipient),																						// must start with 0x
	];

	return EthUtils.bufferToHex(RLP.encode(params));
}

export const decodeTransactionBytes = bytes => {
	const decoded = RLP.decode(bytes);
	const slot = (new BN(decoded[0])).toString(10);
	const blockSpent = (new BN(decoded[1])).toString(10);
	const recipient = EthUtils.bufferToHex(decoded[2]);
	return { slot, blockSpent, recipient }
}

export const decodeSwapTransactionBytes = bytes => {
	const decoded = RLP.decode(bytes);
	const slotA = (new BN(decoded[0])).toString(10);
	const blockSpentA = (new BN(decoded[1])).toString(10);
	const secretA = EthUtils.bufferToHex(decoded[2]);
	const B = EthUtils.bufferToHex(decoded[3]);

	const slotB = (new BN(decoded[4])).toString(10);
	const blockSpentB = (new BN(decoded[5])).toString(10);
	const secretB = EthUtils.bufferToHex(decoded[6]);
	const A = EthUtils.bufferToHex(decoded[7]);

	const signatureB = EthUtils.bufferToHex(decoded[8]);

	return { slotA, blockSpentA, secretA, B, slotB, blockSpentB, secretB, A, signatureB }
};

export const sign = (message) => {
	return new Promise((resolve, reject) => {
		web3.eth.sign(web3.eth.defaultAccount, message, (err, signature) => {
			if(err) return reject(err)
			resolve(signature)
		});
	});
}

export const isSwapBytes = (txBytes) => {
	return RLP.decode(txBytes).length == 9;
}

export const recover = (hash, signature) => {
  const SignatureMode = [
    'EIP712',
    'GETH',
    'TREZOR'
  ];
  //TODO revise this
  const signatureMode = 'EIP712';
  let _hash = hash;
  if (signatureMode === 'GETH') {
    _hash = EthUtils.bufferToHex(EthUtils.keccak256("\x19Ethereum Signed Message:\n32", hash));
  } else if (signatureMode === 'TREZOR') {
    _hash = EthUtils.bufferToHex(EthUtils.keccak256("\x19Ethereum Signed Message:\n\x20", hash));
  }

  let res = EthUtils.fromRpcSig(signature)
  return EthUtils.bufferToHex(EthUtils.pubToAddress(EthUtils.ecrecover(EthUtils.toBuffer(_hash), res.v, res.r, res.s)));
};

export const hashChannelState = (state) => {

	return EthUtils.bufferToHex(
				abi.soliditySHA3(["uint256","address","address[]","uint256","bytes"],
			[
				state.channelId,
				state.channelType,
				state.participants,
				state.turnNum,
				toCMBBytes(state.game)
			])
	);
};

export const getExitDataToBattleRLPData = (exitData) => {
	if(!exitData.prevBlock) {
		return EthUtils.bufferToHex(RLP.encode([new BN(0).toArrayLike(Buffer)]));
	} else {
		let params = [
			new BN(exitData.slot).toArrayLike(Buffer),
			new BN(exitData.prevBlock).toArrayLike(Buffer),
			new BN(exitData.exitingBlock).toArrayLike(Buffer),
			EthUtils.toBuffer(exitData.prevTxBytes),
			EthUtils.toBuffer(exitData.exitingTxBytes),
			EthUtils.toBuffer(exitData.prevTxInclusionProof),
			EthUtils.toBuffer(exitData.exitingTxInclusionProof),
			EthUtils.toBuffer(exitData.signature),
		]

		return EthUtils.bufferToHex(RLP.encode(params));
	}
}

export const hashCancelSecret = (hashSecret, slot, minedBlock) => {
	return EthUtils.bufferToHex(
		abi.soliditySHA3(["bytes","uint64","uint256"],
			[
				EthUtils.toBuffer(hashSecret),
				slot,
				minedBlock
			])
	)
}