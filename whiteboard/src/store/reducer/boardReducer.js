import { TOOL_ITEMS , BOARD_ACTIONS , TOOL_ACTION_TYPES} from "../../constants";


import { createRoughElement } from "../../utils/element";

const boardReducer = ( state , action ) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:{
            return {
                ...state ,
                activeToolItem : action.payload.tool_item , //updating active tool 
            }
        }
        case BOARD_ACTIONS.DRAW_DOWN:{
            const { clientX , clientY , stroke , fill } = action.payload ; 
            const newEle = createRoughElement(state.elements.id,clientX,clientY,clientX,clientY,{type:state.activeToolItem, stroke , fill});
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
            const {x1, y1 , stroke , fill} = elems[ind] 
            const newEle = createRoughElement(ind, x1 , y1 ,clientX,clientY,{type:state.activeToolItem, stroke , fill});
            elems[ind] = newEle 
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
