// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Activating devass!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposableCommand = vscode.commands.registerCommand('extension.startgoogle', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Start Google!');
	});


	
	let disposableCompletion = vscode.languages.registerCompletionItemProvider(['typescript', 'javascript'], {
		provideCompletionItems(document: vscode.TextDocument, position, token, context: vscode.CompletionContext) {

			const commandCompletion = new vscode.CompletionItem('google');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'google ';
			commandCompletion.command = { command: 'extension.startgoogle', title: 'Re-trigger completions...' };

		  return [
			commandCompletion
		  ];
		}
	  },'.');



	context.subscriptions.push(disposableCommand);
	context.subscriptions.push(disposableCompletion);
}

// this method is called when your extension is deactivated
export function deactivate() {}
