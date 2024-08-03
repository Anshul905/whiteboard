import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "" , 
    toolActionType : "" ,
    elements : [] ,
    changeToolHandler : () => {} ,
    boardMouseDownHandler : () => {} ,
    boardMouseMoveHandler : () => {} ,
    boardMouseUpHandler : () => {} ,
    // textAreaBlurHandler : () => {},
})

export default boardContext;