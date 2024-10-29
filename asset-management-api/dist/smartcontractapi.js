"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fabric_network_1 = require("fabric-network");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Path to connection profile and wallet
const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const walletPath = path.join(process.cwd(), 'wallet');
async function connectToNetwork() {
    const wallet = await fabric_network_1.Wallets.newFileSystemWallet(walletPath);
    const gateway = new fabric_network_1.Gateway();
    // Read and parse the connection profile
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser', // Ensure appUser is enrolled
        discovery: { enabled: true, asLocalhost: true }
    });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('AssetManagementContract');
    return { gateway, contract };
}
// API to create an asset at /api/assets
app.post('/api/assets', async (req, res) => {
    const { dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks } = req.body;
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('createAsset', dealerId, msisdn, mpin, balance.toString(), status, transAmount.toString(), transType, remarks);
        await gateway.disconnect();
        res.status(201).send('Asset created successfully'); // Change to 201 for resource creation
    }
    catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});
// API to query an asset
app.get('/api/assets/:dealerId', async (req, res) => {
    const { dealerId } = req.params;
    try {
        const { gateway, contract } = await connectToNetwork();
        const result = await contract.evaluateTransaction('queryAsset', dealerId);
        await gateway.disconnect();
        res.status(200).json(JSON.parse(result.toString()));
    }
    catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});
// API to update asset value
app.put('/api/assets', async (req, res) => {
    const { dealerId, newBalance } = req.body;
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('updateAssetValue', dealerId, newBalance.toString());
        await gateway.disconnect();
        res.status(200).send('Asset updated successfully');
    }
    catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});
// API to get transaction history
app.get('/api/assets/history/:dealerId', async (req, res) => {
    const { dealerId } = req.params;
    try {
        const { gateway, contract } = await connectToNetwork();
        const result = await contract.evaluateTransaction('getTransactionHistory', dealerId);
        await gateway.disconnect();
        res.status(200).json(JSON.parse(result.toString()));
    }
    catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});
// Start the server
app.listen(3000, () => {
    console.log('API server is running at http://localhost:3000');
});
