import { Component } from '@angular/core';

@Component({
  selector: 'app-webview1',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Webview1Component {
  navigateTo(view: string) {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

