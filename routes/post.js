const express = require("express")
const db  = require("../db")

const router = express.Router   ()

router.post("/add", (req, res) => {
   
    const q = " INSERT INTO post (`title`,`content`, `categorie`, `Date`,`uid`) VALUE (?, ?, ?, ?,?)"
    
    db.query(q,[
        req.body.title,
        req.body.content,
        req.body.categorie,
        req.body.date,
        req.body.uid,
        
    ],(err, data) => {
        if(err) return res.status(500).json(err)
        
        res.status(201).json("Le poste a ete enregistre avec success")
    })
    
})
router.get("/cat",(req, res) => {
        const q = "SELECT DISTINCT categorie categorie FROM post"
db.query(q,[],(err, data) => {
    if(err) return res.status(501).json(err)
    res.status(201).json(data)
})
})

    // Get post per user

    router.get("/uid", (req, res) => {
            const q = "SELECT * FROM post p INNER JOIN user u ON P.uid = u._id where uid= ?"
    db.query(q,[
        req.body.uid
    ], (err, data) => {
        if(err) return res.status(500).json(err)
        res.status(201).json(data)
    })

    })
    router.get("/", (req,res) => {
        const q =  req.query.categorie ?
        "SELECT DISTINCT * FROM post p INNER JOIN user u ON P.uid = u._id where categorie = ?" :
        "SELECT DISTINCT * FROM post p INNER JOIN user u ON P.uid = u._id"
        db.query(q,[
            req.query.categorie
        ],(err, data) => {

            if(err) return res.status(500).json(err)
            res.status(200).json(data)
        })  
    })
    router.get("/:id",(req, res) => {
            const q = "SELECT title, content, categorie,email FROM post p INNER JOIN user u ON P.uid = u._id where id=?"
    db.query(q,[req.params.id],(err, data) => {
        if(err) return res.status(501).json(err)
        res.status(201).json(data)
    })
    })
    router.get("/uid/:id",(req, res) => {
            const q = "SELECT DISTINCT  categorie FROM post  where uid=?"
    db.query(q,[req.params.id],(err, data) => {
        if(err) return res.status(501).json(err)
        res.status(201).json(data)
    })
    })
    module.exports = router