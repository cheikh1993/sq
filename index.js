const express = require("express")
const UserRoute = require("./routes/user")
const routerPost = require("./routes/post")
const routernodemail = require("./routes/nodemail")
const nodemail = require("nodemailer")
require("./db")


// const main = async () => {
//     let testAccount = await nodemail.createTestAccount();
//     let transport = nodemail.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false,
//         auth: {
//             user: testAccount.user,
//             pass: testAccount.pass
//         }
//     })

//     let info = await transport.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>',
//         to: "bar@example.com, baz@example.com",
//           subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//     })
//       console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemail.getTestMessageUrl(info));


// }
// main().catch(console.error)

const cors = require("cors")
const app = express()
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
    
});

app.use("/api/user", UserRoute)
app.use("/api/post", routerPost)
app.use("/api/sendmail", routernodemail)

require("dotenv").config()
