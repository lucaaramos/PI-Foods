import React from "react";
import './card.css'


export default function Card({id, title, img, diets, healthScore}) {
    
    return(
        <div className="conteiner">
                <div className="card">
                <img src={img} alt='img not found' width={200} height={200}/>
                    <h1>{title}</h1>
                    <h3 className="h3">{diets + ' '}</h3>
                    <h3 className="h3">{healthScore}</h3>
                    
                </div>
            </div>
        
    )



}