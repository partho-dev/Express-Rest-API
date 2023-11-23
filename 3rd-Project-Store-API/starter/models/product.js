const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Product Name must be provided']
    },
    price:{
        type: Number,
        required:[true, 'Product Price must be provided']
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
        // enum:['IKEA', 'LIDDY', 'CARESSA', 'MARCOS']
    }

})

module.exports = mongoose.model('product', productSchema)