const TelegramBot = require('node-telegram-bot-api')

const token = '6614822291:AAGrO7yJkUMnrw98q0MLgUwtpUsHg8mPUaA'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        return bot.sendMessage(chatId, 'Assalomu alaykum siz kinolar botiga xush kelibsiz?')
    }

    if (text === '/info') {
        return bot.sendMessage(chatId, "Siz ma'lumot berishim kerakmi?")
    }

})