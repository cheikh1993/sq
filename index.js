const express = require("express")
const UserRoute = require("./routes/user")
const routerPost = require("./routes/post")
const routernodemail = require("./routes/nodemail")
const nodemail = require("nodemailer")
require("./db")
let age = "1990-01-15"
const user={
    name: "cheikh faye",
    birthday: new Date(age),
    get age(){
        return Math.floor((Date.now() - this.birthday)/
        (1000 * 60 * 60 * 24 * 365)
        )
    }
}
console.log(user.age);



const cors = require("cors")
const { patch } = require("./routes/user")
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
app.get("*", (req,res) => {
    res.sendFile(patch.join(__dirname,"index.html"))
})
app.listen(process.env.PORT_NUMBER || 3000, () => {
    console.log(`Server run on port ${process.env.PORT_NUMBER}`);
})