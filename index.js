require('dotenv').config();
const axios = require('axios');

const ALCHEMY_URL = process.env.ALCHEMY_URL;
const SEPOLIA_WALLET = process.env.SEPOLIA_WALLET;

axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [
        SEPOLIA_WALLET, // address
        "latest" // latest block
    ]
}).then((response) => {
    console.log(response.data.result);
});