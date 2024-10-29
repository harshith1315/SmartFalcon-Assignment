import { Context, Contract } from 'fabric-contract-api';

export class AssetManagementContract extends Contract {
    
    async createAsset(ctx: Context, dealerId: string, msisdn: string, mpin: string, balance: number, status: string, transAmount: number, transType: string, remarks: string): Promise<void> {
        const asset = {
            dealerId,
            msisdn,
            mpin,
            balance,
            status,
            transAmount,
            transType,
            remarks,
        };
        await ctx.stub.putState(dealerId, Buffer.from(JSON.stringify(asset)));
    }

    async updateAssetValue(ctx: Context, dealerId: string, newBalance: number): Promise<void> {
        const assetAsBytes = await ctx.stub.getState(dealerId);
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset ${dealerId} does not exist`);
        }
        const asset = JSON.parse(assetAsBytes.toString());
        asset.balance = newBalance;
        await ctx.stub.putState(dealerId, Buffer.from(JSON.stringify(asset)));
    }

    async queryAsset(ctx: Context, dealerId: string): Promise<string> {
        const assetAsBytes = await ctx.stub.getState(dealerId);
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset ${dealerId} does not exist`);
        }
        return assetAsBytes.toString();
    }

    async getTransactionHistory(ctx: Context, dealerId: string): Promise<string[]> {
        const resultIterator = await ctx.stub.getHistoryForKey(dealerId);
        const results: string[] = [];
        let res = await resultIterator.next();
        while (!res.done) {
            results.push(res.value.value.toString('utf8'));
            res = await resultIterator.next();
        }
        return results;
    }
}
