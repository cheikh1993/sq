const express = require("express")
const { getFavoriePost, addFavoriPost } = require("../controllers/favorieController")

const router = express.Router()

router.get("/", getFavoriePost)

router.post("/add", addFavoriPost)
module.exports = router