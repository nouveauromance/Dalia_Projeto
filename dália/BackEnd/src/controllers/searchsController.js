const searchModel = require("../models/searchModel")

const getAll = async (req, res) => {
    const search = await searchModel.getAll();

    return res.status(200).json(search);
};

module.exports = {
    getAll
};