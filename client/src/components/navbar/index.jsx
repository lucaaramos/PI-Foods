import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameQuery } from "../../redux/actions";
import './searchBar.css'
export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [input , setInput] = useState() //estado local


    function handleInput(e){
        e.preventDefault()
        setInput(e.target.value)
        console.log(input)
    }

    function handleSubmit(e){
        e.preventDefault();
        setInput(e.target.value)
        dispatch(getNameQuery(input))
        setCurrentPage(1)
    }
    // useEffect(()=>{
    //     dispatch(getNameQuery(input))
    // },[])

    return (

    <div>
            <input 
            className="input"
            type="text"
            value={input} 
            placeholder="Buscar..." 
            onChange={(e) => handleInput(e)}
            />
                <div>
                    <button className="button2" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
                </div>
    </div>
    )
}


  


