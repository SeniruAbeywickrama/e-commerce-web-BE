const mongoose=require('mongoose');

// User data collection
const ProductSchema= new mongoose.Schema({
    sku:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    images:{
        type: Array,
        required:true
    },
    isFavourite:{
        type: Number,
        required:true,
        default : 0
    }
});

module.exports = mongoose.model('products', ProductSchema);
