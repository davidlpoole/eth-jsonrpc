require('dotenv').config();
const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');

const settings = {
    apiKey: process.env.TEST_API_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

let wallet = new Wallet(process.env.TEST_PRIVATE_KEY);

async function main() {
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        'latest'
    );

    let transaction = {
        to: process.env.SEPOLIA_WALLET,
        value: Utils.parseEther('0.001'), // 0.001 worth of ETH being sent
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,       // transaction count
        type: 2,            // not a legacy tx
        chainId: 11155111,  // Ethereum sepolia testnet transaction
}

    let rawTransaction = await wallet.signTransaction(transaction);
    console.log('Raw tx: ', rawTransaction);
    let tx = await alchemy.core.sendTransaction(rawTransaction);
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main();
