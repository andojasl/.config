import { Component } from '@angular/core';

@Component({
  selector: 'app-webview1',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class Webview1Component {
  navigateTo(view: string) {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

