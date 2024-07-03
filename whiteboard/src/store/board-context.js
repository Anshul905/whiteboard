import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    elements : [] ,
    changeToolHandler : () => {} ,
    boardMouseDownHandler : () => {} ,
    boardMouseMoveHandler : () => {} ,
})

export default boardContext;