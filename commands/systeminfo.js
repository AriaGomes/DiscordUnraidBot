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
    data = data.servers['https://192-168-1-20.bbcd0582571cd2ef8b7cc59bc12bc8802251ab3a.myunraid.net/'].serverDetails;
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
