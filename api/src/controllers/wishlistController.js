const wishlistRepository = require('../repository/wishlistRepository')

exports.list = async function (req, res) {
    try {
        let wishlist = await wishlistRepository.findAll()
        res.json(wishlist)
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.update = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

exports.delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

