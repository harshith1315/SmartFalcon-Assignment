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
var express = require("express");
var fabric_network_1 = require("fabric-network");
var path = require("path");
var fs = require("fs");
var app = express();
var port = 3000;
app.use(express.json());
var ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
var ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
function getWallet() {
    return __awaiter(this, void 0, void 0, function () {
        var walletPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletPath = path.join(process.cwd(), 'wallet');
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getContract() {
    return __awaiter(this, void 0, void 0, function () {
        var gateway, wallet, network, contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gateway = new fabric_network_1.Gateway();
                    return [4 /*yield*/, getWallet()];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, gateway.connect(ccp, {
                            wallet: wallet,
                            identity: 'harshith', // replace with your user identity
                            discovery: { enabled: true, asLocalhost: true }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, gateway.getNetwork('mychannel')];
                case 3:
                    network = _a.sent();
                    contract = network.getContract('smartcontract');
                    return [2 /*return*/, contract];
            }
        });
    });
}
app.post('/api/assets', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, _a, dId, msisdn, mpin, balance, status_1, tAmount, tType, remarks, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getContract()];
            case 1:
                contract = _b.sent();
                _a = req.body, dId = _a.dId, msisdn = _a.msisdn, mpin = _a.mpin, balance = _a.balance, status_1 = _a.status, tAmount = _a.tAmount, tType = _a.tType, remarks = _a.remarks;
                return [4 /*yield*/, contract.submitTransaction('createAsset', dId, msisdn, mpin, balance.toString(), status_1, tAmount.toString(), tType, remarks)];
            case 2:
                _b.sent();
                res.status(200).send('Asset created successfully');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/assets/:dId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, dId, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getContract()];
            case 1:
                contract = _a.sent();
                dId = req.params.dId;
                return [4 /*yield*/, contract.evaluateTransaction('queryAsset', dId)];
            case 2:
                result = _a.sent();
                res.status(200).json(JSON.parse(result.toString()));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/api/assets/:dId/balance', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, dId, nBalance, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getContract()];
            case 1:
                contract = _a.sent();
                dId = req.params.dId;
                nBalance = req.body.nBalance;
                return [4 /*yield*/, contract.submitTransaction('updateAssetValue', dId, nBalance.toString())];
            case 2:
                _a.sent();
                res.status(200).send('Asset balance updated successfully');
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ error: error_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/assets/:dId/history', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, dId, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getContract()];
            case 1:
                contract = _a.sent();
                dId = req.params.dId;
                return [4 /*yield*/, contract.evaluateTransaction('getTransactionHistory', dId)];
            case 2:
                result = _a.sent();
                res.status(200).json(JSON.parse(result.toString()));
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
