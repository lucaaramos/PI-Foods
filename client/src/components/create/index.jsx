import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom'
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card";
import './create.css'


                    //Validaciones
function validate(form){
    
    const error = {}

    if(!form.title){
        error.title = 'complete este campo'
    }
    else if(!/^[a-zA-Z]{4,20}$/.test(form.title)){
        error.title = 'Debe contener letras y espacios solamente. [4-10] letras'
    }
    else if(/^\s+$/.test(form.title)){
        error.title = 'No debe estar en blanco'
    }
    else if(!form.summary){
        error.summary = 'Debe completar este campo'
    }
    else if(/^\s+$/.test(form.summary)){
        error.summary = 'No debe estar en blanco'
    }
    else if(!form.healthScore){
        error.healthScore = 'Debe completar este campo'
    }
    else if (!(/^[1-9][0-9]?$|^100$/.test(form.healthScore))) {
        error.healthScore = "Necesitamos el Score de numero de (1-100)";
    }
    else if(/^\s+$/.test(form.healthScore) ) {
        error.healthScore = "No debe estar en blanco";
    }
    return error
}
                    //Validaciones

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const [error, setError] = useState({}) 
    const [step, setStep] = useState('')
    const [inputStep, setInputStep] = useState("")
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [form,setForm] = useState({
        title:'',
        image:'',
        diets:[],
        summary:'',
        healthScore:'',
        analyzedInstructions:[]
    })
    let array = [1,2,3,4,5,6,7,8,9]
 
    function handleChange(e){
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
        console.log(form)

    }
    function handleSelect(e){
        setForm({
            ...form,
            diets: [...form.diets,e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        if(form.title && form.summary && form.healthScore){
            dispatch(postRecipe(form))
            setForm({
                title:'',
                image:'',
                diets:[],
                summary:'',
                healthScore:'',
                analyzedInstructions:[]
            })
            alert('Receta creada con exito')
            history.push('/home')
        }else{
            alert('Completo los campos requeridos como se pide')

            //useHistory es un metodo de router para dirigir a la ruta que yo le diga
        }
    }
    function handleSteps(e){
        //ingreso informacion en la ubicacion correcta por el name
        setStep({
                ...form,
                analyzedInstructions:[...form.analyzedInstructions,form.analyzedInstructions[(e.target.name)-1].step=e.target.value]
            })
    }
    const handleOptionSteps = (e)=>{
        let lengthForInput = e.target.value
        let inputs = [] //le ingreso la cantidad de valores que me trae el value para luego pasar cuanta info necesitamos en el mapeo de cada input 
        let totalSteps = [] //creamos el nuevo arreglo que lleva el total de objetos que necesitamos 
        for(let i=1; i<=lengthForInput;i++){
            inputs.push(i)
            totalSteps.push({number:i,step:''})
        }
        setForm({
            ...form,
            analyzedInstructions:totalSteps
        }) // seteo los objetos que voy a necesitar  
        setInputStep([...inputs]) // seteo la cantidad de inputs para añadir informacion de cada step
    }
    function handleDeleteDiet(e){
        setForm({
            ...form,
            diets: form.diets.filter(el => el !== e)
        })
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);
    
    
    return (
        <body className="fon">

        <div className="fondo">
        <header className="divHeader">
            <h1>Crea tu Receta</h1>
            <nav>
                <Link to={'/home'}><button className="button3">Home</button></Link> 
            </nav>
        </header>
        <div className="divPadre ">

            <form  onSubmit={(e) => handleSubmit(e)}>
                <div className="divHijo">

                    <label className="label">Title</label>
                <div>
                    <input
                    className="input"
                        type='text'
                        value={form.title}
                        name = 'title'
                        placeholder="Title"
                        onChange={(e) => handleChange(e)}
                    /> 
                    {error.title && <p>{error.title}</p>}  
                </div>
                    <label>Image</label>
                <div>
                    <input
                    className="input"
                        type='url'
                        value={form.image}
                        name = 'image' 
                        placeholder="Image"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                    <label>Diets</label>
                <div>
                    <select className="select" onChange={(e) => handleSelect(e)}>
                        <option selected>Diets</option>
                        {
                            diets?.map(d=><option defaultValue={d.name} key={d.name+Math.random()}>{d.name}</option>)
                        }
                    </select>
                    {
                    form.diets.length?
                        <ul><p>Dietas ingresadas:</p>
                                {form.diets?.map(d=><li>{d} <button className='buttonDelete' type='button' onClick={()=>{handleDeleteDiet(d)}}><b>X</b></button></li>)}
                        </ul>
                                : error.diets && <p>{error.diets}</p>    
                            }
                </div>
                    <label>Summary</label>
                <div>
                    <input
                    className="input"
                        type='text'
                        value={form.summary}
                        name = 'summary'
                        placeholder="Summary"
                        onChange={(e) => handleChange(e)}
                    />
                    {error.summary && <p>{error.summary}</p>}
                </div>
                    <label>HealthScore</label>
                <div>
                    <input
                    className="input"
                        type='number'
                        value={form.number}
                        name = 'healthScore'
                        placeholder="HealthScore"
                        onChange={(e) => handleChange(e)}
                    />
                    {error.healthScore && <p>{error.healthScore}</p>}
                </div>
                <label>Steps</label>
                <div>
                <select className="select" onChange={(e)=>handleOptionSteps(e)}>
                                    <option value="">cantidad de steps</option>
                                    {
                                        array.map(e=><option key={e} defaultValue={e}>{e}</option>)
                                    }
                                </select>
                </div>
                <footer>
                                {
                                    inputStep
                                        ?   inputStep?.map(e=><textarea name={e} placeholder={`step ${e}`} onChange={handleSteps} type='text' key={e}></textarea>)
                                        :   'puede ingresar steps'
                                    }
                </footer>                                    
                <button className="button6" type='submit'>Crear Receta</button>
                </div>
            </form>
            <div className="divv">
                <Card 
                    title={form.title || 'Un especial...'}
                    diets={form.diets?.[0]?.name ? form.diets.map(e=>e.name) : form.diets }
                    healthScore={form.healthScore || 'ingrese score' }
                    img={form.image}        
                />
                </div>
            </div>
        </div>
        
            
        </body>
        ) 
    }
    
