const Discord = require("discord.js");
const bot = new Discord.Client({ intents: 32767 });
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync(`./commands/`);
fs.readdirSync("./commands/").forEach((local) => {
  const comandos = fs
    .readdirSync(`./commands/${local}`)
    .filter((arquivo) => arquivo.endsWith(".js"));
  for (let file of comandos) {
    let puxar = require(`./commands/${local}/${file}`);
    if (puxar.name) {
      bot.commands.set(puxar.name, puxar);
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach((x) => bot.aliases.set(x, puxar.name));
  }
});
bot.on("messageCreate", async (message) => {
  let prefix = "h.";
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  try {
    command.run(bot, message, args);
  } catch (err) {
    console.error("Erro:" + err);
  }
});
bot.once("ready", () => {
  console.log("Estou online!");
});
bot.login(
  "SEU TOKEN"
);
