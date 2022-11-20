import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {
  SortableButtonDirective,
  SortEvent,
  compare,
} from './utils/sort_directive';

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
  @ViewChild(SortableButtonDirective, { static: false }) toSort!: SortableButtonDirective;

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
      vault: 'zb',
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


  normalVaultsOrder: boolean = true
  reverseVaultsSort: boolean = false
  changes: number = 0
  order: string = 'vault'

  vaultsToSort: Vault[] = JSON.parse(JSON.stringify(this.vaults))

  constructor() {
  }

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

  changeOrder(value: string): void {
    if (this.order === value) {
      this.reverseVaultsSort = !this.reverseVaultsSort;
    }

    this.order = value;
  }

  sortVaults(vaults: Vault[]): Vault[] {
    let result: Vault[] = []
    let clone: Vault[] = JSON.parse(JSON.stringify(vaults))
    if (!this.reverseVaultsSort) {
      result = clone.sort((a, b) => {
        return a.vault >= b.vault ? 1 : -1
      })
      return result
    }
    result = clone.sort((a, b) => {
      return a.vault < b.vault ? 1 : -1
    })

    return result
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

  direction = 'asc'
  column = 'vault'
  type = 'string'

  setSortParams(param: any) {
    this.direction = param.dir;
    this.column = param.col;
    this.type = param.typ;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    // this.toSort.forEach((item) => {
    //   if (item.sortable !== column) {
    //     item.direction = '';
    //   }
    // });

    // sorting countries
    // if (direction === '' || column === '') {
    //   this.vaultsToSort = this.vaults;
    // } else {
    //   this.vaultsToSort = [...this.vaults].sort((a, b) => {
    //     const res = compare(a['vault'], b['vault']);
    //     return direction === 'asc' ? res : -res;
    //   });
    // }
    // sorting vaults
    if (!(direction === '') && !(column === '')) {
      this.vaultsToSort = [...this.vaults].sort((a, b) => {
        const res = compare(a['vault'], b['vault']);
        return direction === 'asc' ? res : -res;
      });
    }
  }

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
