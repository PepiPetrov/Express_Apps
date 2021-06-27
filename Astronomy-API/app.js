const app = require('./config/express')
const mongoose = require('./mongoose')
const token = require('./token')
const authRoutes = require('./routes/authRoutes')
const objectRoutes = require('./routes/objectRoutes')


const port = 3000
authRoutes(app, mongoose, token)
objectRoutes(app, mongoose, token)

app.listen(port, () => {
    console.log(port)
})