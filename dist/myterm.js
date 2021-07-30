"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myterm = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
function myterm(context) {
    let NEXT_TERM_ID = 1;
    console.log("Terminals: " + vscode.window.terminals.length);
    // vscode.window.onDidOpenTerminal
    vscode.window.onDidOpenTerminal((terminal) => {
        console.log("Terminal opened. Total count: " + vscode.window.terminals.length);
    });
    vscode.window.onDidOpenTerminal((terminal) => {
        vscode.window.showInformationMessage(`Terminal, name: ${terminal.name} opened!`);
    });
    // vscode.window.onDidChangeActiveTerminal
    vscode.window.onDidChangeActiveTerminal((e) => {
        console.log(`Active terminal changed, name=${e ? e.name : "undefined"}`);
    });
    // vscode.window.createTerminal
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.createTerminal", () => {
        vscode.window.createTerminal(`stormalf-term Terminal #${NEXT_TERM_ID++}`);
        vscode.window.showInformationMessage("stormalf-term Terminal created!");
    }));
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.createTerminalHideFromUser", () => {
        vscode.window.createTerminal({
            name: `stormalf-term Terminal #${NEXT_TERM_ID++}`,
            hideFromUser: true,
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.createAndSend", () => __awaiter(this, void 0, void 0, function* () {
        const terminal = vscode.window.createTerminal(`stormalf-term Terminal #${NEXT_TERM_ID++}`);
        let sshlogin = yield vscode.window.showInputBox({
            value: "",
            prompt: "SSH Login",
        });
        if (sshlogin) {
            let sshhost = yield vscode.window.showInputBox({
                value: "LOCALHOST",
                prompt: "SSH host",
            });
            if (sshhost) {
                let sshport = yield vscode.window.showInputBox({
                    value: "22",
                    prompt: "SSH port",
                });
                if (sshport) {
                    vscode.window.showInformationMessage(`${sshlogin}@${sshhost} ${sshport}`);
                    terminal.sendText(`ssh ${sshlogin}@${sshhost} -p ${sshport}`);
                }
            }
        }
        //terminal.sendText("echo 'Sent text immediately after creating'");
        //terminal.sendText("ssh sgomes@PUB400.COM -p 2222");
        //terminal.sendText("ls");
    })));
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.createZshLoginShell", () => {
        vscode.window.createTerminal(`stormalf-term Terminal #${NEXT_TERM_ID++}`, "zsh", ["-l"]);
    }));
    // Terminal.hide
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.hide", () => {
        if (ensureTerminalExists()) {
            selectTerminal().then((terminal) => {
                if (terminal) {
                    terminal.hide();
                }
            });
        }
    }));
    // Terminal.show
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.show", () => {
        if (ensureTerminalExists()) {
            selectTerminal().then((terminal) => {
                if (terminal) {
                    terminal.show();
                }
            });
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.showPreserveFocus", () => {
        if (ensureTerminalExists()) {
            selectTerminal().then((terminal) => {
                if (terminal) {
                    terminal.show(true);
                }
            });
        }
    }));
    // Terminal.dispose
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.dispose", () => {
        if (ensureTerminalExists()) {
            selectTerminal().then((terminal) => {
                if (terminal) {
                    terminal.dispose();
                }
            });
        }
    }));
    // Terminal.processId
    context.subscriptions.push(vscode.commands.registerCommand("stormalf-term.processId", () => {
        selectTerminal().then((terminal) => {
            if (!terminal) {
                return;
            }
            terminal.processId.then((processId) => {
                if (processId) {
                    vscode.window.showInformationMessage(`Terminal.processId: ${processId}`);
                }
                else {
                    vscode.window.showInformationMessage("Terminal does not have a process ID");
                }
            });
        });
    }));
    // vscode.window.onDidCloseTerminal
    vscode.window.onDidCloseTerminal((terminal) => {
        vscode.window.showInformationMessage(`Terminal, name: ${terminal.name} closed!`);
    });
    // vvv Proposed APIs below vvv
    context.subscriptions.push(vscode.window.registerTerminalProfileProvider("stormalf-term.python-profile", {
        provideTerminalProfile(token) {
            return {
                options: {
                    name: "stormalf-term-Bash",
                    shellPath: "python3",
                },
            };
        },
    }));
    context.subscriptions.push(vscode.window.registerTerminalProfileProvider("stormalf-term.node-profile", {
        provideTerminalProfile(token) {
            return {
                options: {
                    name: "stormalf-term-Node",
                    shellPath: process.title,
                },
            };
        },
    }));
    //fish terminal profile
    context.subscriptions.push(vscode.window.registerTerminalProfileProvider("stormalf-term.fish-profile", {
        provideTerminalProfile(token) {
            return {
                options: {
                    name: "stormalf-term-Fish",
                    shellPath: "fish",
                },
            };
        },
    }));
}
exports.myterm = myterm;
function selectTerminal() {
    const terminals = vscode.window.terminals;
    const items = terminals.map((t) => {
        return {
            label: `name: ${t.name}`,
            terminal: t,
        };
    });
    return vscode.window.showQuickPick(items).then((item) => {
        return item ? item.terminal : undefined;
    });
}
function ensureTerminalExists() {
    if (vscode.window.terminals.length === 0) {
        vscode.window.showErrorMessage("No active terminals");
        return false;
    }
    return true;
}
//# sourceMappingURL=myterm.js.map