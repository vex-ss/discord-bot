const Discord = require('discord.js');

const bot = new Discord.Client();


const { token } = require('./config.json');

const { readdirSync, read } = require('fs');

const { join } = require('path');
const { channel } = require('diagnostics_channel');

bot.commands = new Discord.Collection();

const prefix = '$';
//this prefix can be what ever you want ;)

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const  command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

bot.on("error", console.error);


//Custom Status---------------------------------------------------------------------------------------------------------------Custom Status
bot.on('ready', () => {
    console.log('Bot is Online!');
    const activities = [
        "",
        "Go check out our Merch!",
        "",
        "Watching Bitcoin.",
        ""
      ];
      bot.on("ready", () => {
        // run every 10 seconds
        setInterval(() => {
          // generate random number between 1 and list length.
          const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
          const newActivity = activities[randomIndex];
      
          bot.user.setActivity(newActivity);
        }, 10000);
      });
})

const activities = [
    "",
    "Go check out our Merch!",
    "Description HERE",
    "Watching Bitcoin.",
    ""
  ];
  
  bot.on("ready", () => {
    // run every 10 seconds
    setInterval(() => {
      // generate random number between 1 and list length.
      const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
      const newActivity = activities[randomIndex];
  
      bot.user.setActivity(newActivity);
    }, 10000);
  });
//Custom Status----------------------------------------------------------------------------------------------------------------Custom Status

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!bot.commands.has(command)) return;


        try {
            bot.commands.get(command).run(bot, message, args);
        } catch (error){
            console.error(error);
        }
    }
})

bot.on('guidCreate', (guild) => {
    let channeltoSend;
    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === "text" &&
            !channeltoSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) channeltoSend = channel;
    });
    if(!channeltoSend) return;

    let channelEmbed = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setAuthor(`Hello! Thank you for invting me to your server!`)
    .setDescription("Prefix is: $")
    .addField("Need help?", "Contact the creator StanTheMan#6969 or type $help")

    channeltoSend.send(channelEmbed).catch(e => {
        if (e) {
            return;
        }});
})


//--------------------------------------------------------------------------------------------------------------------------------------------\\
//music here code 



bot.login(token);