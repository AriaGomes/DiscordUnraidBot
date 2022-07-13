const {SlashCommandBuilder} = require('@discordjs/builders');
const {API_URL} = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('status')
      .setDescription('Displays current status of unraid API server'),
  async execute(interaction) {
    const response = await fetch(API_URL + 'getServers');
    let data = await response.json();
    // Grab the first server
    // Limitation of one server until I write a fully dynamic algorithm
    data = data.servers[Object.keys(data.servers)[0]].status;
    if (data == 'online') {
      await interaction
          .reply(`API is Online  ${Math.round(interaction.client.ws.ping)}ms`);
    } else {
      await interaction
          .reply(`API is Offline  ${Math.round(interaction.client.ws.ping)}ms`);
    }
  },
};
