// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very stormalf-term time the command is executed
export function first() {
  console.log("my fist extension was called!");
  vscode.window.showInformationMessage(
    "my stormalf-term extension was called!"
  );
}
