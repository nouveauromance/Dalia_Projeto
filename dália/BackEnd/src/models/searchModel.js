const connection = require("./connection");

const getAllSearch = async() => {
    const [searchs] = await connection.execute("SELECT * FROM pesquisas");
    return searchs;
};


module.exports = {
    getAllSearch,
};