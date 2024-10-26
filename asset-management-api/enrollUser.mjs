import { Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import FabricCAServices from 'fabric-ca-client';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function enrollUser() {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const userExists = await wallet.get('a');
    if (userExists) {
        console.log('An identity for the user "a" already exists in the wallet');
        return;
    }

    const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
    const ca = new FabricCAServices(caURL);

    try {
        const enrollment = await ca.enroll({ enrollmentID: 'a', enrollmentSecret: 'us' });

        const identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toString(),
            },
            mspId: 'O1MSP',
            type: 'X.509',
        };

        await wallet.put('a', identity);
        console.log('Successfully enrolled user "a" and imported it into the wallet');
    } catch (e) {
        console.error('Failed to enroll user "a":', e);
    }
}

enrollUser().catch(console.error);
