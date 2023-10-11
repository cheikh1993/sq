const db = require("../db")
//==============Get favories post================//
const getFavoriePost = (req, res) => {
  const q = "SELECT title, id_post,Likes,img,categorie,Date, content, name,username,email FROM favorie f INNER JOIN post AS p ON f.pid=p.id_post INNER JOIN user u ON f.uid=u.id WHERE f.uid=(?)"
  try {
   
    db.query(q, [req.query.uid], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.length === 0) return res.status(401).json("Vos favories sont vides")
      res.status(200).json(data)
    console.log(data);
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