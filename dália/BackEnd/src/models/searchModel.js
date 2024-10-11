const connection = require("./connection");

const getAll = async() => {
    const searchs = await connection.execute("SELECT * FROM pesquisas");
    return searchs[0];
};

module.exports = {
    getAll
};