const { MessageEmbed } = require('discord.js');
const { execute } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '';
const fs = require('fs')
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('ko').filter(file => file.endsWith('.js'));
 
 
client.once('ready', () =>{
    console.log('Bot jest online!');
    client.user.setActivity('jak działa świat', {type: 'LISTENING'});
    client.user.setStatus('dnd');
});
 
for (const file of commandFiles) {
    const command = require(`./ko/${file}`);
    client.commands.set(command.name, command);
}
 
 
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
 
    if (command === 'p!ankieta') {
        client.commands.get('ankieta').execute(message, args);
    } else if (command === 'p!help') {
        client.commands.get('embed').execute(message, args);
    } else if (command === 'p!kick') {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send("Nie masz uprawnień aby kickować")
            return;
          }
        client.commands.get('kick').execute(message, args);
    } else if (command === 'p!clean') {
        client.commands.get('clean').execute(message, args);
    } else if (command === 'p!ban') {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("Nie masz uprawnień aby kickować")
            return;
          }
        client.commands.get('ban').execute(message, args);
        } else if (command === 'siema') {
            message.reply('witaj')
        } else if (command === 'k2!zglos') {
            client.commands.get('zglos').execute(message, args);
    } 
});

client.login('ODM5MDUyMzk5OTI5NzIwODUy.YJECcA.JYtlPysPlOsQhcmi4M19z0htJek');