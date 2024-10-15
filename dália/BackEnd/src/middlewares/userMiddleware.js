const validateBody = (req, res, next) =>{
    const { body } = req;

    if(body.nome === undefined){
        return res.status(400).json({ message: "The field Name is required" })
    }
    if(body.nome === ""){
        return res.status(400).json({ message: "The name cannot be empty" })
    }

    next();
};



module.exports ={
    validateBody,
}