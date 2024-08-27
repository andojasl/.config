import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  navigateTo(view: string) {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

