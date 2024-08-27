import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    // Register the command that opens the webview
    const disposable = vscode.commands.registerCommand('extension.openWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'webview',
            'My Webview',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        // Set the HTML content for the webview
        const htmlPath = path.join(context.extensionPath, 'media', 'webview.html');
        panel.webview.html = fs.readFileSync(htmlPath, 'utf8');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
