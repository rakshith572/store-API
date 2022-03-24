
const product=require('../models/product')

const getAllProductsStatic=async(req,res)=>{    
    const products = await product.find({}).sort('name');
    res.status(200).json({products,ele:products.length});
}
const getAllProducts=async(req,res)=>{
    const q=req.query;
    const objects={};
    if(q.featured){
        objects.featured = q.featured ==='true'?true:false;
    }
    if(q.company){
        objects.company={$regex:q.company, $options:'i'};
    }
    if (q.numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = q.numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        console.log(filters);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            objects[field] = { [operator]: Number(value) };
          }
        });
      }
      console.log(objects)
    var result = product.find(objects);
    if(q.sort){
        const sortList=q.sort.split(',').join(' ');
        result=result.sort(sortList);
    }else{
        result=result.sort('createdAt');
    }

    if(q.fields){
        const feildList=q.fields.split(',').join(' ');
        result=result.select(feildList);
    }
    const products=await result;
    res.status(200).json({products,len:products.length});

}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
  };