const TelegramBot = require('node-telegram-bot-api')

const token = '6614822291:AAGrO7yJkUMnrw98q0MLgUwtpUsHg8mPUaA'

const bot = new TelegramBot(token, { polling: true })

bot.setMyCommands([
    {
        command: '/start', description: "Bot haqida ma'lumot!"
    },
    {
        command: '/info', description: "O'zingiz haqingizda ma'lumot!"
    },
    {
        command: '/game', description: "O'yin o'ynash!"
    },
    {
        command: '/help', description: "Yordam olish!"
    }
])

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        return bot.sendMessage(chatId, `Assalamu Alaykum xurmatli ${msg.from.first_name} sizni kinolar botimizda ko'rib turdanimizdan juda xursandmiz!`)
    }
    if (text === '/info') {
        await bot.sendSticker(
            chatId,
            'https://media.stickerswiki.app/legogamer/6673349.160.webp'
        )
        return bot.sendMessage(chatId, `Sizning telegram username bu: @${msg.from?.username}, sizning ismingiz esa ${msg.
            from?.first_name} ${msg.from?.last_name}`)
    }

    if (text === '/help') {
        return bot.sendMessage(chatId, `/start - hammasini boshidan boshlash!
/info - ma'lumot olish uchun!`)
    }

    bot.sendMessage(chatId, 'Uzur men sizning gapingizga tushunmayapman! ):')
})