import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { details, vacio } from '../../redux/actions'
import './details.css'
import { Loader } from '../loader'

export default function Details() {
    const detail = useSelector(d=>d.details)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const { id }= useParams()
    // useEffect(()=>{
    //     dispatch(details(id))
    //     return()=>{
    //         dispatch(details(id))
    //     }
    // },[dispatch,details])



    let summary = detail.map(e=>e.summary?.replace(/<[^>]*>/g,''))
    
    useEffect(()=>{
        if(!detail.length){setLoading(true)
        setTimeout(()=>{
          setLoading(false)
        },2000)}
        dispatch(details(id))
        return()=>{
            dispatch(vacio())
        }
        },[dispatch,details])
    return (
        <div className='divDetail'>
        <div>
        <header className='headerDetail'>
        <div>{detail?.map(e=><h1>{e.title}</h1>)}</div>
        </header>
        <div className='divDetails'>
        {loading && <Loader/>}
            {
                detail?.map(e=><div key={e.id}>
                    <div className='divDetailFlex'>
                            <img src={e.image} />
                        <div className='divDetailInfo '>
                            <div className='divDetailBox'><p>Diet</p>
                                <ul> {
                                    e.diets?.[0]?.name 
                                    ?
                                    e.diets.map(e=><li>{e.name}</li>) 
                                    : 
                                    e.diets.map(e=><li>{e}</li>)
                                } </ul>
                            </div>
                            <div className='divDetailBox detailHeigth'>
                                <p>Summary </p>
                                <p>{summary}</p>
                            </div>
                            <div className='divDetailBox detailHeigth'>
                                <p>Health Score: <b>{e.healthScore}</b></p>
                            </div>
                            <div className='detailHeigth'>
                                <p>Steps</p>
                                <section>
                                    {
                                        e.analyzedInstructions?.map(pa=><p>{pa.number}<br/>{pa.step}</p>) ?? <p>{e.analyzedInstructions[0]}</p>
                                    }
                                </section>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        <Link to={'/Home'}><button className='button3'>Home</button></Link>
        </div>
            
        
        </div>
    </div>
    )
}

