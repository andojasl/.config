import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

/**
 * Manages webview panels
 */
class WebPanel {
    public static currentPanel: WebPanel | undefined;

    private static readonly viewType = "angular";
    private readonly panel: vscode.WebviewPanel;
    private readonly extensionPath: string;
    private readonly builtAppFolder: string;
    private disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionPath: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (WebPanel.currentPanel) {
            WebPanel.currentPanel.panel.reveal(column);
            //WebPanel.currentPanel.update();
        } else {
            WebPanel.currentPanel = new WebPanel(
                extensionPath,
                column || vscode.ViewColumn.One
            );
            //WebPanel.currentPanel.update();
        }
        return WebPanel.currentPanel;
    }

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this.extensionPath = extensionPath;
        this.builtAppFolder = "dist";

        this.panel = vscode.window.createWebviewPanel(
            WebPanel.viewType,
            "dahu",
            column,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder)),
                ],
            }
        );

        this.panel.webview.html = this._getHtmlForWebview("side-bar");

        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

        this.panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.command) {
                    case "notification":
                        vscode.window.showInformationMessage(message.data.text);
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            },
            null,
            this.disposables
        );
    }

    public update(view: string) {
        this.panel.title = view === 'side-bar' ? 'side-bar' : 'create-theme';
        console.log("Webview title: " + this.panel.title + "\nActual view: " + view + "\n");
        const webviewHtml = this._getHtmlForWebview(view);
        this.panel.webview.html = webviewHtml;
    }

    public dispose() {
        WebPanel.currentPanel = undefined;

        this.panel.dispose();

        while (this.disposables.length) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview(view: string) {
        const appDistPath = path.join(this.extensionPath, "dist");
        const appDistPathUri = vscode.Uri.file(appDistPath);
        const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

        const indexPath = path.join(appDistPath, "index.html");

        let indexHtml = fs.readFileSync(indexPath, { encoding: "utf8" });

        indexHtml = indexHtml.replace(
            '<base href="/">',
            `<base href="${String(baseUri)}/">`
        );

        indexHtml = indexHtml.replace(
            '<app-root />',
            `<app-root data-view="${view}"></app-root>`
        );

        return indexHtml;
    }
}

function enableTheme() {
    const config = vscode.workspace.getConfiguration();
    const currentTheme = config.get<string>("workbench.colorTheme");
    config.update("workbench.colorTheme", "Dahu Theme", vscode.ConfigurationTarget.Global);
}

export function activate(context: vscode.ExtensionContext) {
    enableTheme();
    context.subscriptions.push(
        vscode.commands.registerCommand("dahu.start-webview", () => {
            WebPanel.createOrShow(context.extensionPath);
        }),
    );
}
