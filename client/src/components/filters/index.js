import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByDiets, filterRecipeCreate, getDiets, orderByName, orderByScore} from '../../redux/actions/index'
import './filters.css'

export default function Filters({setCurrentPage ,setOption}){
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    function handleOrderByName(e){
        e.preventDefault();
        e.target.value === 'All'
        ? dispatch(orderByName) && setOption(`ABC${e.target.value}`)
        : dispatch(orderByName(e.target.value));
        setOption(`ABC ${e.target.value}`);
        setCurrentPage(1)
    }

    function handleOrderByScore(e){
        e.preventDefault()
        dispatch(orderByScore(e.target.value))
        setOption(e.target.value)
    }
    function handleOption(e){
        e.preventDefault()
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1)
        setOption(e.target.value)
    }
    function handleRecipeCreate(e){
        dispatch(filterRecipeCreate(e.target.value))
        setCurrentPage(1)
        setOption(e.target.value)
    }

    return(
        <div>
        
        <div>

        
        <select className='select' onChange={(e)=>handleOption(e)}>
          <option value='All'>All</option>
          {
            diets?.map(d=><option key={d.id} value={d.name} >{d.name}</option>)
          }
        </select>
{/* ------------------------order Name------------------------- */}
        
        <select className='select' onChange={(e)=>handleOrderByName(e)}>
          <option value='All'>Orden</option>
          <option value='ASCENDENTE'>A-Z</option>
          <option value='DESCENDENTE'>Z-A</option>
        </select>
{/* ------------------------order Score------------------------- */}
        
      <select className='select' onChange={(e)=>handleOrderByScore(e)}>
        <option value='All'>Puntaje</option>
        <option value='ASCENDENTE'>Min-Score</option>
        <option value='DESCENDENTE'>Max-Score</option>
      </select>
{/* ------------------------order recipe create------------------------- */}
        <select className='select' onChange={(e)=>handleRecipeCreate(e)}>
          <option value='All'>All</option>
          <option value='CREATE'>Recipe Create</option>
        </select>
        </div>
        
      </div>
    
    )
    
}