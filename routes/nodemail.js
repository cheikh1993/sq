const router = require("express").Router()
const nodemail = require("nodemailer")
const smtptransport = require("nodemailer-smtp-transport")

router.post("/", async (req, res, next)  => {   

let transport = await nodemail.createTransport(smtptransport({
    service: "gmail",
    host: "mtp.gmail.com",
    auth: {
      user: "cheikhfaye150193d@gmail.com", // generated ethereal user
      pass: "fvnrynywtvlsvrsx"  //
    
    },
}))
let mailOptions =  {
  from:   req.body.sender, //'cheikhfaye150193d@gmail.com',
  to:    req.body.receiver,//'fayedev93@gmail.com',
  subject:req.body.subject,
  text:  req.body.text,
  html: "<h1>teste de la balise html</h1>",
  attachments: [
        {  
           patch: "../text.txt"
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


  

})



module.exports = router;