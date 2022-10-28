const {Router} = require('express')
const router = Router();
const {Diet} = require('../db')

router.get('/', async(req,res) => {
    try{
        let diets = await Diet.findAll()
        res.status(200).json(diets)
    }catch(err){
        res.status(404).send(err)
    }
})


module.exports = router;