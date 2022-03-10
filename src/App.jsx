import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImagenC from './img/imagen-criptos.png'
import  Formulario  from './components/Formulario'
import { Resultado } from './components/Resultado'
import { Spinner } from './components/Spinner'

function App() {
  
  const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
  `
  //displayblock por que las imagenes por defecto vinen como inline
  const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
  `
  const Heading =styled.h1`
  font-family:'lato',san-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto 
  }
  `
//cuando es objeto no sirve esto resultado&&  <Resultado/>**//
//se usa resultado.PRICE
  const[monedas,setMonedas]=useState({})
  const[resultado,setResultado]=useState({})
  const[cargando, setCargando]=useState(false)
//si hay algo en monedas ejecuta este codigo 
  useEffect(()=>{
    //revisamos si hay algo en el objeto de monedas
    if(Object.keys(monedas).length>0){
      //extramos la info de monedas

      const cotizarCripto = async()=>{
        setCargando(true)
        setResultado({})
        const{moneda,criptomoneda} = monedas

        //url para la consultas
        //usamos template string por que  concatearemos los valores de moneda y la cripto jajja se me olvida
        //escribir xdd
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        //hacemos la peticion 
        // asi debemos crear la funcion asyncrona 
        const respuesta = await fetch(url)
         const resultado = await respuesta.json()
         setResultado(resultado.DISPLAY[criptomoneda][moneda])
         setCargando(false)
      }
      //se me olvido llamar ala funcion 
      cotizarCripto()
    }
  },[monedas])


  return (
    <Contenedor>
      <Imagen src={ImagenC} alt='imagen cripto'/>

      <div>
      <Heading>Cotiza Criptomonedas al Instante</Heading>
      <Formulario
      setMonedas={setMonedas}
      />
      {cargando && <Spinner/>}
      {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>     
    </Contenedor>
   

  )
}

export default App
