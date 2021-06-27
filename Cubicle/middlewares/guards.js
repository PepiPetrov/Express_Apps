function isAuth() {
    return (req, res, next) => {
        if (req.user != undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/products');
        }
    };
}

function isOwner() {
    return async (req, res, next) => {
        if (await req.storage.getById(req.params.id) && req.user && ((await req.storage.getById(req.params.id)).authorId == req.user._id)) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
};