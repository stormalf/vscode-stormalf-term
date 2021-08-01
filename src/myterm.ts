// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function myterm(context: vscode.ExtensionContext) {
  let NEXT_TERM_ID = 1;

  console.log("Terminals: " + (<any>vscode.window).terminals.length);

  // vscode.window.onDidOpenTerminal
  vscode.window.onDidOpenTerminal((terminal) => {
    console.log(
      "Terminal opened. Total count: " + (<any>vscode.window).terminals.length
    );
  });
  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
    vscode.window.showInformationMessage(
      `Terminal, name: ${terminal.name} opened!`
    );
  });

  // vscode.window.onDidChangeActiveTerminal
  vscode.window.onDidChangeActiveTerminal((e) => {
    console.log(`Active terminal changed, name=${e ? e.name : "undefined"}`);
  });

  // vscode.window.createTerminal
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-stormalf-term.createTerminal",
      () => {
        vscode.window.createTerminal(
          `stormalf-term Terminal #${NEXT_TERM_ID++}`
        );
        vscode.window.showInformationMessage("stormalf-term Terminal created!");
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-stormalf-term.createTerminalHideFromUser",
      () => {
        vscode.window.createTerminal({
          name: `stormalf-term Terminal #${NEXT_TERM_ID++}`,
          hideFromUser: true,
        } as any);
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-stormalf-term.createAndSend",
      async () => {
        const terminal = vscode.window.createTerminal(
          `stormalf-term Terminal #${NEXT_TERM_ID++}`
        );
        let sshlogin = await vscode.window.showInputBox({
          value: "",
          prompt: "SSH Login",
        });
        if (sshlogin) {
          let sshhost = await vscode.window.showInputBox({
            value: "LOCALHOST",
            prompt: "SSH host",
          });
          if (sshhost) {
            let sshport = await vscode.window.showInputBox({
              value: "22",
              prompt: "SSH port",
            });
            if (sshport) {
              vscode.window.showInformationMessage(
                `${sshlogin}@${sshhost} ${sshport}`
              );
              terminal.sendText(`ssh ${sshlogin}@${sshhost} -p ${sshport}`);
            }
          }
        }
        //terminal.sendText("echo 'Sent text immediately after creating'");
        //terminal.sendText("ssh sgomes@PUB400.COM -p 2222");
        //terminal.sendText("ls");
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-stormalf-term.createZshLoginShell",
      () => {
        vscode.window.createTerminal(
          `stormalf-term Terminal #${NEXT_TERM_ID++}`,
          "zsh",
          ["-l"]
        );
      }
    )
  );

  // Terminal.hide
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-stormalf-term.hide", () => {
      if (ensureTerminalExists()) {
        selectTerminal().then((terminal) => {
          if (terminal) {
            terminal.hide();
          }
        });
      }
    })
  );

  // Terminal.show
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-stormalf-term.show", () => {
      if (ensureTerminalExists()) {
        selectTerminal().then((terminal) => {
          if (terminal) {
            terminal.show();
          }
        });
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-stormalf-term.showPreserveFocus",
      () => {
        if (ensureTerminalExists()) {
          selectTerminal().then((terminal) => {
            if (terminal) {
              terminal.show(true);
            }
          });
        }
      }
    )
  );

  // Terminal.dispose
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-stormalf-term.dispose", () => {
      if (ensureTerminalExists()) {
        selectTerminal().then((terminal) => {
          if (terminal) {
            terminal.dispose();
          }
        });
      }
    })
  );

  // Terminal.processId
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-stormalf-term.processId", () => {
      selectTerminal().then((terminal) => {
        if (!terminal) {
          return;
        }
        terminal.processId.then((processId) => {
          if (processId) {
            vscode.window.showInformationMessage(
              `Terminal.processId: ${processId}`
            );
          } else {
            vscode.window.showInformationMessage(
              "Terminal does not have a process ID"
            );
          }
        });
      });
    })
  );

  // vscode.window.onDidCloseTerminal
  vscode.window.onDidCloseTerminal((terminal) => {
    vscode.window.showInformationMessage(
      `Terminal, name: ${terminal.name} closed!`
    );
  });

  // vvv Proposed APIs below vvv

  context.subscriptions.push(
    vscode.window.registerTerminalProfileProvider(
      "vscode-stormalf-term.python-profile",
      {
        provideTerminalProfile(
          token: vscode.CancellationToken
        ): vscode.ProviderResult<vscode.TerminalProfile> {
          return {
            options: {
              name: "stormalf-term-Bash",
              shellPath: "python3",
            },
          };
        },
      }
    )
  );

  context.subscriptions.push(
    vscode.window.registerTerminalProfileProvider(
      "vscode-stormalf-term.node-profile",
      {
        provideTerminalProfile(
          token: vscode.CancellationToken
        ): vscode.ProviderResult<vscode.TerminalProfile> {
          return {
            options: {
              name: "stormalf-term-Node",
              shellPath: process.title,
            },
          };
        },
      }
    )
  );

  //fish terminal profile
  context.subscriptions.push(
    vscode.window.registerTerminalProfileProvider(
      "vscode-stormalf-term.fish-profile",
      {
        provideTerminalProfile(
          token: vscode.CancellationToken
        ): vscode.ProviderResult<vscode.TerminalProfile> {
          return {
            options: {
              name: "stormalf-term-Fish",
              shellPath: "fish",
            },
          };
        },
      }
    )
  );
}

function selectTerminal(): Thenable<vscode.Terminal | undefined> {
  interface TerminalQuickPickItem extends vscode.QuickPickItem {
    terminal: vscode.Terminal;
  }
  const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
  const items: TerminalQuickPickItem[] = terminals.map((t) => {
    return {
      label: `name: ${t.name}`,
      terminal: t,
    };
  });
  return vscode.window.showQuickPick(items).then((item) => {
    return item ? item.terminal : undefined;
  });
}

function ensureTerminalExists(): boolean {
  if ((<any>vscode.window).terminals.length === 0) {
    vscode.window.showErrorMessage("No active terminals");
    return false;
  }
  return true;
}
