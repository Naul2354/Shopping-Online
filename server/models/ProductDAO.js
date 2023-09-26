require('../utils/MongooseUtil');
const Models = require('./Models');

const ProductDAO = {
    async selectByCount(){
        const query = {};
        const noProducts = await Models.Product.find(query).count().exec();
        return noProducts;

    },
    async selectBySkipLimit(skip,limit){
        const query = {};
        const products = await Models.Product.find(query).skip(skip).limit(limit).exec();
        return products;
    }
};
module.exports = ProductDAO;