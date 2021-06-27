module.exports = (req, res, next) => {
    if (req.cookies.user == undefined) {
        res.redirect('/')
    }
    next()
}