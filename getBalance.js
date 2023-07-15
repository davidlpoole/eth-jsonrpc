require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getBalance(address) {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [
            "0x3bfc20f0b9afcace800d73d2191166ff16540258",   // Address
            "latest"                                        // Either the hex value of a block number OR a block hash OR one of `pending`, `latest`, `earliest`
        ],
    });

    console.log(response.data);

    // return the balance of the address
    return response.data.result;
}

module.exports = getBalance;