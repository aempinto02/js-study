type Transaction = {
    balance: number;
    asset: string;
}
type Vault = {
    vault: string;
    transactions: Transaction[];
}

const vaults: Vault[] = [
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
        ],
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
        ],
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
]

function vaultsNames(vaults: Vault[]): string[] {
    let vaultsNames: string[] = []
    vaults.forEach(vault => {
        vaultsNames.push(vault.vault)
    })

    return vaultsNames
}

function assetsByVaults(vaults: Vault[]): Map<string, string[]> {
    let assetsMap = new Map<string, string[]>()
    vaults.forEach(vault => {
        assetsMap.set(vault.vault, differentAssetsByVault(vault))
    })

    return assetsMap
}

function differentAssetsByVault(vault: Vault): string[] {
    let assets: string[] = []
    vault.transactions.forEach(transaction => {
        const asset = transaction.asset
        if (!(assets.indexOf(asset) > -1)) {
            assets.push(asset)
        }
    })

    return assets
}

console.log('Array de assets no objeto VAULT')
console.log(differentAssetsByVault(vaults[0]))
console.log('Map de assets por vault no objeto VAULTS')
console.log(assetsByVaults(vaults))