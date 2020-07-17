import React, { createContext, useReducer } from 'react'
import countryReducer from './countryReducer'

// Create the initial state


const initialState = {
    country: "Global"
}

// Create the Global context

export const GlobalContext = createContext(initialState)

// Create a provider for the Global Context

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(countryReducer, initialState);

    // Actions for country



    function setCountry(country) {
        dispatch({
            type:'SET',
            payload:country
        })
    }

    return (
        <GlobalContext.Provider value={
            {
                country: state.country,
                setCountry
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}