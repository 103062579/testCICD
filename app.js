const express = require('express')
const app = express();
require('dotenv').config();
const node = require("./services/nodeReader")
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// node.scanWallets();
// nodeReader.nodeListener();
// node.createUserWallet();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});