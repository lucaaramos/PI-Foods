import React from "react";
import {Link} from 'react-router-dom'
import './landingPage.css'
export default function LandingPage(){
    return(
        // <div className="div">
        //     <h1>Bienvenidos a mi Pagina</h1>
        //     <Link to='/home'>
        //         <button className="button3">
        //             Ingresar
        //         </button>
        //     </Link>


        // </div>
        <div className='divLandingPage'>
        <div className='divLandingContain'>
          <div className='divLandingH1'><h1>Bienvenidos!</h1></div>
          <div><Link to='/home'><button className="button7">Ingresar</button></Link></div>
        </div>
      </div>

    )

}