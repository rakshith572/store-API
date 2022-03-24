const express=require('express');
const route=express.Router();

const control=require('../controller/products');

route.route('/').get(control.getAllProducts);
route.route('/static').get(control.getAllProductsStatic);

module.exports=route;