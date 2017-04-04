const exec = require('child_process').exec;
const socket = require('socket.io-client')('https://my-server.herokuapp.com/', {
  extraHeaders: { source: "computer" }
});

openApp = (name) => {
	exec(`open -a "${name}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
}

socket.on('connect', () => console.log('Connected'));

socket.on('open', (data) => {
	openApp(data.item);
});

socket.on('disconnect', () => console.log('Disconnected'));
