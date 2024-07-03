import { TOOL_ITEMS , BOARD_ACTIONS , TOOL_ACTION_TYPES} from "../../constants";

import rough from "roughjs/bin/rough"
const gen = rough.generator();

const boardReducer = ( state , action ) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:{
            return {
                ...state ,
                activeToolItem : action.payload.tool_item , //updating active tool 
            }
        }
        case BOARD_ACTIONS.DRAW_DOWN:{
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
                toolActionType : TOOL_ACTION_TYPES.DRAWING , //update the action type 
                elements : [ ...state.elements , newEle ] , //appending new element 
            }
        }
        case BOARD_ACTIONS.DRAW_MOVE:{
            const { clientX , clientY } = action.payload ; 
            const elems = [...state.elements]
            const ind = state.elements.length-1 ;
            elems[ ind ].x2 = clientX
            elems[ ind ].y2 = clientY
            elems[ ind ].roughEle = gen.line( elems[ ind ].x1 , elems[ ind ].y1 , clientX , clientY ) ;
            return {
                ...state ,
                elements : elems , //updating last element
            }
        }
        case BOARD_ACTIONS.DRAW_UP:{
            return {
                ...state ,
                toolActionType : TOOL_ACTION_TYPES.NONE , //update the action type 
            }
        }
        default:
            return state;
    }
}

export default boardReducer ;
