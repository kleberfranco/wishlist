const wishlistRepository = require('../repository/wishlistRepository')

exports.list = async function (req, res) {
    try {
        let wishlist = await wishlistRepository.findAll()
        res.json(wishlist)
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.listWishlist = async function (req, res) {
    try {
        const id = req.params.id
        let wishlist = await wishlistRepository.findById(id)
        res.json(wishlist)
    } catch (error) {
        res.json({message: error.message})
    }
};
exports.delete = async function (req, res, next) {
    try {
        const id = req.params.id
        await wishlistRepository.findById(id)

        await wishlistRepository.update(id, {active: 0});
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

