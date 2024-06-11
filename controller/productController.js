const Products = require('../model/Products');


const saveProducts = async (req, res) => {
    try {

        const pre_product = await Products.findOne({sku: req.body.sku});

        if(pre_product) {
            return res.status(400).json({message: 'This one is already added.'});
        }

        const product = new Products({
            sku: req.body.sku,
            quantity: req.body.quantity,
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            isFavourite : req.body.isFavourite
        });

        const savedItem = await product.save();
        if(savedItem) {
            res.status(200).json({message: 'Product added successful!'});
        }
    } catch (e) {/*JSON*/
        res.status(500).json({error: e});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const all_products = await Products.find();

        if (all_products.length > 0) {
             res.status(200).json(
                {
                    message: 'Success',
                    data : all_products
                });
        }else {
             res.status(200).json(
                {
                    message: 'No data',
                    data : all_products
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

const deleteProduct = async (req, res) => {
    try {
        Products.deleteOne({sku: req.headers.sku}).then(async result => {

            if (result.deletedCount > 0) {
                const all_products = await Products.find();
                return res.status(200).json({
                    message: 'Product Deleted Successfully!',
                    data : all_products
                });
            }
            if (result.deletedCount === 0) {
                return res.status(400).json({message: 'Try Again!'});
            }

        }).catch(error => {
            res.status(500).json({error: error});
        })

    } catch (e) {
        return res.status(500).json({error: e});
    }
}

const editProduct = async (req, res) => {
    try {
        const id = req.headers.id;

        const pre_product = await Products.findOne({sku: req.body.sku});

        if(pre_product) {
            return res.status(200).json({message: 'This one is already added.'});
        }
        const is_available = await Products.findOne({_id: req.headers.id});

        if(!is_available){
            return res.status(200).json({message: 'Please check your id.'});
        }

        await Products.updateOne({_id: req.headers.id}, {
            $set: {
                sku: req.body.sku,
                quantity: req.body.quantity,
                name: req.body.name,
                description: req.body.description,
                images: req.body.images,
                isFavourite : 0
            }
        }).then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).json({message: 'Data updated successfully'});
            } else {
                res.status(500).json({message: 'Try Again!'});
            }

        }).catch(error => {
            console.log(error);
            res.status(500).json({error: error});
        })

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

const getProductDetails = async (req, res) => {
    try {

        await Products.findOne({_id: req.headers.id})
            .then(result => {
                if (result) {
                    res.status(200).json(
                        {
                            message: 'Success',
                            data : result
                        });
                } else {
                    res.status(500).json({message: 'Try Again!'});
                }

            }).catch(error => {
                console.log(error);
                res.status(500).json({error: error});
            });

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

const markAsFavourite = async (req, res) => {
    try {
        // Check the data is available
        const is_available = await Products.findOne({_id: req.headers.id});

        if(!is_available){
            return res.status(200).json({message: 'Please check your id.'});
        }

        // Set favourite to "1", default value is "0"
        await Products.updateOne({_id: req.headers.id}, {
            $set: {
                isFavourite : 1
            }
        }).then(async result => {
            const all_products = await Products.find();

            if (result.modifiedCount > 0) {
                res.status(200).json(
                    {
                        message: 'Data updated successfully',
                        data: all_products
                    });
            } else {
                res.status(500).json(
                    {
                        message: 'Try Again!',
                        data: ""
                    });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({error: error});
        })

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

module.exports = {
    saveProducts,
    getAllProducts,
    deleteProduct,
    editProduct,
    getProductDetails,
    markAsFavourite
}
