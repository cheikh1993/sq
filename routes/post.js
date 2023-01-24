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
            const q = "SELECT * FROM post p INNER JOIN user u ON P.uid = u.id where uid= ?"
    db.query(q,[
        req.body.uid
    ], (err, data) => {
        if(err) return res.status(500).json(err)
        res.status(201).json(data)
    })

    })
    router.get("/", (req,res) => {
        const q =  req.query.categorie ?
        "SELECT DISTINCT id_post,title, likes, content,categorie,date,name,username,email FROM user INNER JOIN post ON user.id = post.uid where categorie = ?" :
        "SELECT DISTINCT id_post,title, likes, content,categorie,date,name,username,email FROM user INNER JOIN post ON user.id = post.uid"
        db.query(q,[
            req.query.categorie
        ],(err, data) => {

            if(err) return res.status(500).json(err)
            res.status(200).json(data)
        })  
    })
    router.get("/:id",(req, res) => {
            const q = "SELECT title, likes,content, categorie,email FROM post p INNER JOIN user u ON p.uid = u.id where id_post=?"
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

    // update Post 
    router.put("/:id", (req, res) => {
        const q = "UPDATE post SET `title`= ?,`content` =?, `categorie`=? WHERE `id_post`=? "
        const values = [req.body.title, req.body.content, req.body.categorie]
        db.query(q,[...values, req.params.id],(err, data) => {
            if(err) return res.status(500).json(err)
           return res.status(201).json("post updated")
        })
    }) 

    // add Like
    router.put("/like/:id", (req, res) => {
        const q = "UPDATE post SET `likes`=? WHERE `id_post`=?"
        const values = [req.body.likes]

        db.query(q,[...values, req.params.id], (err, data= dataInfo ) => {
            if(err) return res.status(502).json(err)
            return res.status(201).json("Like succes...")
        })
    })
    module.exports = router