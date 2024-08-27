import { Component } from '@angular/core';

@Component({
  selector: 'app-webview1',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  navigateTo(view: string) {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

