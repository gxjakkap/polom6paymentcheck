const getDebtors = async () => {
    const res = await fetch(process.env.gslink)
    return res.body.text
}

async function sendMessage(message, channelAccessToken, replyToken) {
    const headers = { 'Authorization': `Bearer ${channelAccessToken}`, 'Content-Type': 'application/json' }
    const body = {
        replyToken: replyToken,
        messages: [message],
    }
    return fetch('https://api.line.me/v2/bot/message/reply', {body: body, headers: headers})
}

export default async function handler(req, res) {

    if (req.method !== "POST") {
        res.status(404).json({ status: 404, message: "Not Found" })
        return
    }

    const { events } = req.body

    events.forEach(async (event) => {
        if (event.type == "message"){
            if (event.message.text == "gdt"){
                const msg = await getDebtors()
                await sendMessage(msg, process.env.CAT, event.replyToken)
            }
        }
    })

    console.log(req.body)
    console.log(process.env.gslink)
    console.log(process.env.CAT)
    res.status(200).json({ status: 200, message: "OK" })
}