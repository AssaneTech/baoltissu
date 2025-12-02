export const getCategories = (req, res) => {
    res.json({ message: "Liste des catégories" });
};

export const createCategory = (req, res) => {
    res.json({ message: "Catégorie créée" });
};

export const deleteCategory = (req, res) => {
    res.json({ message: `Catégorie ${req.params.id} supprimée` });
};