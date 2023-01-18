const express = require("express")
const db  = require("../db")
const router = express.Router()
const bcrypt = require("bcryptjs")
// Register
router.post("/register",(req, res) => {

    
    const qs = " select * from user WHERE email = ?"
    db.query(qs, [req.body.email], (err, data) => {
        if(err) {
            return res.status(500).json(err)
        } else if( data.length !== 0){
         res.status(501).json("CeT Email exist deja") 
        } else{
        const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(req.body.password, salt)

    const q = "INSERT INTO user(`name`, `username`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.username,
        req.body.email,
        hash
    ]
db.query(q, [values], (err, data) => {

    if(err) return res.status(500).json(err)
    
    if(data) return res.status(201).json("user created successfull")

})
        }
    })
   
})
// Login
router.post("/login", async (req, res) => {
    const q =  "SELECT * FROM user WHERE email = ?"
  await  db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)
        data.length === 0 && res.status(500).json("User not exist")

        const passwordCorect = bcrypt.compareSync(req.body.password, data[0].password)
        if(!passwordCorect) return res.status(501).json("Mot de passe ou utilisateur incorrect")

        res.status(201).json(data)
    })
})
// Get All Users
router.get("/", (req, res) => {
    const q = "SELECT id, email FROM user"
    db.query(q,(err, data) => {
        if(err) return res.status(501).json(err)
        res.status(200).json(data)
    })
    
})
// Get ONE USER
router.get("/:id", (req, res) => {
    const q = "SELECT * FROM user WHERE id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(401).json("Utilisateur non trouve")
        res.status(201).json(data)
    })

    
})
// DELETE USER
router.delete("/:id",(req, res) => {
    const q = "DELETE FROM user WHERE id = ?"
    db.query(q,[req.params.id], (err, data) => {
         if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(401).json("Utilisateur non trouve")
        res.status(201).json("Utilisateur supprime avec succes")
    })
})
// UPDATE USER
router.put("/:id", (req, res) => {
    const q = "UPDATE user SET `email`=?, `password`=? WHERE id = ?"
    db.query(q,[req.params.id, req.body.email, req.body.password], (err, data) => {
        if(err) return res.status(500).json(err)
        res.status(201).json(data   )
    })
})
module.exports = router