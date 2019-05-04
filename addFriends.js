const { Wechaty } = require("wechaty");

function onScan(qrcode, status) {
  require("qrcode-terminal").generate(qrcode, { small: true });

  const qrcodeImageUrl = [
    "https://api.qrserver.com/v1/create-qr-code/?data=",
    encodeURIComponent(qrcode)
  ].join("");

  console.log(qrcodeImageUrl);
}

async function onLogin(user) {
  console.log(`${user} login`);
  const testRoom = await bot.Room.find({ topic: "测试群" });
  const memberList = await testRoom.memberList();
  const firstMember = await memberList[0].name();
  bot.Friendship.add(memberList[0], "你好 我是Peter").then(v => {
    console.log("done", v);
    console.log("added", firstMember);
  });
  // for (let i = 0; i < memberList.length; i++) {
  //   setInterval(async () => {
  //     console.log("adding ", await memberList[i].name());
  //     await bot.Friendship.add(memberList[i], "你好 我是Peter");
  //   }, i * 1000 * 10);
  // }
}

function onLogout(user) {
  console.log(`${user} logout`);
}

async function onMessage(msg) {
  console.log("got new message");
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
