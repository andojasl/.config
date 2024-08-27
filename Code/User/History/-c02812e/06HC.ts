import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { savePreset, getPresets, getPreset} from "./dbConnector";
import { Preset } from "./dataObjects";
import { generatePalette, getColorPalleteFromImage } from "./colorGenerator";
import { applyPreset } from "./backgroundHighlighting";

let globalExtensionPath: string;
let currentDahuTheme: Preset;


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

	public static createOrShow(extensionPath: string) {
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

		WebPanel.currentPanel.panel.webview.postMessage({
			command: "update-title",
			payload: {
				title: `Hello from ${extensionPath} - ${Date().toString()}`,
			},
		});
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn) {
		this.extensionPath = extensionPath;
		this.builtAppFolder = "dist";

		// Create and show a new webview panel
		this.panel = vscode.window.createWebviewPanel(
			WebPanel.viewType,
			"My Angular Webview",
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
		this.panel.webview.html = this._getHtmlForWebview();

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
		
		this.panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'getPresets':
                        const presets = await getPresets(extensionPath);
                        this.panel.webview.postMessage({ command: 'presets', data: presets });
                        break;
					case 'getWorkbenchColors':
						const colors = await getWorkbenchColors();
						this.panel.webview.postMessage({command: 'workbenchColors', data: colors});
					case 'updateWorkbenchColors':
						await 
                    case 'savePreset':
                        try {
                            await savePreset(message.data.name, extensionPath);
                            vscode.window.showInformationMessage('Preset saved successfully');
                        } catch (error) {
                            vscode.window.showErrorMessage('Error saving preset: ' + (error as Error).message);
                        }
                        break;
					case 'applyPreset':
						console.log('apply preset called');
						await getPreset(message.data.theme, extensionPath)
							.then(preset=> {
								console.log('received preset from db: (extension.ts): ', preset);
								applyPreset(preset);
								currentDahuTheme = preset;
								vscode.window.showInformationMessage('preset applied: ' + preset.name);
							})
							.catch(error => {
								console.log('error while applyin preset: ' + (error as Error).message);
							});
						break;
					case 'getCurrentTheme':
						this.panel.webview.postMessage({ command: 'currentTheme', data: currentDahuTheme });
                }
            },
            null,
            this.disposables
        );
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
	private _getHtmlForWebview() {
		// path to dist folder
		const appDistPath = path.join(this.extensionPath, "dist");
		const appDistPathUri = vscode.Uri.file(appDistPath);

		// path as uri
		const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

		// get path to index.html file from dist folder
		const indexPath = path.join(appDistPath, "index.html");

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
	config.update("workbench.colorTheme", "Dahu Theme", vscode.ConfigurationTarget.Global);
}
const getWorkbenchColors = () => {
    const workbenchConfig = vscode.workspace.getConfiguration('workbench');
    const colorCustomizations = workbenchConfig.get<any>('colorCustomizations', {});

    const editorBackground = colorCustomizations['editor.background'] || '#0000ff';
    const sideBarBackground = colorCustomizations['sideBar.background'] || '#000000';
    const panelBackground = colorCustomizations['panel.background'] || '#000000';
    const statusBarBackground = colorCustomizations['statusBar.background'] || '#ffffff';
    const tabsBackground = colorCustomizations['editorGroupHeader.tabsBackground'] || '#000000';

    return {
        editorBackground,
        sideBarBackground,
        panelBackground,
        statusBarBackground,
        tabsBackground
    };
};

// Function to get token colors
const getTokenColors = async () => {
    const tokenColors: any[] = [];
    const editorConfig = vscode.workspace.getConfiguration('editor.tokenColorCustomizations');
    const tokenColorCustomizations = editorConfig.inspect<any>('textMateRules')?.globalValue || [];

    for (const rule of tokenColorCustomizations) {
        tokenColors.push(rule);
    }

    return tokenColors;
};

// Function to update the current Dahu theme
const updateCurrentDahuTheme = async () => {
    const colors = getWorkbenchColors();
    const tokenColors = await getTokenColors();

    const themePath = path.join(globalExtensionPath, 'themes', 'extensionTheme.json');
    try {
        const themeData = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
        currentDahuTheme = {
            id: 0,
            name: 'current-theme',
            editorColor: colors.editorBackground,
            sidebarColor: colors.sideBarBackground,
            panelColor: colors.panelBackground,
            statusBarColor: colors.statusBarBackground,
            tabsColor: colors.tabsBackground,
            tokenColors: tokenColors.length > 0 ? tokenColors : themeData.tokenColors // Keep original if no customizations
        };

        const updatedTheme = {
            ...themeData,
            colors: {
                "editor.background": colors.editorBackground,
                "sideBar.background": colors.sideBarBackground,
                "panel.background": colors.panelBackground,
                "statusBar.background": colors.statusBarBackground,
                "editorGroupHeader.tabsBackground": colors.tabsBackground
            },
            tokenColors: currentDahuTheme.tokenColors
        };

        fs.writeFileSync(themePath, JSON.stringify(updatedTheme, null, 2));
        vscode.window.showInformationMessage('Theme updated with current colors and token colors.');
    } catch (error) {
        console.log('Error while updating theme file: ' + (error as Error).message);
    }
};

// Function to update workbench colors with a preset
const updateWorkbenchColors = (preset: Preset) => {
    const themePath = path.join(globalExtensionPath, 'themes', 'extensionTheme.json');
    try {
        const themeData = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
        const updatedTheme = {
            ...themeData,
            name: preset.name,
            colors: {
                "editor.background": preset.editorColor,
                "sideBar.background": preset.sidebarColor,
                "panel.background": preset.panelColor,
                "statusBar.background": preset.statusBarColor,
                "editorGroupHeader.tabsBackground": preset.tabsColor
            },
            tokenColors: JSON.parse(preset.tokenColors)
        };

        fs.writeFileSync(themePath, JSON.stringify(updatedTheme, null, 2));
        vscode.window.showInformationMessage(`Theme updated with preset: ${preset.name}`);
    } catch (error) {
        console.log('Error while updating theme file with preset: ' + (error as Error).message);
    }
};

/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
	globalExtensionPath = context.extensionPath;

    // Update the current Dahu theme when the extension is activated
    updateCurrentDahuTheme();

    // Listen to configuration changes and update colors
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('workbench.colorCustomizations') ||
            event.affectsConfiguration('editor.tokenColorCustomizations')) {
            updateCurrentDahuTheme();
        }
    });


	console.log("CURRENT COLORS: ", currentDahuTheme, "\n");
	context.subscriptions.push(
		vscode.commands.registerCommand("dahu.start-webview", () => {
			WebPanel.createOrShow(context.extensionPath);
		}),
		// vscode.commands.registerCommand("dahu.getWorkbenchColors", async () => {

		// }),
		vscode.commands.registerCommand("dahu.savePreset", async () => {
			const presetName = await vscode.window.showInputBox({prompt: 'enter ur preset name'});
			if(presetName) {
				try {
					await savePreset(presetName, context.extensionPath);
					console.log('preset saved successfully');
				} catch(error) {
					console.error('error saving preset: ' + (error as Error).message);
				} finally {
					console.log('finally block executed');
				}
			} else {
				console.log('the name was null...');
			}
		}),

		// TODO: remove the following 3 commands, these are just for debugging purposes
		
		vscode.commands.registerCommand("dahu.showPresets", async () => {
			let presets: Preset[];
			let names: string[] = [];
			try {
				presets = await getPresets(context.extensionPath);
				console.log('presets:');
				presets.forEach(p => console.log(p));
			} catch(error) {
				console.error('error while getting presets: ' + (error as Error).message);
			}
			const selected = await vscode.window.showQuickPick(names, {placeHolder: 'select a preset'});
			if(selected) {
				vscode.window.showInformationMessage('preset selected: ' + selected);
			}
		}),
		vscode.commands.registerCommand("dahu.generatePalette", async () => {
			const hextString = await vscode.window.showInputBox({prompt: 'enter hex string'});
			let palette: string[] = [];
			if(hextString) {
				try {
					palette = await generatePalette(hextString);
					console.log('generated palette: ');
					palette.forEach(color => console.log(color));
				} catch(error) {
					console.log('ERROR OCCURED: ' + (error as Error).message);
				}
			}
		}),
		vscode.commands.registerCommand("dahu.generateFromImage", async () => {
			const opts: vscode.OpenDialogOptions = {
				canSelectMany: false,
				openLabel: 'select an image',
				filters: {
					'Images': ['png', 'jpg', 'jpeg']
				}
			};
			
			const fileUri = await vscode.window.showOpenDialog(opts);
			let palette: string[] = [];
			if(fileUri && fileUri[0]) {
				try {
					palette = await getColorPalleteFromImage(fileUri[0]);
					console.log('success, color palette generated from image:');
					palette.forEach(color => console.log(color));
				} catch(error) {
					console.log('ERROR OCCURED while generating color palette from image: ' + (error as Error).message);
				}
			}
		})
	);
}

export {globalExtensionPath};
