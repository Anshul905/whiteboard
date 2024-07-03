import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    elements : [] ,
    
})

export default boardContext;