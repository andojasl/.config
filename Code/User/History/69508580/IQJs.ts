// extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('demo-routing.openWebview', () => {
            const panel = vscode.window.createWebviewPanel(
                'webview',
                'My Webview',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );

            const htmlPath = path.join(context.extensionPath, 'media', 'webview.html');
            panel.webview.html = fs.readFileSync(htmlPath, 'utf8');
        })
    );
}
