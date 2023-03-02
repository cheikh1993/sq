const db = require("../db")


//==============Get favories post================//
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
//==========Add a favorie post===========//
const addFavoriPost = (req, res) => {

const query = "SELECT * FROM favorie WHERE pid = ? AND uid = ?"
db.query(query,[req.body.pid, req.body.uid], (err, data) => {
  if(err) return res.status(501).json(err)
  if(data.length !== 0) return res.status(402).json("Le post a ete deja ajoute aux favories")
  const q = "INSERT INTO favorie (`uid`, `pid`) VALUE (?,?)"
    db.query(q,[req.body.uid, req.body.pid], (err, data) => {
      if(err) return res.status(402).json(err)
      
      res.status(200).json("Post a ete joute avec success dans vos favories")
    })
  
  })
}


module.exports = { getFavoriePost, addFavoriPost }