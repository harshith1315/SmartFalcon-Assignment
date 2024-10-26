import * as express from 'express';
import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function getWallet() {
    const walletPath = path.join(process.cwd(), 'wallet');
    return await Wallets.newFileSystemWallet(walletPath);
}

async function getContract() {
    const gateway = new Gateway();
    const wallet = await getWallet();
    await gateway.connect(ccp, {
        wallet,
        identity: 'a', // replace with your user identity
        discovery: { enabled: true, asLocalhost: true }
    });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('assetManagement');
    return contract;
}

app.post('/api/assets', async (req, res) => {
    try {
        const contract = await getContract();
        const { dId, msisdn, mpin, balance, status, tAmount, tType, remarks } = req.body;
        await contract.submitTransaction('createAsset', dId, msisdn, mpin, balance.toString(), status, tAmount.toString(), tType, remarks);
        res.status(200).send('Asset created successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/assets/:dId', async (req, res) => {
    try {
        const contract = await getContract();
        const dId = req.params.dId;
        const result = await contract.evaluateTransaction('queryAsset', dId);
        res.status(200).json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/assets/:dId/balance', async (req, res) => {
    try {
        const contract = await getContract();
        const dId = req.params.dId;
        const { nBalance } = req.body;
        await contract.submitTransaction('updateAssetValue', dId, nBalance.toString());
        res.status(200).send('Asset balance updated successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/assets/:dId/history', async (req, res) => {
    try {
        const contract = await getContract();
        const dId = req.params.dId;
        const result = await contract.evaluateTransaction('getTransactionHistory', dId);
        res.status(200).json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
