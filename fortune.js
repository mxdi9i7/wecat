const { Wechaty } = require("wechaty");
const getFortune = require("./scrape");
const stars = [
  "aquarius",
  "pisces",
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn"
];
function onScan(qrcode, status) {
  require("qrcode-terminal").generate(qrcode, { small: true }); // show qrcode on console

  const qrcodeImageUrl = [
    "https://api.qrserver.com/v1/create-qr-code/?data=",
    encodeURIComponent(qrcode)
  ].join("");

  console.log(qrcodeImageUrl);
}

function onLogin(user) {
  console.log(`${user} login`);
}

function onLogout(user) {
  console.log(`${user} logout`);
}

const getStar = num => `${num}★`;

async function onMessage(m) {
  const room = m.room();
  const contact = m.from();
  if (room) {
    const alias = (await room.alias(contact)) || contact.name();
    if (stars.includes(m.text().toLowerCase())) {
      const fortuneArr = await getFortune(m.text());

      const fortune = fortuneArr[0];
      const { summary, stats, love, career, money, health } = fortune;
      room.say(`${alias}, ${fortune.title}：

        ${summary.title}(${getStar(stats.general.score)})： ${summary.content}

        ${love.title}(${getStar(stats.love.score)}): ${love.content},

        ${career.title}(${getStar(stats.career.score)})： ${career.content}

        ${health.title}(${stats.health})： ${health.content}

        ${money.title}(${getStar(stats.money.score)})：${money.content}

        ${stats.color}，
        ${stats.number}，
        ${stats.pair}。
      `);
    }
  }
}

const bot = new Wechaty();

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", onMessage);

bot
  .start()
  .then(() => console.log("Starter Bot Started."))
  .catch(e => console.error(e));
