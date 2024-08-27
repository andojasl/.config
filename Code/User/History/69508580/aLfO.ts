import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openWebview1', () => {
      WebviewPanel.createOrShow(context.extensionPath, 'webview1');
    }),
    vscode.commands.registerCommand('extension.openWebview2', () => {
      WebviewPanel.createOrShow(context.extensionPath, 'webview2');
    })
  );
}

class WebviewPanel {
  public static currentPanel: WebviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;

  public static createOrShow(extensionPath: string, view: string) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (WebviewPanel.currentPanel) {
      WebviewPanel.currentPanel._panel.reveal(column);
      WebviewPanel.currentPanel.update(view);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'webviewNavigation',
      'Webview Navigation',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'webview-navigation/dist/webview-navigation'))]
      }
    );

    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionPath, view);
  }

  private constructor(panel: vscode.WebviewPanel, extensionPath: string, view: string) {
    this._panel = panel;
    this._extensionPath = extensionPath;

    this.update(view);

    this._panel.onDidDispose(() => this.dispose(), null, []);

    this._panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'navigate':
            WebviewPanel.createOrShow(this._extensionPath, message.view);
            return;
        }
      },
      null,
      []
    );
  }

  public dispose() {
    WebviewPanel.currentPanel = undefined;
  }

  public update(view: string) {
    this._panel.title = view === 'webview1' ? 'Webview 1' : 'Webview 2';
    const webviewHtml = this.getWebviewContent(view);
    this._panel.webview.html = webviewHtml;
  }

  private getWebviewContent(view: string): string {
    const appDistPath = path.join(this._extensionPath, 'webview-navigation', 'dist', 'webview-navigation');
    const appIndexPath = path.join(appDistPath, 'index.html');
    let html = fs.readFileSync(appIndexPath, 'utf8');

    html = html.replace(/<base href="\/">/, <base href="${vscode.Uri.file(appDistPath).with({ scheme: 'vscode-resource' })}/">);
    html = html.replace('</head>', `
      <script>
        window.initialView = '${view}';
        window.acquireVsCodeApi = acquireVsCodeApi;
      </script>
      </head>
    `);
    return html;
  }
}