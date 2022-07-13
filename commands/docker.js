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
    // Grab the first server
    // Limitation of one server until I write a fully dynamic algorithm
    data = data.servers[Object.keys(data.servers)[0]].docker.details.containers;
    const arr = [];
    for ( let i = 0; i < Object.keys(data).length; i++) {
      const title = data[Object.keys(data)[i]].name;
      const status = data[Object.keys(data)[i]].status;
      const id = data[Object.keys(data)[i]].containerId;
      const imageURL = dockerImageURL + data[Object.keys(data)[i]].imageUrl;

      const embed = new MessageEmbed()
          .setTitle(title)
          .setImage(imageURL)
          .setFooter({text: 'Some footer text here', iconURL: imageURL});
      arr.push(embed);
    }

    console.log(arr);
    await interaction.reply({embeds: [arr[0]]});
  },
};
