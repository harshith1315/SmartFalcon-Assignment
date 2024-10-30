import { Wallets } from 'fabric-network';
import * as path from 'path';

async function createWalletIdentity() {
    const userName = 'harshith';
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const userIdentity = {
        credentials: {
            certificate: `-----BEGIN CERTIFICATE-----
MIICpDCCAkugAwIBAgIUBKWURTRcsL3Eiu0+0USUv65yvY4wCgYIKoZIzj0EAwIw
YjELMAkGA1UEBhMCVVMxETAPBgNVBAgTCE5ldyBZb3JrMREwDwYDVQQHEwhOZXcg
WW9yazEUMBIGA1UEChMLZXhhbXBsZS5jb20xFzAVBgNVBAMTDmNhLmV4YW1wbGUu
Y29tMB4XDTI0MTAyOTE3MjAwMFoXDTI1MTAyOTE3MjYwMFowYzELMAkGA1UEBhMC
VVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQKEwtIeXBlcmxlZGdl
cjEOMAwGA1UECxMFYWRtaW4xFTATBgNVBAMTDG9yZGVyZXJBZG1pbjBZMBMGByqG
SM49AgEGCCqGSM49AwEHA0IABKniKCH7aCwtHBlDQ8FeRSwYeBp90FWBrsBIM4E8
iuLjr7CuSUB3qubRCxTEBX9TEufcnBVCUyEi8YdCAYdPbHKjgd0wgdowDgYDVR0P
AQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFM2sCN/Q/sGkSto/EVTc
e7sXa8jOMB8GA1UdIwQYMBaAFBPFTYdN8rW7BUyVuvGpztVRC8nPMBoGA1UdEQQT
MBGCD0RFU0tUT1AtU0IwNTZEODBeBggqAwQFBgcIAQRSeyJhdHRycyI6eyJoZi5B
ZmZpbGlhdGlvbiI6IiIsImhmLkVucm9sbG1lbnRJRCI6Im9yZGVyZXJBZG1pbiIs
ImhmLlR5cGUiOiJhZG1pbiJ9fTAKBggqhkjOPQQDAgNHADBEAiBej0b06MGXjXwD
xdbnCNHfvBRh1Jf/U2vrnaDBSUdnEQIgC8MrMqJq/bvtMJS3WlZ5W1CHcvtVnT4v
yidspPUn8zo=
-----END CERTIFICATE-----`,
            privateKey: `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgp+P88ZyYVzHScik+
+urBYkyahALSYXj+GJWhq5D2pzahRANCAASp4igh+2gsLRwZQ0PBXkUsGHgafdBV
ga7ASDOBPIri46+wrklAd6rm0QsUxAV/UxLn3JwVQlMhIvGHQgGHT2xy
-----END PRIVATE KEY-----`,
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };

    await wallet.put(userName, userIdentity);
    console.log(`Identity "${userName}" added to the wallet`);
}

createWalletIdentity().catch(console.error);
