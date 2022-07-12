const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const {API_URL, dockerImageURL} = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('docker')
      .setDescription('Displays current docker info from your unraid server'),
  async execute(interaction) {
    const response = await fetch(API_URL + 'getServers');
    let data = await response.json();
    data = data.servers['https://192-168-1-20.bbcd0582571cd2ef8b7cc59bc12bc8802251ab3a.myunraid.net/'].docker.details.containers;
    const arr = [];
    for ( let i = 0; i < Object.keys(data).length; i++) {
      const title = data[Object.keys(data)[i]].name;
      const status = data[Object.keys(data)[i]].status;
      const id = data[Object.keys(data)[i]].containerId;
      const imageURL = dockerImageURL + data[Object.keys(data)[i]].imageUrl;

      const embed = new MessageEmbed()
          .setTitle(title)
          .setThumbnail(imageURL);
      arr.push(embed);
    }

    console.log(arr);
    await interaction.reply({embeds: [arr[0]]});
  },
};
