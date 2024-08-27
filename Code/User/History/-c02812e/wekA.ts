import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

/**
 * Manages webview panels
 */
class WebPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: WebPanel | undefined;

    private static readonly viewType = "angular";

    private readonly panel: vscode.WebviewPanel;
    private readonly extensionPath: string;
    private readonly builtAppFolder: string;
    private disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionPath: string, view: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        // Otherwise, create angular panel.
        if (WebPanel.currentPanel) {
            WebPanel.currentPanel.panel.reveal(column);
            WebPanel.currentPanel.update(view); // Use update method to set the view correctly
        } else {
            WebPanel.currentPanel = new WebPanel(
                extensionPath,
                column || vscode.ViewColumn.One
            );
            WebPanel.currentPanel.update(view); // Set initial view
        }
        return WebPanel.currentPanel;
    }

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this.extensionPath = extensionPath;
        this.builtAppFolder = "dist";

        // Create and show a new webview panel
        this.panel = vscode.window.createWebviewPanel(
            WebPanel.viewType,
            "dahu",
            column,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder)),
                ],
            }
        );

        // Set the webview's initial html content
        this.panel.webview.html = this._getHtmlForWebview("side-bar");

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

        // Handle messages from the webview
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

        // Clean up our resources
        this.panel.dispose();

        while (this.disposables.length) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    /**
     * Returns html of the start page (index.html)
     */
    private _getHtmlForWebview(view: string) {
        // Path to dist folder
        const appDistPath = path.join(this.extensionPath, "dist");
        const appDistPathUri = vscode.Uri.file(appDistPath);

        // Path as URI
        const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

        // Determine the index path based on the view
        let indexPath;
        console.log("view: " + view);

        switch(view) {
            case 'side-bar': {
                console.log("It's sidebar\n");
                indexPath = path.join(this.extensionPath, "src/app/side-bar/side-bar.component.html");
                console.log("Path: " + indexPath);
                break; // Add break to prevent fall-through
            }
            case 'create-theme': {
                console.log("It's create theme\n");
                indexPath = path.join(this.extensionPath, "src/app/create-theme/create-theme.component.html");
                console.log("Path: " + indexPath);
                break; // Add break to prevent fall-through
            }
            default: {
                console.log("It's default");
                indexPath = path.join(appDistPath, "index.html");
                console.log("Path: " + indexPath);
                break; // Add break to prevent fall-through
            }
        }

        // Read the index file from the file system
        let indexHtml = fs.readFileSync(indexPath, { encoding: "utf8" });

        // Update the base URI tag
        indexHtml = indexHtml.replace(
            '<base href="/">',
            `<base href="${String(baseUri)}/">`
        );

        return indexHtml;
    }
}

function enableTheme() {
    const config = vscode.workspace.getConfiguration();
    const currentTheme = config.get<string>("workbench.colorTheme");
    config.update("workbench.colorTheme", "Dahu Theme", vscode.ConfigurationTarget.Global);
}

/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
    enableTheme();
    context.subscriptions.push(
        vscode.commands.registerCommand("dahu.start-webview", () => {
            WebPanel.createOrShow(context.extensionPath, "side-bar");
        }),
        vscode.commands.registerCommand("dahu.create-theme", () => {
            WebPanel.createOrShow(context.extensionPath, "create-theme");
        })
    );
}
