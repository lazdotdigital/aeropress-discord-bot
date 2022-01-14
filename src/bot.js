const { Client, Intents } = require('discord.js');
const { token, roles } = require('./constants');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith('addrole')) {
    const roleName = message.content.split(' ')[1];
    const role = getRole(roleName, message.guild.roles.cache);
    if (role) {
      await message.member.roles.add(role);
      await message.delete();
    }
  }
});

function getRole(name, cache) {
  return cache.find(role => roles[name] === role.id);
}

client.login(token);
