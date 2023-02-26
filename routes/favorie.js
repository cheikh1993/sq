const express = require("express")
const { getFavoriePost } = require("../controllers/favorieController")

const router = express.Router()

router.get("/", getFavoriePost)


module.exports = router