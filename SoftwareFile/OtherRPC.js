const rpc = require("discord-rpc"); //Discord.js RPC Extension
const client = new rpc.Client({ transport: "ipc" }); //Client.js RPC Extension
const config = require("../configRPC/configOther.json"); //Config RPC Extension
const { Console } = require("console"); //This is a debug console object that will be used to print errors and warnings in a file
const fs = require('fs'); //This is a file system object that will be used to write files
const dataPIDOther = './killer/PIDs/OtherPID.log' //This is a file system object that will be used to kill his process.
const Loc = './killer/PIDs/Activity.log'

//Logger()
const LoggerPID = new Console({
    stdout: fs.createWriteStream(dataPIDOther), //WARNING: this function overwrites existing log stream
});

const Activity = new Console({
    stdout: fs.createWriteStream(Loc), //WARNING: this function overwrites existing log stream
});


client.login({ clientId: config.ClientID }).catch(console.error); //Logging...

client.on("ready", () => {

    Activity.log('Other')
    getclear(Loc)

    LoggerPID.log(process.pid) //Log the process.pid to the LoggerPID object : dataPIDAe : ./killer/PIDs/OtherPID.log
    getclear(dataPIDOther) //Clear the second line in the OtherPID.log

    client.request("SET_ACTIVITY", {
        pid: process.pid,
        activity: {
            state: config.State,
            timestamps: {
                start: Date.now()
            },
            assets: {
                large_image: config.LargeImage,
                large_text: config.LargeImageText,
                small_image: config.SmallImage,
                small_text: config.SmallImageText,
            },
            buttons: [{
                    label: config.Button1,
                    url: config.Url1
                },
                {
                    label: config.Button2,
                    url: config.Url2
                },

            ]
        }
    })
})

function getclear(cleared){
    const removeLines = (data, lines = []) => {
        return data
            .split('\n')
            .filter((val, idx) => lines.indexOf(idx) === -1)
            .join('\n');
    }
    fs.readFile(cleared, 'utf8', (err, data) => {
        if (err) throw err;
        fs.writeFile(cleared, removeLines(data, [1]), 'utf8', function(err) {
            if (err) throw err;
        });
    })
}

//CC : Magik#7123