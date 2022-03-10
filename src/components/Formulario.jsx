import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from '@emotion/styled'
import  UseSelectMonedas  from '../hooks/UseSelectMonedas'
import { Error } from './Error'
//abrimos llaves por que es un obejto 
import {monedas} from '../data/Monedas'

const InputSubmit = styled.input`
background-color: #9497ff;
border: none;
width: 100%;
padding:10px;
color: #fff;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 30px;

&:hover{
    background-color: #7a7dfe;
    cursor: pointer;
}

;
`
const Formulario = ({setMonedas}) => {

    const [criptos,setCriptos]=useState([])

    const [error,setError]=useState(false)

    //extraemos la funcion el hook
    //extraemos el state  y le ponemos el nombre que queramos por que son arreglos y extramos por inidce si fuera objecth
    //destroctory si debe ser asi  
    //lo que le pasamos por parametros se manda al custom hook
    const [moneda,SelectMonedas]=UseSelectMonedas("elige tu moneda",monedas)
    const [criptomoneda,SelectCriptoMonedas]=UseSelectMonedas("elige tu Criptomoneda",criptos)

    useEffect(()=>{
        const consultarApi = async()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta  = await fetch(url)
            //para que nos retorne un json
            const resultado = await respuesta.json()
            const arrayCriptos=resultado.Data.map(cripto=>{

                const objeto={
                    id:cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
             
            })
            setCriptos(arrayCriptos)

        }
        consultarApi()
    },[])

const handleSubmit = e=>{
    e.preventDefault()
    if([moneda,criptomoneda].includes('')){
        setError(true);
        return
    }
    setError(false)
    setMonedas({
        moneda,
        criptomoneda
    })

}
   
 
  return (
   <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={handleSubmit}>
            <SelectMonedas/>
            <SelectCriptoMonedas/>
            <InputSubmit type="submit" name="" value='Cotizar' id="" />
        </form>
    </>  
  )
  }
export default Formulario;
