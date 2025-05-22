const categoryModel = require("../models/categoryModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.findAll();

    if (!categories || categories.length === 0)
      res.status(401).json({ message: "Brak kategorii" });

    res.status(200).json({ categories });
  } catch (err) {
    console.error("Błąd pobierania kategorii:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

module.exports = {
  getAllCategories,
};
