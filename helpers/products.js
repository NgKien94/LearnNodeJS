
module.exports.priceNewProducts =  (products) =>{
    const newProducts = products.map( (item)=>{
        item.priceNew = parseInt((item.price - item.price * ( item.discountPercentage/100)))
        return item;
    })
    return newProducts;
}



module.exports.priceNewProduct =  (product) =>{
    const priceNew = parseInt((product.price - product.price * (product.discountPercentage/100)))
    return priceNew
}