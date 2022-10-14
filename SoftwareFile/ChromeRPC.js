const rpc = require("discord-rpc"); //Discord.js RPC Extension
const client = new rpc.Client({ transport: "ipc" }); //Client.js RPC Extension
const config = require("../configRPC/configChrome.json"); //Config RPC Extension
const { Console } = require("console"); //This is a debug console object that will be used to print errors and warnings in a file
const fs = require('fs'); //This is a file system object that will be used to write files
const dataPIDChrome = './killer/PIDs/ChromePID.log' //This is a file system object that will be used to kill his process.


//Logger()
const LoggerPID = new Console({
  stdout: fs.createWriteStream(dataPIDChrome), //WARNING: this function overwrites existing log stream
});

client.login({ clientId: config.ClientID }).catch(console.error); //Logging...

client.on("ready", () => {

    LoggerPID.log(process.pid) //Log the process.pid to the LoggerPID object : dataPIDChrome : ./killer/PIDs/ChromePID.log
    getclear() //Clear the second line in the ChromePID.log
    
    client.request("SET_ACTIVITY", {
        pid: process.pid,
        activity: {
            details: config.Details,
            state: config.State,
            timestamps: {
                start: Date.now()
            },
            assets: {
                large_image: config.LargeImage,
                large_text: config.LargeImageText,
            },
        }
    })
})

function getclear(){
    const removeLines = (data, lines = []) => {
        return data
            .split('\n')
            .filter((val, idx) => lines.indexOf(idx) === -1)
            .join('\n');
    }
    fs.readFile(dataPIDChrome, 'utf8', (err, data) => {
        if (err) throw err;
        fs.writeFile(dataPIDChrome, removeLines(data, [1]), 'utf8', function(err) {
            if (err) throw err;
        });
    })
}

//CC : Magik#7123