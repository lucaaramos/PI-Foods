import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getDiets, getFood, resetFood } from "../../redux/actions";
import {Link} from 'react-router-dom'
import Paginado from '../paginado/index'
import Card from "../card/index";
import SearchBar from '../navbar/index'
import Filters from "../filters/index";
import { Loader } from "../loader/index";
import './home.css'

export const favorite = []
const initialState = 1;
export default function Home(){
const dispatch = useDispatch()
const allFoods = useSelector((state) => state.allFoods) //hooks
const diets = useSelector((state) => state.diets)
const foods = useSelector((state) => state.foods)
const [option, setOption] = useState("")
const [currentPage, setCurrentPage] = useState(initialState) //estado inicial
// const [foodsPerPage, setFoodsPerPage] = useState(9)
const foodsPerPage = 9
const indexOfLastFood = currentPage * foodsPerPage
const indexOfFirstFood = indexOfLastFood - foodsPerPage
const currentFoods = allFoods.slice(indexOfFirstFood, indexOfLastFood)
const [loading,setLoading] = useState(false)

useEffect(()=>{
    if(!foods.length){setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)}
    dispatch(getDiets())
    dispatch(getFood())
    },[dispatch,getDiets,getFood])

const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
}

useEffect(() => {
    dispatch(getFood());
    dispatch(getDiets())
}, [dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(resetFood())
}


    return(
        <div className="div">
            <header className="divHeader">
                <div>
                    <h1>Comida</h1>
                </div>
                    <nav className="nav">
            
            <Link to={`/CreateFood`}><button className="button3">Crear Comida</button></Link>
            <a href="https://spoonacular.com/food-api" target='_blank' rel="noreferrer" ><button className="button3">Api Foods</button></a>
            </nav>
            </header>
            <div className="search-container">
                <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
                    <div>
                <Filters setCurrentPage={setCurrentPage} setOption={setOption}
                /> {console.log(currentFoods)}
                <button className="button" onClick={(e) => handleClick(e)}>
                Volver a cargar todas las comidas
                </button>
                </div>
                {loading && <Loader/>}
                <body className="body">
                {currentFoods?.map((element) => {
                    let title = element.title.split(' ')//acorto los titulos de las comidas solo por estetica
                    title = title[0] //tomo el primer elemento del arreglo para que sea string
                    title= title.replace(',','')//elimino la coma de algunos elementos 
                    return(
                    <Link to={`/detail/${element.id}`}>
                    <Card 
                        title={title}
                        diets={element.diets?.[0]?.name ? element.diets.map(e=>e.name) : element.diets}
                        healthScore={element.healthScore }
                        id={element.id }
                        img={element.img ? element.img : element.image}
                        key={element.id}      
                    />
                    </Link>         
                    )
                })} 
                </body>
                <footer className="footer">
                <Paginado
                    foodsPerPage={foodsPerPage}
                    allFoods = {allFoods.length}
                    paginado = {paginado}
                    setCurrentPage = {setCurrentPage}
                /> 
                </footer>
                        
                </div>
    )
}