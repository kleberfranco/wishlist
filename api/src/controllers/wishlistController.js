const wishlistRepository = require('../repository/wishlistRepository');

exports.list = async function(req, res, next) {
  try {
    const wishlists = await wishlistRepository.findAll(req.query.limit,
        req.skip);
    const itemCount = wishlists.count;
    const pageCount = Math.ceil(wishlists.count / req.query.limit);
    res.json({
      wishlists: wishlists.rows,
      pageCount,
      itemCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.listWishlist = async function(req, res, next) {
  try {
    const id = req.params.id;
    const wishlist = await wishlistRepository.findById(id);
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};
exports.delete = async function(req, res, next) {
  try {
    const id = req.params.id;
    await wishlistRepository.findById(id);

    await wishlistRepository.update(id, {active: 0});
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

