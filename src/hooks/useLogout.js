import { useAuthContext } from "./useAuthContext"
import { useProfessionalContext } from './useProfessionalContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: professionalDispatch } = useProfessionalContext();

    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem('user');

        // update global authContext
        professionalDispatch({ type: 'SET_PROFESSIONALS', payload: null })
        dispatch({ type: 'LOGOUT' })

    }

    return { logout }
}