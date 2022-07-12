const fs = require('fs');
// Needed to communicate with Discord API
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildId, token} = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

// Reads all command files under Commands/ directory
// sets them to commands in JSON format
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Edit bot commands list with current commands
// (sends to Discord API through RESTful)
const rest = new REST({version: '9'}).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
