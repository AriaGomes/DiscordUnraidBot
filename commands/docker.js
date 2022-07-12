const {SlashCommandBuilder} = require('@discordjs/builders');
const {API_URL} = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('docker')
      .setDescription('Displays current docker info from your unraid server'),
  async execute(interaction) {
    const response = await fetch(API_URL + 'getServers');
    let data = await response.json();
    data = data.servers['https://192-168-1-20.bbcd0582571cd2ef8b7cc59bc12bc8802251ab3a.myunraid.net/'].docker.details.containers;
    console.log(data);

    await interaction.reply(`🏓 ${Math.round(interaction.client.ws.ping)}ms`);
  },
};
