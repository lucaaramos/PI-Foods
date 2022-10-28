import  {ADD_FAVORITE, DETAILS, DETAILS_FOOD, FILTER_BY_DIETS, GET_DIETS, GET_FOOD, GET_NAME_QUERY, ORDER_BY_NAME, ORDER_BY_REPICE_CREATE, ORDER_BY_SCORE, REMOVE_FAVORITE,POST_RECIPE, RESET_FOOD} from '../actions/index'

const inicialState = {
    foods:[], // todas las comidas
    diets:[], //las dietas
    allFoods:[],  //modificar el orden   
    details:[], //detalle de alguna comida
    
}
export default function rootReducer(state = inicialState, action){
    switch(action.type){
        case GET_FOOD:
            return{
                ...state,
                foods: action.payload,
                allFoods: action.payload
            }
        case RESET_FOOD:
            let totalFood = action.payload
            return{
                ...state,
                allFoods: totalFood
            }
        case GET_NAME_QUERY:
            return{
                ...state,
                allFoods: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case POST_RECIPE:{
            return{
                ...state,
            }
        }
        case FILTER_BY_DIETS:
            const food_diets = state.allFoods
            let foodFilter = []
            if(action.payload === 'All') foodFilter = state.foods
            else{
                for(let i=0; i<food_diets.length; i++){
                    let find = food_diets[i].diets.find(e=>e === action.payload)
                    if(find) foodFilter.push(food_diets[i])
                }
            } 
            return{
                ...state,
                allFoods: foodFilter
            }
        case ORDER_BY_NAME:
            let food = state.allFoods
            let foodName = []
            if(action.payload === 'All'){
                foodName = state.foods
            }
            foodName = food.sort((a,b) => {
                const titleA = a.title.toLowerCase()
                const titleB = b.title.toLowerCase()
                if(action.payload === 'ASCENDENTE'){
                    if(titleA<titleB) return -1
                    if(titleB<titleA) return 1
                    return 0
                }
                if(action.payload === 'DESCENDENTE'){
                    if(titleA<titleB) return 1
                    if(titleB<titleA) return -1
                    return 0
                }
            })
            return{
                ...state,
                allFoods: foodName
            }
        
        case ORDER_BY_SCORE:
            let score = state.allFoods
            if(action.payload === 'All'){
                score = state.foods
            }
            score = score.sort((a,b) => {
                const scoreA = a.healthScore
                const scoreB = b.healthScore

                if(action.payload === 'ASCENDENTE'){
                    return scoreA - scoreB
                }if(action.payload === 'DESCENDENTE'){
                    return scoreB - scoreA
                }
            })
            return{
                ...state,
                allFoods: score
            }
        case ORDER_BY_REPICE_CREATE:
            let recipes = state.allFoods;
            if(action.payload === 'CREATE'){
                recipes = recipes.filter(el =>typeof(el.id) === 'string')
            }else if(action.payload === 'All'){
                recipes = state.foods
            }
            return{
                ...state,
                allFoods: recipes
            }
        case DETAILS:
            let detail = action.payload
            return{
                ...state,
                details:detail
            }
        case ADD_FAVORITE:
            let recipe = state.foods
            let fav = recipe.filter(el => el.id === action.payload)
            let allFavs = state.favorites
            allFavs.push(fav[0])
            console.log(allFavs)
            return{
                ...state,
                favorites: allFavs
            }
        case REMOVE_FAVORITE:
            let removeFavorite = state.favorites
            let favo = removeFavorite.filter(el=>el.id!==action.payload)
            console.log(favo)
            return{
                ...state,
                favorites: favo
            }
        case DETAILS_FOOD:
            return{
                ...state,
                details:[]
            }
        
        default: return state
    }
}

