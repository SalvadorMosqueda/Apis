import styled from "@emotion/styled"



export const Resultado = ({resultado}) => {
  const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,IMAGEURL,LASTUPDATE}=
  resultado 

  const Contenedor= styled.div`
  color: #FFF;
  font-family: 'Lato',sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;

`
const Texto = styled.p`
  font-size: 18px;
span{
  font-weight: 700;
}
`
const Precio =styled.p`
font-size: 24px;
span{
  font-weight: 700;
}
`
const Imagen = styled.img`
//las imagenes siempre tienen el display line por defecto
  display: block;
  width: 150px;
`

  return (
    <Contenedor>
      <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="img" />
      <div>
          <Precio>El precio es de: <span>{PRICE}</span></Precio>
          <p>Precio mas alto del dia: <span>{HIGHDAY}</span></p>
          <p>precio mas bajo del dia <span>{LOWDAY}</span></p>
          <p>variacion ultimas 24 hrs: <span>{CHANGEPCT24HOUR}</span></p>
          <p>ultima actualizacion: <span>{LASTUPDATE}</span></p>
      </div>
    </Contenedor>
      )
}
