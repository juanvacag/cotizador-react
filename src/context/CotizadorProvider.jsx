import { useState, createContext } from 'react'
import {obtenerDiferenciaYear, calcularMarca, calcularPlan} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
            marca: '',
            year: '',
            plan: ''
    })

    const [error, setError] = useState('')

    const handleChangeDatos = e => {        
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })

    }

    const cotizarSeguro = () => {
        //console.log('COTIZANDO...')

        //BASE DEL SEGURO
        let resultado = 2000

        //DIFERENCIA DE AÑOS
        const diferencia = obtenerDiferenciaYear(datos.year)

        //-3% POR CADA AÑO
        resultado -= ((diferencia * 3) * resultado) / 100
        
        //EUROPEO 30%
        //AMERICANO 15%
        //ASIATICO 5%
        resultado *= calcularMarca(datos.marca)
        

        //BASICO 20%
        //COMPLETO 50%
        resultado *=calcularPlan(datos.plan).toFixed(2)
    }
        //FORMATEAR DINERO


    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro
            }}
        >
                {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext