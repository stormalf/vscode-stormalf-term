# stormalf-term README

This is the README for the terminal extension "stormalf-term".

## Features

This extension is based on terminal sample : https://github.com/microsoft/vscode-extension-samples/tree/main/terminal-sample

I removed some features and added the remote SSH connection feature when starting a new terminal asking 3 parameters :

- ssh login
- ssh host : default LOCALHOST
- ssh port : default 22

I kept for now the helloworld initial window messages.

## Requirements

dependencies in package.json:

- "@types/vscode": "^1.58.0",
- "@types/glob": "^7.1.3",
- "@types/mocha": "^8.2.2",
- "@types/node": "14.x",
- "eslint": "^7.27.0",
- "@typescript-eslint/eslint-plugin": "^4.26.0",
- "@typescript-eslint/parser": "^4.26.0",
- "glob": "^7.1.7",
- "mocha": "^8.4.0",
- "typescript": "^4.3.2",
- "vscode-test": "^1.5.2"

requires python3, fish and node and tested only on linux !

## Extension Settings

No settings configuration set for the moment

## Known Issues

Hide and show works only with the selected terminal

## Release Notes

- "onCommand:stormalf-term.helloWorld" : show the window with hello world message (first extension sample)
- "onCommand:stormalf-term.createAndSend": create a new terminal with remote SSH connection : 3 parameters required : login host and port
- "onCommand:stormalf-term.createTerminal" : create a new terminal
- "onCommand:stormalf-term.createTerminalHideFromUser": create the terminal and hide it
- "onCommand:stormalf-term.createZshLoginShell": create a new terminal with Zsh shell
- "onCommand:stormalf-term.dispose": kill the selected terminal
- "onCommand:stormalf-term.hide": hide the selected terminal
- "onCommand:stormalf-term.processId": show the process Id of the selected terminal
- "onCommand:stormalf-term.show": show the selected terminal (hidden before)
- "onCommand:stormalf-term.showPreserveFocus": show the selected terminal (not sure about difference with previous one)
- "onTerminalProfile:stormalf-term.python-profile": create a terminal profile and start a terminal directly inside the python3 interpreter
- "onTerminalProfile:stormalf-term.node-profile": create a terminal profile and start a terminal directly inside the nodejs interpreter
- "onTerminalProfile:stormalf-term.fish-profile": create a terminal profile and start a terminal directly inside the fish shell

### 0.0.1

Initial release of stormalf-term

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
- Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
- Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
