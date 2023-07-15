require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {assert} = require('chai');
const getBlockNumber = require("./getBlockNumber");
const getBalance = require("./getBalance");

describe('api key', () => {
    it('should be a valid api key', async () => {
        const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;
        const address = "0x3bfc20f0b9afcace800d73d2191166ff16540258";

        const { data: { result } } = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [address, "latest"],
        });

        assert.isAbove(parseInt(result), 0x40db451e4e74a0311e90);
    });
});


describe('getBlockNumber', function () {
    it('should get the current block number', async () => {
        const blockNumber = await getBlockNumber();
        const parsed = parseInt(blockNumber);
        assert(!isNaN(parsed), `We expected you to return a block number, here is what you returned: ${blockNumber}`);
        assert.isAbove(parseInt(blockNumber), 0xfde2cf);
    });
});

describe('getBalance', () => {
    it('should find the balance of the address with 10 ether', async () => {
        const balance = await getBalance("0x3bfc20f0b9afcace800d73d2191166ff16540258");
        const parsed = parseInt(balance);
        assert(!isNaN(parsed), `We expected you to return a balance, here is what you returned: ${balance}`);
        assert.isAbove(parsed, 0x40db451e4e74a0311e90);
    });
});