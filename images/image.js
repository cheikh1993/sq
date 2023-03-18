const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("/images")
})


module.exports = router