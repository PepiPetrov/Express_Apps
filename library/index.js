let express = require('express');
let handlebars = require('express-handlebars');
let fs = require('fs');
let app = express();
let port = 3000;
app.engine('hbs', handlebars());
app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.render('home', { layout: false });
});
app.get('/catalog', (req, res) => {
    let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
    res.render('catalog', { layout: false, products });
});
app.get('/catalog/:serial_number', (req, res) => {
    let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
    let sn = req.params.serial_number;
    let product = products.find(x => x.sn == sn);
    if (product !== undefined) {
        res.render('details', { layout: false, ...product });
    } else {
        res.status(404);
        res.render('404', { layout: false });
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});