"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.first = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very stormalf-term time the command is executed
function first() {
    console.log("my fist extension was called!");
    vscode.window.showInformationMessage("my stormalf-term extension was called!");
}
exports.first = first;
//# sourceMappingURL=myfirst.js.map