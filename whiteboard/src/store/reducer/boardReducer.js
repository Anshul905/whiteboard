import { TOOL_ITEMS , BOARD_ACTIONS } from "../../constants";

import rough from "roughjs/bin/rough"
const gen = rough.generator();

const boardReducer = ( state , action ) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:
            return {
                ...state ,
                activeToolItem : action.payload.tool_item , //updating active tool 
            }
        case BOARD_ACTIONS.DRAW_DOWN:
            const { clientX , clientY } = action.payload ; 
            const newEle = {
                id : state.elements.length ,
                x1 : clientX ,
                y1 : clientY ,
                x2 : clientX ,
                y2 : clientY ,
                roughEle : gen.line(clientX,clientY,clientX,clientY),
            }
            return {
                ...state ,
                elements : [ ...state.elements , newEle ] , //appending new element 
            }
        default:
            return state;
    }
}

export default boardReducer ;
