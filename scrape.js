const Xray = require("x-ray");
const x = Xray({
  filters: {
    getScore: v => {
      const width = v.slice(7, 9);
      return +width / 16;
    }
  }
});

async function getFortune(star) {
  return x(`https://www.xzw.com/fortune/${star}`, ".c_main", [
    {
      title: "h4",
      summary: {
        title: ".p1",
        content: ".c_cont p:nth-of-type(1) span"
      },
      love: {
        title: ".p2",
        content: ".c_cont p:nth-of-type(2)"
      },
      career: {
        title: ".p3",
        content: ".c_cont p:nth-of-type(3)"
      },
      money: {
        title: ".p4",
        content: ".c_cont p:nth-of-type(4)"
      },
      health: {
        title: ".p5",
        content: ".c_cont p:nth-of-type(5)"
      },
      stats: {
        general: {
          title: "dd li:nth-of-type(1) label",
          score: "dd li:nth-of-type(1) em@style | getScore"
        },
        love: {
          title: "dd li:nth-of-type(2) label",
          score: "dd li:nth-of-type(2) em@style | getScore"
        },
        career: {
          title: "dd li:nth-of-type(3) label",
          score: "dd li:nth-of-type(3) em@style | getScore"
        },
        money: {
          title: "dd li:nth-of-type(4) label",
          score: "dd li:nth-of-type(4) em@style | getScore"
        },
        health: "dd li:nth-of-type(5)@text",
        color: "dd li:nth-of-type(7)@text",
        number: "dd li:nth-of-type(8)@text",
        pair: "dd li:nth-of-type(9)@text"
      }
    }
  ]);
}

module.exports = getFortune;
