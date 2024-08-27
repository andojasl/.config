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

	public static createOrShow(extensionPath: string, view:string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		// Otherwise, create angular panel.
		if (WebPanel.currentPanel) {
			WebPanel.currentPanel.panel.reveal(column);
			WebPanel.updateTitle(extensionPath);
		} else {
			WebPanel.currentPanel = new WebPanel(
				extensionPath,
				column || vscode.ViewColumn.One
			);
		}
		return WebPanel.currentPanel;
	}

	public static updateTitle(extensionPath: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		// Otherwise, create angular panel.
		if (WebPanel.currentPanel) {
			WebPanel.currentPanel.panel.reveal(column);
		} else {
			WebPanel.currentPanel = new WebPanel(
				extensionPath,
				column || vscode.ViewColumn.One
			);
		}
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
		this.panel.webview.html = this._getHtmlForWebview("");

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
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
		console.log("Webview title: " + this.panel.title + "\nActual view: " + view+ "\n");
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
		// path to dist folder
		const appDistPath = path.join(this.extensionPath, "dist");
		const appDistPathUri = vscode.Uri.file(appDistPath);
	
		// path as uri
		const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);
	
		// get path to index.html file from dist folder
		let indexPath;
		//console.log("Index path first: " + indexPath+", title: " + this.panel.title);
	
		switch(view){
			case 'side-bar':{
				console.log("Its sidebar\n");
				indexPath = path.join(appDistPath, "side-bar.component.html");
			}
			case 'create-theme':{
				console.log("Its create theme\n");
				indexPath = path.join(appDistPath, "create-theme.component.html");
			}
			default:{
				console.log("its default");
				indexPath = path.join(appDistPath, "index.html");
			}
		}

		// Check view and adjust path or content
		// if (this.panel.title === 'side-bar') {
		// 		console.log("Its sidebar\n");
		// 	indexPath = path.join(appDistPath, "side-bar.component.html");
		// } else if (this.panel.title === 'create-theme') {
		// 			// 		console.log("Its create theme\n");

		// 	indexPath = path.join(appDistPath, "create-theme.component.html");
		// }
		console.log("Index path: " + indexPath);
	
		// read index file from file system
		let indexHtml = fs.readFileSync(indexPath, { encoding: "utf8" });
	
		// update the base URI tag
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
	// if (currentTheme !== "Dahu Theme") {
	// 	config.update("workbench.colorTheme", 'Dahu Theme', vscode.ConfigurationTarget.Global);
	// 	console.log("Dahu theme was enabled for the first time");
	// } else {
	// 	console.log("Dahu theme is already enabled");
	// }
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
