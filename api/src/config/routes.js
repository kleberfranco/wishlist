const router = require('express').Router()
const auth = require('../auth')
const customerController = require('../controllers/customerController');
const wishlistController = require('../controllers/wishlistController');
const authController = require('../controllers/authController');

router.get('/customers', auth.authenticateToken, customerController.list)
router.post('/customer', auth.authenticateToken, customerController.create)
router.get('/customer/:id', auth.authenticateToken, customerController.listCustomer)
router.put('/customer/:id', auth.authenticateToken, customerController.update)
router.delete('/customer/:id', auth.authenticateToken, customerController.delete)
router.post('/customer/:id/wishlist', auth.authenticateToken, customerController.createWishlist)
router.get('/customer/:id/wishlist', auth.authenticateToken, customerController.listWishlist)

router.get('/wishlists', auth.authenticateToken, wishlistController.list)
router.get('/wishlist/:id', auth.authenticateToken, wishlistController.listWishlist)
router.delete('/wishlist/:id', auth.authenticateToken, wishlistController.delete)

router.post('/auth/token', authController.createToken)

module.exports = router

