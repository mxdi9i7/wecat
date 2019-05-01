const { Wechaty } = require("wechaty");

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

async function onMessage(msg) {
  const room = await bot.Room.find({ topic: "小老弟是嘴炮" });
  const fromRoom = msg.room();
  const fromContact = msg.from();
  if (fromRoom) {
    const alias = await fromRoom.alias(fromContact);
    if (msg.payload.text.toLowerCase().includes("peter")) {
      await room.say(`${alias || fromContact.name()} 叫爸爸干嘛`);
    }
  }
  console.log(msg);
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
