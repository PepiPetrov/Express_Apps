const app = require('./config/express')

app.use('/post', require('./entry/entry.router'))

app.listen(3000)