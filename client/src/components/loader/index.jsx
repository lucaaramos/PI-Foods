import React from 'react'
import './loader.css'
export const Loader = () => {
  return (
    <div className='center' style={{color:'#fff'}}>
        <div className="ring">

        </div>
        <span className='spanLoader'>loading...</span>
    </div>
  )
}