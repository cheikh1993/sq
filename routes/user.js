const express = require("express")
const db = require("../db")
const router = express.Router()
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const server = require("http").createServer()
const io = require("socket.io")(server)

// Register
router.post("/register", async (req, res) => {


    const qs = " select * from user WHERE email = ?"
    db.query(qs, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        } else if (data.length !== 0) {
            res.status(501).json("CeT Email exist deja")
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            const email = req.body.email

            const randomNumber = Math.floor(Math.random() * 9000 + 1000)

            const q = "INSERT INTO user(`name`, `username`,`email`,`password`) VALUES (?)"
            const values = [
                req.body.name,
                req.body.username,  
                email,
                hash
            ]
            db.query(q, [values], (err, data) => {

                if (err) return res.status(500).json(err)

                if (data) return res.status(201).json("user created successfull")

            })

            let transport = nodemailer.createTransport(({
                service: "gmail",
                host: "mtp.gmail.com",
                auth: {
                    user: "cheikhfaye150193d@gmail.com", // generated ethereal user
                    pass: "szugtvglxzbuhwcn"  //

                },
            }))
            let mailOptions = {
                from: 'cheikhfaye150193d@gmail.com',
                to: email,//'fayedev93@gmail.com',
                subject: "test d'envoi",
                text: "merci d'avoir choisi",
                html: `merci d'avoir choisi nos services <br /> <strong> ${randomNumber}</strong> `,
                attachments: [
                    {

                        patch: "../text.pdf"
                    },
                ]

            };
            transport.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(201).json('Email sent: ' + info.response);
                }
            })

        }
    })

})
// Login
router.post("/login", async (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?"
    const email = req.body.email
    await db.query(q, [email], (err, data) => {
        if (err) { return res.status(500).json(err) }
        if (data.length === 0) return res.status(500).json("Cette ulisateur n'existe pas")
        const passwordCorect = bcrypt.compareSync(req.body.password, data[0].password)
        if (!passwordCorect) return res.status(501).json("Mot de passe ou utilisateur incorrect")
const {password, ...others} = data[0]
        res.status(201).json({others})
        let transport = nodemailer.createTransport(({
            service: "gmail",
            host: "mtp.gmail.com",
            auth: {
                user: "cheikhfaye150193d@gmail.com", // generated ethereal user
                pass: "szugtvglxzbuhwcn"  //

            },
        }))
        let mailOptions = {
            from: 'cheikhfaye150193d@gmail.com',
            to: data[0].email,//'fayedev93@gmail.com',
            subject: "test d'envoi",
            text: "merci d'avoir choisi",
            html: `l'utilisateur  <br /> <strong> ${data[0].name} s'est connecter a ${new Date()}</strong> `,
            attachments: [
                {

                    patch: "../text.pdf"
                },
            ]

        };
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(201).json('Email sent: ' + info.response);
            }
        })
        io.on("connect", (socket) => {
            console.log(data[0].id + "s'est connecte")
        })

    })
})
// Get All Users
router.get("/", (req, res) => {
    const q = "SELECT id,name,username, email FROM user"
    db.query(q, (err, data) => {
        if (err) return res.status(501).json(err)
        res.status(200).json(data)
    })

})
// Get ONE USER
router.get("/:id", (req, res) => {
    const q = "SELECT * FROM user WHERE id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(401).json("Utilisateur non trouve")
        res.status(201).json(data)
    })


})
// DELETE USER
router.delete("/:id", (req, res) => {
    const q = "DELETE FROM user WHERE id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(401).json("Utilisateur non trouve")
        res.status(201).json("Utilisateur supprime avec succes")
    })
})
// UPDATE USER
router.put("/:id", (req, res) => {
    const q = "UPDATE user SET `email`=?, `password`=? WHERE id = ?"
    db.query(q, [req.params.id, req.body.email, req.body.password], (err, data) => {
        if (err) return res.status(500).json(err)
        res.status(201).json(data)
    })
})
module.exports = router