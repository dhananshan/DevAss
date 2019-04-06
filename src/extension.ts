// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const open = require('open');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Activating devass!');

		let dass = new DevAss();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposableCommandDevAss = vscode.commands.registerCommand('extension.devass', () => {
		// The code you place here will be executed every time your command is executed
		dass.promptSearch();
	});

	let disposableCommandGoogle = vscode.commands.registerCommand('extension.google', () => {
		// The code you place here will be executed every time your command is executed
		dass.promptSearch();
	});
	
	let disposableCompletion = vscode.languages.registerCompletionItemProvider([{ scheme: 'file', language: 'typescript' }], {
		provideCompletionItems(document: vscode.TextDocument, position, token, context: vscode.CompletionContext) {

			const commandCompletionGoogle = new vscode.CompletionItem('google');
			commandCompletionGoogle.kind = vscode.CompletionItemKind.Keyword;
			commandCompletionGoogle.insertText = 'google ';
			commandCompletionGoogle.command = { command: 'extension.devass', title: 'Developer Assistant' };

			const commandCompletionDevAss = new vscode.CompletionItem('devAss');
			commandCompletionDevAss.kind = vscode.CompletionItemKind.Keyword;
			commandCompletionDevAss.insertText = 'devAss ';
			commandCompletionDevAss.command = { command: 'extension.devass', title: 'Developer Assistant' };

			// remove type devass and google
			//let  a = document.lineAt(position).text.substr(0, position.character);

		  return [
				commandCompletionGoogle,
				commandCompletionDevAss
		  ];
		}
	  },'.');



	context.subscriptions.push(disposableCommandDevAss);
	context.subscriptions.push(disposableCommandGoogle);
	context.subscriptions.push(disposableCompletion);
}

// this method is called when your extension is deactivated
export function deactivate() {}


class DevAss{

	public async promptSearch(){
		// Display a message box to the user
		
		let result = await vscode.window.showInputBox({
			placeHolder: 'For example: best approach to sort an int array'
		});
		vscode.window.showInformationMessage(`Start Google! ${result}`);
		open('https://www.google.com');

	}

}
