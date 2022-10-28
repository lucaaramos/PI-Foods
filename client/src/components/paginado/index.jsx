import React from "react";
import './paginado.css'
export default function Paginado({foodsPerPage, allFoods, paginado}){
    const pageNumber = []

    for(let i=1; i<= Math.ceil(allFoods/foodsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav className="headerPaginado">
        <div className="divPaginado">

            <ul>
                {pageNumber && pageNumber.map((number) => {
                    return(
                        <li key={number}>
                            <button className="bottonn" onClick={() => paginado(number)}>
                                {number}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
        </nav>
    )
}