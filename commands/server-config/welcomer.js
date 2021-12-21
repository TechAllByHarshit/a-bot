const mongo = require(`../../mongo`);
const serverConfig = require('../../Schemas/server-config');
const Discord = require("discord.js");

function help(message, prefix){
    let emb = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Welcomer Help Menu")
        .setDescription(`**To set the welcomer**\n${prefix}welcomer channel set #welcome\n\n**To disable the welcomer**\n${prefix}welcomer channel unset\n\n**To set/change welcome message**\n${prefix}welcomer msg set\n\n**To view welcome message**\n${prefix}welcomer msg view`)
        .setTimestamp();
    return message.channel.send({embeds:[emb]});
}

module.exports = {
    name: 'welcomer',
    type: 'admin',
    description: 'sets or unsets the welcome channel.',
    usage: '&{prefix}welcomer set/unset <#channel>',
    aliases: [],
    permissions: ['SEND_MESSAGES'],
    async execute(message, args, bot, Discord, prefix) {
        return message.reply("Command is in development :D");
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You need manage server pemission to use this command.");
        if (args.length==0) {
            return help(message, prefix);
        } 
        if (args[0].toLowerCase()=="channel") {
            if (args[1]&&args[1].toLowerCase()=="set") {
                if (args[2]&&args[2].includes(message.mentions.channels.first())) {
                    let channel = message.mentions.channels.first();
                    const msg = await message.channel.send(`Setting ${channel} as the welcome channel.`);
                    try {
                        await channel.send("Successfully set this channel for the welcomer.");
                    }
                    catch (err) {
                        return msg.edit("Missing permissions in that channel");
                    }
                    await mongo().then(async (mongoose)=>{
                
                        await serverConfig.findOneAndUpdate({
                            _id: message.guild.id
                            },{
                                _id: message.guild.id,
                                welcome: channel.id,
                            },{
                                upsert: true
                            })
                    });
                    msg.edit(`Successfully set the ${channel} as the welcome channel.`);
                    let result = bot.serverConfig.get(message.guild.id);
                        bot.serverConfig.set(message.guild.id, {
                        prefix: result.prefix,
                        suggestion: result.suggestion,
                        welcome: channel.id,
                        leave: result.leave,
                        modLog: result.modLog,
                        ghost: result.ghost,
                        autoRole: result.autoRole,
                        goal: result.goal,
                        giveaway: result.giveawayManagers
                    })    
                }
                else {
                    message.reply("Please mention the welcome channel.")
                }
            }
            else if (args[1]&&args[1].toLowerCase() == "unset") {
                const msg = await message.channel.send(`Disabling the welcomer`);
                await mongo().then(async (mongoose)=>{
                
                    await serverConfig.findOneAndUpdate({
                            _id: message.guild.id
                        },{
                            _id: message.guild.id,
                            welcome: undefined,
                        },{
                            upsert: true
                        })
                });
                msg.edit(`Successfully disabled the welcomer`);
                let result = bot.serverConfig.get(message.guild.id);
                    bot.serverConfig.set(message.guild.id, {
                    prefix: result.prefix,
                    suggestion: result.suggestion,
                    welcome: undefined,
                    leave: result.leave,
                    modLog: result.modLog,
                    ghost: result.ghost,
                    autoRole: result.autoRole,
                    goal: result.goal,
                    giveaway: result.giveawayManagers
                })    
            }
            else {
                help(message, prefix)
            }
        }
        else if (args[0].toLowerCase()=="msg") {
            if (args[1]&&args[1].toLowerCase()=="set") {
                if (args[2]&&args[2].includes(message.mentions.channels.first())) {
                    let channel = message.mentions.channels.first();
                    const msg = await message.channel.send(`Setting ${channel} as the welcome channel.`);
                    try {
                        await channel.send("Successfully set this channel for the welcomer.");
                    }
                    catch (err) {
                        return msg.edit("Missing permissions in that channel");
                    }
                    await mongo().then(async (mongoose)=>{
                
                        await serverConfig.findOneAndUpdate({
                            _id: message.guild.id
                            },{
                                _id: message.guild.id,
                                welcome: channel.id,
                            },{
                                upsert: true
                            })
                    });
                    msg.edit(`Successfully set the ${channel} as the welcome channel.`);
                    let result = bot.serverConfig.get(message.guild.id);
                        bot.serverConfig.set(message.guild.id, {
                        prefix: result.prefix,
                        suggestion: result.suggestion,
                        welcome: channel.id,
                        leave: result.leave,
                        modLog: result.modLog,
                        ghost: result.ghost,
                        autoRole: result.autoRole,
                        goal: result.goal,
                        giveaway: result.giveawayManagers
                    })    
                }
                else {
                    message.reply("Please mention the welcome channel.")
                }
            }
            else if (args[1]&&args[1].toLowerCase() == "unset") {
                const msg = await message.channel.send(`Disabling the welcomer`);
                await mongo().then(async (mongoose)=>{
                
                    await serverConfig.findOneAndUpdate({
                            _id: message.guild.id
                        },{
                            _id: message.guild.id,
                            welcome: undefined,
                        },{
                            upsert: true
                        })
                });
                msg.edit(`Successfully disabled the welcomer`);
                let result = bot.serverConfig.get(message.guild.id);
                    bot.serverConfig.set(message.guild.id, {
                    prefix: result.prefix,
                    suggestion: result.suggestion,
                    welcome: undefined,
                    leave: result.leave,
                    modLog: result.modLog,
                    ghost: result.ghost,
                    autoRole: result.autoRole,
                    goal: result.goal,
                    giveaway: result.giveawayManagers
                })    
            }
            else {
                help(message, prefix)
            }
        }
    }
}
