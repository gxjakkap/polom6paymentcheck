import axios from 'axios'

const getDebtors = async () => {
    const res = await axios.get(process.env.gslink)
    return res.data.text
}

export default function handler(req, res) {

    if (req.method !== "POST") {
        res.status(404).json({ status: 404, message: "Not Found" })
        return
    }


    if (!req.body || !req.body.queryResult) {
        res.status(200).json({ status: 200, message: "OK" })
        return
    }

    console.log(req.body)

}