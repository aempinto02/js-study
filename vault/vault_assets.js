var vaults = [
    {
        vault: 'a',
        transactions: [
            {
                balance: 1,
                asset: 'BTC'
            },
            {
                balance: 2,
                asset: 'BTC'
            },
            {
                balance: 3,
                asset: 'ETH'
            },
        ]
    },
    {
        vault: 'b',
        transactions: [
            {
                balance: 1,
                asset: 'BTC'
            },
            {
                balance: 2,
                asset: 'BTC'
            },
            {
                balance: 3,
                asset: 'ETH'
            },
        ]
    },
    {
        vault: 'c',
        transactions: [
            {
                balance: 1,
                asset: 'BTC'
            },
            {
                balance: 2,
                asset: 'BTC'
            },
        ]
    },
];
function assetsByVaults(vaults) {
    var assetsMap = new Map();
    vaults.forEach(function (vault) {
        assetsMap.set(vault.vault, differentAssetsByVault(vault));
    });
    return assetsMap;
}
function differentAssetsByVault(vault) {
    var assets = [];
    vault.transactions.forEach(function (transaction) {
        var asset = transaction.asset;
        if (!(assets.indexOf(asset) > -1)) {
            assets.push(asset);
        }
    });
    return assets;
}
console.log('Array de assets no objeto VAULT');
console.log(differentAssetsByVault(vaults[0]));
console.log('Map de assets por vault no objeto VAULTS');
console.log(assetsByVaults(vaults));
