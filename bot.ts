import { Bot, Context, InlineKeyboard } from "grammy";

const token = "5468995099:AAH2MBvVmXBvieEk6t7q8gy9BAmH-I_mtH0";

const API_CAT = `https://api.thecatapi.com/v1/images/search?api_key=72e15643-0434-4c8d-bd67-a90a9489f0df`;
const API_FOX = `https://randomfox.ca/floof/`;
const API_DOG = `https://random.dog/woof.json`;
const API_DUCK = `https://random-d.uk/api/random`;

const keyboard = [
  [
    {
      text: "Вам кота",
      callback_data: "cat",
    },
  ],
  [
    {
      text: "Или песеля",
      callback_data: "dog",
    },
  ],
  [
    {
      text: "А может лису",
      callback_data: "fox",
    },
  ],
  [
    {
      text: "Я понял, утку",
      callback_data: "duck",
    },
  ],
];

const bot = new Bot(token);

const start = () => {
  const getData = async (url: string) => {
    const res = await fetch(url);
    let respData = await res.json();

    if (Array.isArray(respData)) {
      respData = respData[0];
    }
    if (!respData.url) {
      respData.url = respData.image;
    }

    return respData.url;
  };

  bot.command("start", async (ctx) => {
    await ctx.reply("Привет, что ты хочешь?", {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.msg?.chat.id;
    const text = query.callbackQuery.data;

    let img = "";

    if (text === "cat" && chatId) {
      img = await getData(API_CAT);
      await bot.api.sendMessage(chatId, "Вот твой кот."),
        await bot.api.sendPhoto(chatId, img),
        await bot.api.sendMessage(chatId, "А теперь?", {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        });
      return;
    }
    if (text === "dog" && chatId) {
      img = await getData(API_DOG);
      await bot.api.sendMessage(chatId, "Вот твоя собака. "),
        await bot.api.sendPhoto(chatId, img),
        await bot.api.sendMessage(chatId, "А теперь?", {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        });
      return;
    }
    if (text === "fox" && chatId) {
      img = await getData(API_FOX);
      await bot.api.sendMessage(chatId, "Вот тебе и лисица. "),
        await bot.api.sendPhoto(chatId, img),
        await bot.api.sendMessage(chatId, "А теперь?", {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        });
      return;
    }
    if (text === "duck" && chatId) {
      img = await getData(API_DUCK);
      await bot.api.sendMessage(chatId, "Ты хотел именно эту утку. "),
        await bot.api.sendPhoto(chatId, img),
        await bot.api.sendMessage(chatId, "А теперь?", {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        });

      return;
    }
  });

  bot.start();
};

start();
