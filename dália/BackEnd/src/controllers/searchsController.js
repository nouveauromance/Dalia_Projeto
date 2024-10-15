const searchModel = require("../models/searchModel")

const getAllSearch = async (req, res) => {
    const search = await searchModel.getAllSearch();

    return res.status(200).json(search);
};

module.exports = {
    getAllSearch
};