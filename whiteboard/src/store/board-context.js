import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    elements : [] ,
    changeToolHandler : () => {} ,
    boardMouseDownHandler : () => {} ,
    
})

export default boardContext;