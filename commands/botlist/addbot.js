const Discord = require("discord.js");
module.exports = {
  name: "addbot", // Coloque o nome do comando do arquivo
  aliases: ["add-bot"], // Coloque sinônimos aqui
  run: async (bot, message, args) => {
    message.channel
      .send({
        content: `📝 **|** ${message.author}, Qual o **ID** do seu bot?`,
      })
      .then((msg) => {
        const p1 = message.channel
          .createMessageCollector({ time: 15000 })
          .on("collect", async (a) => {
            if (a.author.id != message.author.id) return;
            p1.stop();
            let id = a.content;
            let user;
            try {
              user = await bot.users.fetch(id);
            } catch (e) {
              msg.delete();
              msg.channel.send({ content: `:x: User inválido! ` });
              return;
            }
            if (!user.bot){
                msg.delete();
              msg.channel.send({ content: `:x: User não é um bot! :)` });
              return;
            }
            msg
              .edit({
                content: `📍 **|** ${a.author}, Qual o **PREFIXO** do seu bot: **${user.tag}**?`,
              })
              .then((msg1) => {
                const p2 = message.channel
                  .createMessageCollector({ time: 15000 })
                  .on("collect", async (b) => {
                    if (b.author.id != message.author.id) return;
                    p2.stop();
                    msg
                      .edit({
                        content: `:desktop: **|** ${b.author}, Qual a **LINGUAGEM** do seu bot?`,
                      })
                      .then((msg2) => {
                        const p3 = message.channel
                          .createMessageCollector({ time: 15000 })
                          .on("collect", async (c) => {
                            if (c.author.id != message.author.id) return;
                            p3.stop();
                            msg.edit({
                              content: `:white_check_mark: **|** ${c.author}, Sucesso bot enviado para análise!`,
                            });
                          });
                      });
                  });
              });
          });
      });
  },
};
