const mongo = require(`../mongo`);
const serverConfig = require('../Schemas/server-config');

module.exports = (async (bot, guild)=>{
    let result = await serverConfig.findOne(guild.id);
    bot.serverConfig.set(result._id, {
        prefix: result.prefix,
        suggestion: result.suggestion,
        welcome: result.welcome,
        welcomer: result.welcomer,
        leave: result.leave,
        modLog: result.modLog,
        ghost: result.ghost,
        autoRole: result.autoRole,
        goal: result.goal,
        giveaway: result.giveawayManagers
    });
})