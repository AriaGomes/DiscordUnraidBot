const {SlashCommandBuilder} = require('@discordjs/builders');
const {API_URL} = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('array')
      .setDescription('Displays array stats from unraid in a nice embed'),
  async execute(interaction) {
    const response = await fetch(API_URL + 'getServers');
    let data = await response.json();
    // Get relevant data from JSON object
    // Grab the first server
    // Limitation of one server until I write a fully dynamic algorithm
    data = data.servers[Object.keys(data.servers)[0]].serverDetails;
    // Seperate data
    const arrayUsedSpace = data.arrayUsedSpace;
    const arrayTotalSpace = data.arrayTotalSpace;
    const arrayFreeSpace = data.arrayFreeSpace;
    const arrayStatus = data.arrayStatus;
    const moverStatus = data.moverStatus;
    const parityCheckRunning = data.parityCheckRunning;

    // Create Embed

    // Return embed in interaction
    console.log(arrayFreeSpace);
    await interaction.reply(`🏓 ${Math.round(interaction.client.ws.ping)}ms`);
  },
};
