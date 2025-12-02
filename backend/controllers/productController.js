import Product from "../models/productModel.js";

// GET all products
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// GET one product
export const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ message: "Produit introuvable" });

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// POST create product (Admin)
export const createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: "Erreur création", error: err.message });
    }
};

// PUT update product
export const updateProduct = async(req, res) => {
    try {
        const exists = await Product.findById(req.params.id);

        if (!exists)
            return res.status(404).json({ message: "Produit introuvable" });

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: "Erreur mise à jour", error: err.message });
    }
};

// DELETE product
export const deleteProduct = async(req, res) => {
    try {
        const exists = await Product.findById(req.params.id);

        if (!exists)
            return res.status(404).json({ message: "Produit introuvable" });

        await exists.deleteOne();

        res.status(200).json({ message: "Produit supprimé" });
    } catch (err) {
        res.status(400).json({ message: "Erreur suppression", error: err.message });
    }
};

// GET product statistics

export const getProductsNumber = async(req, res) => {
    try {
        const productsNumber = await Product.countDocuments();
        res.json({ productsNumber });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};