import { useContext } from "react"
import { ProfessionalContext } from "../contexts/ProfessionalContext"


export const useProfessionalContext = () => {
    const context = useContext(ProfessionalContext);

    if (!context) {
        console.log("useProfessionalCOntext can only be used insidi the ProfessionalContextProvider");
    }

    return context;
}