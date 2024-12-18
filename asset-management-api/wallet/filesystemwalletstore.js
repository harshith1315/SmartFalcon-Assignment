"use strict";
/*
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemWalletStore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const suffix = '.id';
function isIdentityFile(file) {
    return file.endsWith(suffix);
}
function toLabel(file) {
    const endIndex = file.length - suffix.length;
    return file.substring(0, endIndex);
}
class FileSystemWalletStore {
    static async newInstance(directory) {
        const mkdirOptions = {
            recursive: true
        };
        await fs.promises.mkdir(directory, mkdirOptions);
        return new FileSystemWalletStore(directory);
    }
    constructor(directory) {
        this.storePath = directory;
    }
    async remove(label) {
        const file = this.toPath(label);
        await fs.promises.unlink(file);
    }
    async get(label) {
        const file = this.toPath(label);
        try {
            return await fs.promises.readFile(file);
        }
        catch (error) {
            return undefined;
        }
    }
    async list() {
        return (await fs.promises.readdir(this.storePath))
            .filter(isIdentityFile)
            .map(toLabel);
    }
    async put(label, data) {
        const file = this.toPath(label);
        await fs.promises.writeFile(file, data);
    }
    toPath(label) {
        return path.join(this.storePath, label + suffix);
    }
}
exports.FileSystemWalletStore = FileSystemWalletStore;
//# sourceMappingURL=filesystemwalletstore.js.map