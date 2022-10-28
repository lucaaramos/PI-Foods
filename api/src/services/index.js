const axios = require('axios')
const {Recipe, Diet} = require ('../db.js')
const {apiKey} = process.env;


const getApiInfo = async ()=> {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    try{
        const apiInfo = apiUrl.data.results.map(e => {
            return{
                image:e.image,
                diets:e.diets || 'sin dieta',
                title:e.title,
                id:e.id,
                summary:e.summary ?? 'agregar summary',
                healthScore: e.healthScore ?? 'sin score',
                analyzedInstructions: e.analyzedInstructions[0]?.steps.map(e=>{return{number:e.number,step:e.step}}) ?? [{step:'not steps'}]
            }
        })
        return apiInfo;
    }catch(err){
        console.log(err)
    }
}

const getDbInfo = async() => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

const getAll =async ()=>{
    let apiInf = await getApiInfo()
    let dbInf = await getDbInfo()
    let total = [...apiInf,...dbInf]
    return total
}

module.exports = {getAll}