const bodyParser = require('express');
let express = require('express');
let handlebars = require('express-handlebars');
let app = express();
let port = 3000;
const db = require('./db/db')

app.engine('hbs', handlebars());
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.render('home', { layout: false })
})

app.get('/catalog', (req, res) => {
    res.render('catalog', { layout: false, products: db.getAll() })
})

app.get('/catalog/:title', (req, res) => {
    const title = req.params.title
    const article = db.getOne(title)
    if (article == undefined) {
        res.render('404', { layout: false })
        return
    }
    res.render('details', { layout: false, title: article.title, content: article.content, category: article.category })
})

app.get('/delete/:title', (req, res) => {
    const title = req.params.title
    db.remove(title)
    res.redirect('/catalog')
})

app.get('/edit/:title', (req, res) => {
    const title = req.params.title
    const article = db.getOne(title)
    res.render('edit', { layout: false, old: title, title: article.title, category: article.category, content: article.content })
})

app.post('/edit/:title', (req, res) => {
    const { old, newTitle, newCategory, newContent } = req.body
    const article = { title: newTitle, category: newCategory, content: newContent }
    db.edit(old, article)
    res.redirect('/catalog/' + newTitle)
})

app.get('/create', (req, res) => {
    res.render('create', { layout: false })
})

app.post('/create', (req, res) => {
    const { title, category, content } = req.body
    const article = { title, category, content }
    db.create(article)
    res.redirect('/catalog/' + title)
})

app.get('/search', (req, res) => {
    res.render('search', { layout: false })
})

app.post('/search', (req, res) => {
    res.redirect('/search/' + req.body.title)
})

app.get('/search/:title', (req, res) => {
    const title = req.params.title
    res.render('searchResults', { layout: false, title, results: db.search(title) })
})

app.get('/search-cat', (req, res) => {
    res.render('searchCat', { layout: false })
})

app.post('/search-cat', (req, res) => {
    res.redirect('/search-cat/' + req.body.title)
})

app.get('/search-cat/:cat', (req, res) => {
    const title = req.params.cat
    res.render('catResults', { layout: false, title, results: db.searchCat(title) })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});