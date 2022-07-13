const {SlashCommandBuilder} = require('@discordjs/builders');
const {API_URL} = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('systeminfo')
      .setDescription('Displays system info from unraid in a nice embed'),
  async execute(interaction) {
    const response = await fetch(API_URL + 'getServers');
    let data = await response.json();
    // Get relevant data from JSON object
    // Grab the first server
    // Limitation of one server until I write a fully dynamic algorithm
    data = data.servers[Object.keys(data.servers)[0]].serverDetails;
    // Seperate data
    const title = data.title;
    const cpu = data.cpu;
    const memory = data.memory;
    const motherboard = data.motherboard;
    const version = data.version;
    const on = data.on;

    // Create Embed

    // Return embed in interaction
    console.log(motherboard);
    await interaction.reply(`🏓 ${Math.round(interaction.client.ws.ping)}ms`);
  },
};
