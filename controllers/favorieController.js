const db = require("../db")

const getFavoriePost = (req, res) => {
  const q = "SELECT id_post,title,content,categorie,likes,img,date,name,username,email FROM favorie INNER JOIN post ON favorie.id=post.id_post INNER JOIN user ON favorie.id=user.id WHERE favorie.uid=?"
  try {
    const values = [
      req.query.userId
    ]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.length === 0) return res.status(401).json("Vos favories sont vides")
      res.status(200).json(data)
    })
  } catch (error) {
    res.status(501).json(error)
  }
}


module.exports = { getFavoriePost }