import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngFor_filter';

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
}
