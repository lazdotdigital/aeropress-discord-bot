const { Client, Intents } = require('discord.js');
const { token, roles } = require('./constants');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith('addrole')) {
    await addRoleCommand(message);
  }
});

async function addRoleCommand(message) {
  const parts = message.content.split(' ');

  if (parts[1] === 'custom') {
    const name = parts.slice(2).join(' ');
    const role = await message.guild.roles.create({
      name,
      color: 'RED',
      reason: 'Custom Role',
    });

    await maybeAddRole(role, message);
  } else {
    const name = parts[1];
    const role = getRole(name, message.guild.roles.cache);

    await maybeAddRole(role, message);
  }
}

function getRole(name, cache) {
  return cache.find(role => roles[name] === role.id);
}

async function maybeAddRole(role, message) {
  if (role) {
    await message.member.roles.add(role);
    await message.delete();
  }
}

client.login(token);
