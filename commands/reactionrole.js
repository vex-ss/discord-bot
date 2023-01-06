const { MessageEmbed, Role } = require('discord.js')

module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",

    async run (bot, message, args) {
        const channelID = message.mentions.channels.first();
        if(!channelID) return message.reply("Please specify a valid channel you want the embed to be sent in!\n `Example: $reactionrole #<channel> <Your Description>`")

        const desc = args.slice(1).join(" ")
        if(!desc) return message.reply("Please add a valid description!\n `Example: $reactionrole #<channel> <Your Description>`")


        const Role1 = message.guild.roles.cache.find(role => role.name === "Verified")

        const emoji1 = '✅';


        let embed = new MessageEmbed()
        .setColor("BLACK")
        .setTitle("Please Verify Here!")
        .setDescription(desc)

        let msgembed = await channelID.send(embed)
        await msgembed.react(emoji1)

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelID) {
                if (reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Role1)
                }
            } else {
                return;
            }
        });

        bot.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelID) {
            if (reaction.emoji.name === emoji1) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Role1)
                }
            
            } else {
                return;
            }
        });
    }
}