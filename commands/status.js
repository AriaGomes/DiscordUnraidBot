const {SlashCommandBuilder} = require('@discordjs/builders');
const {API_URL} = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('status')
      .setDescription('Displays current status of unraid API server'),
  async execute(interaction) {
    const response = await fetch(API_URL + 'getServers');
    let data = await response.json();
    data = data.servers['https://192-168-1-20.bbcd0582571cd2ef8b7cc59bc12bc8802251ab3a.myunraid.net/'].status;
    if (data == 'online') {
      await interaction
          .reply(`API is Online  ${Math.round(interaction.client.ws.ping)}ms`);
    } else {
      await interaction
          .reply(`API is Offline  ${Math.round(interaction.client.ws.ping)}ms`);
    }
  },
};
