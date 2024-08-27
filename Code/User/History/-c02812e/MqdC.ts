import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { savePreset, getPresets, getPreset, updatePreset } from "./dbConnector";
import { Preset } from "./dataObjects";
import { generatePalette, getColorPalleteFromImage } from "./colorGenerator";
import { applyPreset } from "./backgroundHighlighting";

let globalExtensionPath: string;
let currentDahuTheme: Preset;

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

        this.panel = vscode.window.createWebviewPanel(
            WebPanel.viewType,
            "My Angular Webview",
            column,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder)),
                ],
            }
        );

        this.panel.webview.html = this._getHtmlForWebview();

        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

        this.panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'getPresets':
                        const presets = await getPresets(extensionPath);
                        this.panel.webview.postMessage({ command: 'presets', data: presets });
                        break;
                    case 'updatePreset':
                        try {
                            await updatePreset(message.data, extensionPath);
                            await applyPreset(message.data);
                            vscode.window.showInformationMessage('Preset updated successfully');
                        } catch (error) {
                            vscode.window.showErrorMessage('Error updating preset: ' + (error as Error).message);
                        }
                        this.panel.webview.postMessage({ command: 'applyPreset', data: message.data });
                        break;
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
                            .then(preset => {
                                console.log('received preset from db: (extension.ts): ', preset);
                                updatePreset(message.data, extensionPath);
                                applyPreset(preset);
                                currentDahuTheme = preset;
                                this.panel.webview.postMessage({ command: 'currentTheme', data: currentDahuTheme });
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

        this.panel.dispose();

        while (this.disposables.length) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview() {
        const appDistPath = path.join(this.extensionPath, "dist");
        const appDistPathUri = vscode.Uri.file(appDistPath);

        const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

        const indexPath = path.join(appDistPath, "index.html");

        let indexHtml = fs.readFileSync(indexPath, { encoding: "utf8" });

        indexHtml = indexHtml.replace(
            '<base href="/">',
            `'<base href="${String(baseUri)}/">`
        );

        return indexHtml;
    }
}

function enableTheme() {
    const config = vscode.workspace.getConfiguration();
    config.update("workbench.colorTheme", "Dahu Theme", vscode.ConfigurationTarget.Global);
}

async function fetchCurrentSyntaxColors() {
    const config = vscode.workspace.getConfiguration();

    const colorCustomizations = config.get<any>('workbench.colorCustomizations');
    const tokenColorCustomizations = config.get<any>('editor.tokenColorCustomizations');

    const syntaxColors = {
        colors: colorCustomizations,
        tokenColors: tokenColorCustomizations
    };

    return syntaxColors;
}

async function updateThemeFile(extensionPath: string, themeData: any) {
    const themePath = path.join(extensionPath, 'themes', 'extensionTheme.json');
    try {
        fs.writeFileSync(themePath, JSON.stringify(themeData, null, 2), 'utf-8');
        console.log('Theme file updated successfully.');
    } catch (error) {
        console.log('Error updating theme file: ' + (error as Error).message);
    }
}

export async function activate(context: vscode.ExtensionContext) {
    globalExtensionPath = context.extensionPath;

    enableTheme();

    const syntaxColors = await fetchCurrentSyntaxColors();
    await updateThemeFile(globalExtensionPath, syntaxColors);

    const themePath = path.join(globalExtensionPath, 'themes', 'extensionTheme.json');
    try {
        const themeData = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
        currentDahuTheme = {
            id: 0,
            name: 'initial-theme',
            editorColor: themeData.colors['editor.background'],
            sidebarColor: themeData.colors['sideBar.background'],
            panelColor: themeData.colors['panel.background'],
            statusBarColor: themeData.colors['statusBar.background'],
            tabsColor: themeData.colors['editorGroupHeader.tabsBackground'],
            tokenColors: themeData.tokenColors
        };
    } catch (error) {
        console.log('error while creating current theme object: ' + (error as Error).message);
    }

    context.subscriptions.push(
        vscode.commands.registerCommand("dahu.start-webview", () => {
            WebPanel.createOrShow(context.extensionPath);
        }),

        vscode.commands.registerCommand("dahu.savePreset", async () => {
            const presetName = await vscode.window.showInputBox({ prompt: 'enter your preset name' });
            if (presetName) {
                try {
                    await savePreset(presetName, context.extensionPath);
                    console.log('preset saved successfully');
                } catch (error) {
                    console.error('error saving preset: ' + (error as Error).message);
                }
            } else {
                console.log('the name was null...');
            }
        }),

        vscode.commands.registerCommand("dahu.showPresets", async () => {
            let presets: Preset[];
            try {
                presets = await getPresets(context.extensionPath);
                console.log('presets:');
                presets.forEach(p => console.log(p));
            } catch (error) {
                console.error('error while getting presets: ' + (error as Error).message);
            }
        }),

        vscode.commands.registerCommand("dahu.generatePalette", async () => {
            const hextString = await vscode.window.showInputBox({ prompt: 'enter hex string' });
            let palette: string[] = [];
            if (hextString) {
                try {
                    palette = await generatePalette(hextString);
                    console.log('generated palette: ');
                    palette.forEach(color => console.log(color));
                } catch (error) {
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
            if (fileUri && fileUri[0]) {
                try {
                    palette = await getColorPalleteFromImage(fileUri[0]);
                    console.log('success, color palette generated from image:');
                    palette.forEach(color => console.log(color));
                } catch (error) {
                    console.log('ERROR OCCURED while generating color palette from image: ' + (error as Error).message);
                }
            }
        })
    );
}

export { globalExtensionPath };
