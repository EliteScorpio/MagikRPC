//NOTE : L'activation simple des RPC est possible via la commande /enablerpc sans importance avec editing or writing
// or coding...

//Chose à faire rapidement 
//                           Regarder pour mettre les patch file
//                           Changer le process, mais à voir si pas de confusion?
// 
// CC Magik.

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require("./config.json");
const process = require("process"); //Need for console?log
const cp = require("child_process"); //Need for run other js file
const fs = require('fs')
const { Console } = require("console"); //This is a debug console object that will be used to print errors and warnings in a file
const LocAct = './killer/PIDs/Activity.log';
const tempChoices = './configRPC/tempfile.txt'

const SelectChoices = new Console({
    stdout: fs.createWriteStream(tempChoices), //WARNING: this function overwrites existing log stream
  });


console.log(`Launching in progress by NodeJS : ${process.execPath}`)
console.log(`Version Node : ${process.versions.node}`)
console.log(`PID Bot : ${process.pid}`)

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    //Logs somethings...
    console.log('DEBUG : ' + interaction.options.getString("software"))
    console.log('DEBUG : ' + interaction.options.getString("editingorwritting"))
    console.log('DEBUG : ' + interaction.options.getString("patchfile"))

    const { commandName } = interaction;
    
    if (commandName === "ping"){
        await interaction.reply("Pong !");
    } else if (commandName === "server") {
        await interaction.reply("Server Info !");
    } else if (commandName === "enablerpc") {

        const SoftwareSearch =  interaction.options.getString("software")

        const SoftwareJS = SoftwareSearch.charAt(0).toUpperCase() + SoftwareSearch.slice(1)

        const SoftwareEOWOC = interaction.options.getString("editingorwritting")

        const SoftwarePatch = interaction.options.getString("patchfile")

        SelectChoices.log(SoftwareJS)
        SelectChoices.log(SoftwareEOWOC)
        switch (SoftwarePatch){
            case null:

                function getclearN(cleared){
                    const removeLines = (data, lines = []) => {
                        return data
                            .split('\n')
                            .filter((val, idx) => lines.indexOf(idx) === -1)
                            .join('\n');
                    }
                    fs.readFile(cleared, 'utf8', (err, data) => {
                        if (err) throw err;
                        fs.writeFile(cleared, removeLines(data, [2]), 'utf8', function(err) {
                            if (err) throw err;
                        });
                    })
                }

                getclearN(tempChoices);
                break;
            case (`${SoftwarePatch}`):

                SelectChoices.log(SoftwarePatch)

                function getclearS(cleared){
                    const removeLines = (data, lines = []) => {
                        return data
                            .split('\n')
                            .filter((val, idx) => lines.indexOf(idx) === -1)
                            .join('\n');
                    }
                    fs.readFile(cleared, 'utf8', (err, data) => {
                        if (err) throw err;
                        fs.writeFile(cleared, removeLines(data, [3]), 'utf8', function(err) {
                            if (err) throw err;
                        });
                    })
                }
                getclearS(tempChoices);
                break;
        } 

        await interaction.reply(`Activation du RPC... Software use : ${SoftwareSearch} and : ${SoftwareJS}`);
        
        cp.exec(`node ./SoftwareFile/${SoftwareJS}RPC.js`, function(stdout){
            console.log(stdout);
        });

    } else if (commandName === "changerpc") {
        await interaction.reply("Changement du RPC...");
    } else if (commandName === "stoprpc") {

        fs.readFile(LocAct, 'utf8', function (err, dataStop) {
            if (err) throw err;
            interaction.reply(`RPC STOP : ${dataStop}`);
            cp.exec(`node ./killer/killer${dataStop}.js`, function(stdout){
                console.log(stdout);
            })
          });
    } 
});

client.login(token);

//CC : Magik#7123