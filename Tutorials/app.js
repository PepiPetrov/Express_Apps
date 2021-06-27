const app = require('./config/express')

app.use('/auth', require('./auth/authController'))
app.use('/tutorials', require('./tutorials/tutorialsController'))


app.get('/', (req, res) => {
    res.redirect('/tutorials')
})
app.listen(3000)