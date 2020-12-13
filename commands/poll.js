module.exports = {
    name: 'poll',
    description: 'starts a simple yes/no poll',
    execute: async (message, args, bot, Discord) => {
       if (!args[0]) return message.channel.send("Invalid Syntax.\n```\n%poll <The yes/no question>\n```");
       let question = args.join(" ");
       let pollembed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setAuthor("📃Poll📃")
       .setTitle(question)
       .setDescription("React with 👍 for yes. \nReact with 👎 for no.")
       .setFooter(`Poll by ${message.author}`)
       .setTimestamp();
       let msg = await message.channel.send(pollembed)
       msg.react("👍").then(()=>{msg.react("👎")})
    }
}
