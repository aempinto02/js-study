import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

export interface Vault {
  vault: string;
  transactions: Transaction[];
}

export interface Transaction {
  balance: number;
  asset: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngFor_filter';

  vaults: Vault[] = [
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
      vault: 'ab',
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
      vault: 'bb',
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

  displayedColumns: string[] = ['vault', 'balance', 'status'];
  dataSource = new MatTableDataSource(this.vaults);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchText = '';
  characters = ['a', 'b', 'c']

  status = ['em processamento', 'cancelado', 'concluído']

  getBackgroundColor(state: string): string {
    if (state === 'em processamento') {
      return 'yellow'
    } else if (state === 'cancelado') {
      return 'red';
    } else if (state === 'concluído') {
      return 'green';
    }
    return 'black';
  }


  vaultsNames(vaults: Vault[]): string[] {
    let vaultsNames: string[] = []
    vaults.forEach(vault => {
      vaultsNames.push(vault.vault)
    })

    return vaultsNames
  }

  private isAscendingSort: boolean = false;

  compare(item1: any, item2: any): number {
    let compValue = 0;
      compValue = item1.vault.localeCompare(item2.vault, 'en', {
        sensitivity: 'base'
      });
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  sortVaults() {
    this.isAscendingSort = !this.isAscendingSort; // you missed this

    this.vaults.sort((item1: Vault, item2: Vault) => this.compare(item1.vault, item2.vault));
  }

  // sort(key: string): Vault[] {
  //     return this.vaults.sort((a: Vault, b: Vault) => a[key] > b[key] ? 1 : a[key] === b[key] ? 0 : -1);
  // }

  // sortByKey(array: any[], key: string): Vault[] {
  //   return array.sort(function (a, b) {
  //     var x = a[key]; var y = b[key]
  //     return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  //   })
  // }

  filterVaultByName(filter: string): Vault[] {

    return this.vaults.filter(vault => vault.vault.includes(filter))

    let result: Vault[] = []
    this.vaults.forEach(vault => {
      if (vault.vault.includes(filter)) {
        result.push(vault)
      }
    })

    return result
  }
}
