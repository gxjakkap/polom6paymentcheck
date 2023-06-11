const getDebtors = async () => {
    const res = await fetch(process.env.gslink)
    return res.body.text
}

async function sendMessage(message, channelAccessToken, userId) {
    const headers = { 'Authorization': `Bearer ${channelAccessToken}`, 'Content-Type': 'application/json' }
    const body = {
        to: userId,
        messages: [message],
    }
    return axios.post('https://api.line.me/v2/bot/message/push', body, { headers: headers })
}

export default async function handler(req, res) {

    if (req.method !== "POST") {
        res.status(404).json({ status: 404, message: "Not Found" })
        return
    }

    const { events } = req.body

    events.forEach(async (event) => {
        if (event.type === "message"){
            if (event.message.text === "gdt"){
                const msg = await getDebtors()
                await sendMessage(msg, process.env.CAT, event.source.userId)
            }
        }
    })

    console.log(req.body)
    res.status(200).json({ status: 200, message: "OK" })
}