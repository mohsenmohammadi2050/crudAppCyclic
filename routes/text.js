var express = require("express")
var router = express.Router()
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let texts = db.collection('texts')


router.get("/", async (req, res) => {
    const all_text = await texts.list()
    res.send(all_text)
})


router.get("/:key", async (req, res) => {
    let email = req.params?.key
    const text = await texts.get(email)
    res.send(text)
})


router.post("/", async (req, res) => {
    const { email, content } = req.body;
    await texts.set(email, {
        user: email,
        text: content
    })

    res.end()
})


module.exports = router;