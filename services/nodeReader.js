const { AlchemyWebSocket, FID_contractAddress, MATIC_contractAddress, serverUrl,appId  } = process.env;
const abi = require("../resources/abi.json");
const ethers = require('ethers');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const _crypto = require('crypto')
const Moralis  = require('moralis/node');

exports.scanWallets = async (req, res) => {
    //user moralis to get the balances of each wallet,
    //check the amounts
    //cron
    Moralis.start({ serverUrl, appId }).catch(err => { console.log(err) })
    let wallet = "0x164da5107d09Ed1A910d74A1fD0E6A509592D71B"
    //let users = UsersWallet.findAll()
    // users.forEach(element => {
    const options = {
        chain: "matic",
        // address: element.wallet,
        address: wallet,
    };
    const balances = await Moralis.Web3API.account.getTokenBalances(options);
    console.log(balances)
    // });
}


exports.createUserWallet = async (req, res) => {
    //create private key,
    //wallet address,
    //encrpt and save private key,

    //if user donesnt have wallet
    const PK = _crypto.randomBytes(16)
    console.log(PK)
    // wallet = new ethers.Wallet(PK)
    console.log(wallet)
}


exports.nodeListener = async (req, res) => {
    const provider = new ethers.providers.WebSocketProvider(AlchemyWebSocket);

    const MATICcontract = new ethers.Contract(MATIC_contractAddress, abi, provider)
    MATICcontract.on('Transfer', (from, to, value) => {
        //let user = UsersWallet.findOne({where:{wallet : to}})
        //user.updatebalance / check if they purchased a giftcard 
        //if no giftcard purchase update acc balance
        console.log(from, to, ethers.utils.formatEther(value) + "MATIC")
    })

    const FIDcontract = new ethers.Contract(FID_contractAddress, abi, provider)
    FIDcontract.on('Transfer', (from, to, value) => {
        //let user = UsersWallet.findOne({where:{wallet : to}})
        //user.updatebalance / check if they purchased a giftcard 
        //if no giftcard purchase update acc balance
        console.log(from, to, ethers.utils.formatEther(value) + "FID")
    })
}

