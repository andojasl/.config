import * as vscode from 'vscode';

function getVSCodeColors() {
    const theme = vscode.window.activeColorTheme;
    const colorCustomizations = vscode.workspace.getConfiguration('workbench.colorCustomizations');
  
    const getColor = (color: string, fallback: string) => {
      return colorCustomizations[theme.kind]?.[color] || fallback;
    };
  
    return {
      backgroundColor: getColor('editor.background', '#ffffff'),
      foregroundColor: getColor('editor.foreground', '#000000'),
      // Add more colors as needed
    };
  }