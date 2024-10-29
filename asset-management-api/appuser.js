"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fabric_network_1 = require("fabric-network");
var path = require("path");
function createWalletIdentity() {
    return __awaiter(this, void 0, void 0, function () {
        var userName, walletPath, wallet, userIdentity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userName = 'harshith';
                    walletPath = path.join(process.cwd(), 'wallet');
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
                case 1:
                    wallet = _a.sent();
                    userIdentity = {
                        credentials: {
                            certificate: "-----BEGIN CERTIFICATE-----\nMIICpDCCAkugAwIBAgIUBKWURTRcsL3Eiu0+0USUv65yvY4wCgYIKoZIzj0EAwIw\nYjELMAkGA1UEBhMCVVMxETAPBgNVBAgTCE5ldyBZb3JrMREwDwYDVQQHEwhOZXcg\nWW9yazEUMBIGA1UEChMLZXhhbXBsZS5jb20xFzAVBgNVBAMTDmNhLmV4YW1wbGUu\nY29tMB4XDTI0MTAyOTE3MjAwMFoXDTI1MTAyOTE3MjYwMFowYzELMAkGA1UEBhMC\nVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQKEwtIeXBlcmxlZGdl\ncjEOMAwGA1UECxMFYWRtaW4xFTATBgNVBAMTDG9yZGVyZXJBZG1pbjBZMBMGByqG\nSM49AgEGCCqGSM49AwEHA0IABKniKCH7aCwtHBlDQ8FeRSwYeBp90FWBrsBIM4E8\niuLjr7CuSUB3qubRCxTEBX9TEufcnBVCUyEi8YdCAYdPbHKjgd0wgdowDgYDVR0P\nAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFM2sCN/Q/sGkSto/EVTc\ne7sXa8jOMB8GA1UdIwQYMBaAFBPFTYdN8rW7BUyVuvGpztVRC8nPMBoGA1UdEQQT\nMBGCD0RFU0tUT1AtU0IwNTZEODBeBggqAwQFBgcIAQRSeyJhdHRycyI6eyJoZi5B\nZmZpbGlhdGlvbiI6IiIsImhmLkVucm9sbG1lbnRJRCI6Im9yZGVyZXJBZG1pbiIs\nImhmLlR5cGUiOiJhZG1pbiJ9fTAKBggqhkjOPQQDAgNHADBEAiBej0b06MGXjXwD\nxdbnCNHfvBRh1Jf/U2vrnaDBSUdnEQIgC8MrMqJq/bvtMJS3WlZ5W1CHcvtVnT4v\nyidspPUn8zo=\n-----END CERTIFICATE-----", // Use template literal for multiline
                            privateKey: "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgp+P88ZyYVzHScik+\n+urBYkyahALSYXj+GJWhq5D2pzahRANCAASp4igh+2gsLRwZQ0PBXkUsGHgafdBV\nga7ASDOBPIri46+wrklAd6rm0QsUxAV/UxLn3JwVQlMhIvGHQgGHT2xy\n-----END PRIVATE KEY-----", // Use template literal for multiline
                        },
                        mspId: 'Org1MSP', // Update with your organization MSP ID
                        type: 'X.509',
                    };
                    return [4 /*yield*/, wallet.put(userName, userIdentity)];
                case 2:
                    _a.sent(); // Use userName from above
                    console.log("Identity \"".concat(userName, "\" added to the wallet"));
                    return [2 /*return*/];
            }
        });
    });
}
createWalletIdentity().catch(console.error);
