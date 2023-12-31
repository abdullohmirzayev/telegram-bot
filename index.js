const TelegramBot = require("node-telegram-bot-api");
const { gameOptions, aginOptions } = require('./options')

const token = "6614822291:AAGrO7yJkUMnrw98q0MLgUwtpUsHg8mPUaA";

const bot = new TelegramBot(token, { polling: true });

const obj = {};



const startGame = async (chatId) => {
    await bot.sendMessage(
        chatId,
        "Kompyuter 0 dan 9 gacha son o'yladi, shuni topishga xarakar qiling."
    );
    const randomNumber = Math.floor(Math.random() * 10);
    obj[chatId] = randomNumber;
    await bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions);
}

const bootstap = () => {
    bot.setMyCommands([
        {
            command: "/start",
            description: "Bot haqida ma'lumot!",
        },
        {
            command: "/info",
            description: "O'zingiz haqingizda ma'lumot!",
        },
        {
            command: "/game",
            description: "O'yin o'ynash!",
        },
        {
            command: "/help",
            description: "Yordam olish!",
        },
    ]);

    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            return bot.sendMessage(
                chatId,
                `Assalamu Alaykum xurmatli ${msg.from.first_name} sizni kinolar botimizda ko'rib turdanimizdan juda xursandmiz!`
            );
        }
        if (text === "/info") {
            await bot.sendSticker(
                chatId,
                "https://media.stickerswiki.app/legogamer/6673349.160.webp"
            );
            return bot.sendMessage(
                chatId,
                `Sizning telegram username bu: @${msg.from?.username}, sizning ismingiz esa ${msg.from?.first_name} ${msg.from?.last_name}`
            );
        }

        if (text === "/help") {
            return bot.sendMessage(
                chatId,
                `/start - hammasini boshidan boshlash!
/info - ma'lumot olish uchun!`
            );
        }

        if (text === "/game") {
            return startGame(chatId)
        }

        bot.sendMessage(chatId, "Uzur men sizning gapingizga tushunmayapman! ):");
    });

    bot.on("callback_query", (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId)
        }

        if (data == obj[chatId]) {
            return bot.sendMessage(
                chatId,
                `Tabriklaymiz siz to'g'ri javob berdingiz, kompyuret ${obj[chatId]} sonni tanlagan edi!`, aginOptions
            );
        } else {
            bot.sendMessage(
                chatId,
                `Siz noto'g'ri son tanladingiz tanlagan soningiz: ${data}, komyuter ${obj[chatId]} sonni tanlagan edi `, aginOptions
            );
        }
    });
};
bootstap();
