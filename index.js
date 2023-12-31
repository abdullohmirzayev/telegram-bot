const TelegramBot = require('node-telegram-bot-api')

const token = '6614822291:AAGrO7yJkUMnrw98q0MLgUwtpUsHg8mPUaA'

const bot = new TelegramBot(token, { polling: true })

const obj = {}

const gameOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: '1', callback_data: '1'
                },
                {
                    text: '2', callback_data: '2'
                }, 
                {
                    text: '3', callback_data: '3'
                },
            ],
            [
                {
                    text: '4', callback_data: '4'
                },
                {
                    text: '5', callback_data: '5'
                }, 
                {
                    text: '6', callback_data: '6'
                },
            ],
            [
                {
                    text: '7', callback_data: '7'
                },
                {
                    text: '8', callback_data: '8'
                }, 
                {
                    text: '8', callback_data: '8'
                },
            ],
            [
                {
                    text: '0', callback_data: '0'
                }
            ]
        ]
    }
}

const bootstap = () => {
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

        if (text === '/game') {
            await bot.sendMessage(chatId, "Kompyuter 0 dan 9 gacha son o'yladi, shuni topishga xarakar qiling.")
            const randomNumber = Math.floor(Math.random() * 10)
            obj[chatId] = randomNumber;
            return bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions)
        }

        bot.sendMessage(chatId, 'Uzur men sizning gapingizga tushunmayapman! ):')
    })
}
bootstap()