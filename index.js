const fs = require('fs');
// Require the necessary discord.js classes
const {Client, Collection, Intents} = require('discord.js');
const {token} = require('./config.json');

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) =>
  file.endsWith('.js'));

// Reads all command files under Commands/ directory and sets them to commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// On user message sent
client.on('messageCreate', (message) => {

});


// On slash command sent
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    // Invoke Command
    await command.execute(interaction);
  } catch (error) {
    // Should not get here
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);
