import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    toolActionType : "" ,
    elements : [] ,
    changeToolHandler : () => {} ,
    boardMouseDownHandler : () => {} ,
    boardMouseMoveHandler : () => {} ,
    boardMouseUpHandler : () => {} ,
})

export default boardContext;