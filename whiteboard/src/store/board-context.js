import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    toolActionType : "" ,
    elements : [] ,
    history : [[]],
    index : 0 ,
    changeToolHandler : () => {} ,
    boardMouseDownHandler : () => {} ,
    boardMouseMoveHandler : () => {} ,
    boardMouseUpHandler : () => {} ,
})

export default boardContext;