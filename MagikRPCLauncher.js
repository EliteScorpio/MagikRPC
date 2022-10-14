//NOTE : L'activation simple des RPC est possible via la commande /enablerpc sans importance avec editing or writing
// or coding...

//Chose à faire rapidement : Arrêter le RPC avec la commande marche pour Word ! (via killerWord.js)
//                           Regarder pour mettre les patch file
//                           Changer le process, mais à voir si pas de confusion?
// 
// CC Magik.

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require("./config.json");
const process = require("process"); //Need for console?log
const cp = require("child_process"); //Need for run other js file
const Software1 = {} //Need for killing proc
//const fs = require('fs')


console.log(`Launching in progress by NodeJS : ${process.execPath}`)
console.log(`Version Node : ${process.versions.node}`)
console.log(`PID Bot : ${process.pid}`)

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.options.getString("software"))

    const { commandName } = interaction;
    const SoftwareSearch =  interaction.options.getString("software")
    const SoftwareJS = SoftwareSearch.charAt(0).toUpperCase() + SoftwareSearch.slice(1);
    
    if (commandName === "ping"){
        await interaction.reply("Pong !");
    } else if (commandName === "server") {
        await interaction.reply("Server Info !");
    } else if (commandName === "enablerpc") {

        await interaction.reply(`Activation du RPC... Software use : ${SoftwareSearch} and : ${SoftwareJS}`);
        
        cp.exec(`node ./SoftwareFile/${SoftwareJS}RPC.js`, function(stdout){
            console.log(stdout);
        });

    } else if (commandName === "changerpc") {
        await interaction.reply("Changement du RPC...");
    } else if (commandName === "stoprpc") {
        await interaction.reply(`RPC STOP : ${Software1.searchS}`);

        /*cp.exec(`node ./killer/${Software1.searchS}.js`, function(stdout){
            console.log(stdout);
        })*/
    } 
})

client.login(token);

/*
async function stop(){
    console.log(Software1.searchS)
    if (Software1.searchS === 'word') {
        cp.exec("node ./killer/killerWord.js", function(error, stdout, stderr){
            console.log(stdout);
        });
        } else if (Software1.searchS === 'chrome') {
        
        cp.exec("node ./killer/killerChrome.js", function(error, stdout, stderr){
            console.log(stdout);
        });
            } else {
            console.log('InvalidArgumentError   - Invalid argument passed   to KillPid');
        }
    }
*/

//CC : Magik#7123