import { useState, createContext } from 'react'
import {obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
            marca: '',
            year: '',
            plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)


    const handleChangeDatos = e => {        
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })

    }

    const cotizarSeguro = () => {

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
        resultado *=calcularPlan(datos.plan)

        //resultado = resultado.toFixed(2)
        //console.log(resultado)

        //FORMATEAR DINERO
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
        

    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
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