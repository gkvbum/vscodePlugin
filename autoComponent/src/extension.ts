// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const fs = require("fs");
const config = require("../src/index");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "autocomponent" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"autocomponent.cr-rcm",
		function (args) {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage("cr-rcm from autoComponent!");
			useExtension(args)
				.then(() => {
					vscode.window.showInformationMessage("success");
				})
				.catch((error) => {
					vscode.window.showErrorMessage(error);
				});
			context.subscriptions.push(disposable);
		}
	);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
function useExtension(args: any) {
	return new Promise((resolve, reject) => {
		try {
			const path = vscode.workspace.rootPath;
			if (!path) {
				vscode.window.showErrorMessage("请打开项目文件夹");
				reject("");
				return;
			}
			const selectPath = args.path;
			const fileName = selectPath.split("/").slice(-1)[0];
			const lowerName = fileName.replace(fileName[0], fileName[0].toLowerCase());
			const uperName = fileName.replace(fileName[0], fileName[0].toUpperCase());
			// /Users/lijianxin35/JD.COM/coding/interviewRoom-pc-fe/wewrwer

			const indexjsPath = `${selectPath}/index.tsx`;
			const indexLessPath = `${selectPath}/index.module.less`;
			if (!fs.existsSync(indexjsPath) && !fs.existsSync(indexLessPath)) {
				fs.writeFileSync(indexjsPath, config.componentReact.replaceAll('UPER-COMPONENT-NAME',uperName).replaceAll('LOWER-COMPONENT-NAME',lowerName));
				fs.writeFileSync(indexLessPath, config.componentLess.replaceAll('UPER-COMPONENT-NAME',uperName).replaceAll('LOWER-COMPONENT-NAME',lowerName));
			} else {
				vscode.window.showErrorMessage("请先删除文件index.tsx 和 index.module.less");
				reject("");
			}
			resolve("");
		} catch (error) {
			reject(error);
		}
	});
}
