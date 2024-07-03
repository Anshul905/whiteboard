import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    toolActionType : "" ,
    elements : [] ,
    changeToolHandler : () => {} ,
    boardMouseDownHandler : () => {} ,
    boardMouseMoveHandler : () => {} ,
})

export default boardContext;