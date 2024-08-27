import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-webview1',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  navigateTo(view: string) {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

