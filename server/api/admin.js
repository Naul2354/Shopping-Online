const express = require('express');
const router = express.Router();
// utils
const JwtUtil = require('../utils/JwtUtil');
// daos
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require ('../models/ProductDAO');
// login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username,password); //find Username and password in db
    if (admin) {
      const token = JwtUtil.genToken(); 
      res.json({ success: true, message: 'Authentication successful', token: token }); //display token if user and pass are valid
    } else {
      res.json({ success: false, message: 'Incorrect username or password' }); //else display error
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' }); //display error if not supply username and password or 1 in 2
  }
});
//router get token
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token }); //use POSTMAN to check valid token
});
//Router Categories
//GET categories (list)
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});
//POST category (create)
router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const category = { name: name };
  const result = await CategoryDAO.insert(category);
  res.json(result);
});
//PUT category (update)
router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const category = { _id: _id, name: name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});
//DELETE category (delete)
router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});
//Router Products
//GET products (list) 
router.get('/products',JwtUtil.checkToken,async function(req,res){
  //pagination
  const noProducts = await ProductDAO.selectByCount();
  const sizePage = 4 ;
  const noPages = Math.ceil(noProducts / sizePage);
  var curPage = 1;
  if (req.query.page) curPage = parseInt(req.query.page);
  const skip = (curPage - 1 ) * sizePage;
  const products = await ProductDAO.selectBySkipLimit(skip,sizePage);
  //return
  const result = { products:products, noPages:noPages,curPage:curPage};
  res.json(result);
})
//POST product (create)
router.post('/products', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const price = req.body.price;
  const cid = req.body.category;
  const image = req.body.image;
  const now = new Date().getTime(); // milliseconds
  const category = await CategoryDAO.selectByID(cid);
  const product = { name: name, price: price, image: image, cdate: now, category: category };
  const result = await ProductDAO.insert(product);
  res.json(result);
});
//PUT product (update)
router.put('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  const cid = req.body.category;
  const image = req.body.image;
  const now = new Date().getTime(); // milliseconds
  const category = await CategoryDAO.selectByID(cid);
  const product = { _id: _id, name: name, price: price, image: image, cdate: now, category: category };
  const result = await ProductDAO.update(product);
  res.json(result);
});
//Delete product (delete)
router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await ProductDAO.delete(_id);
  res.json(result);
});
module.exports = router;