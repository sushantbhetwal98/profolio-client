import { createContext, useReducer } from "react";

export const ProfessionalContext = createContext()

export const professionalReducer = (state, action) => {

    switch (action.type) {
        case 'SET_PROFESSIONALS':
            return { professionals: action.payload }

        case 'CREATE_PROFESSIONALS':
            return {
                professionals: [action.payload, ...state.professionals]
            }

        case 'DELETE_PROFESSIONALS':
            return {
                professionals: state.professionals.filter((p) => p._id !== action.payload._id)
            }

        case 'UPDATE_PROFESSIONALS':
            return {
                professionals: state.professionals.map((p) =>
                    p._id === action.payload._id ? { ...p, ...action.payload } : p
                )
            }

        default:
            return state
    }

}

export const ProfessionalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(professionalReducer, {
        professionals: null
    })

    return (
        <ProfessionalContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProfessionalContext.Provider>
    )


}