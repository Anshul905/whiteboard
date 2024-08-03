import { TOOL_ITEMS , BOARD_ACTIONS , TOOL_ACTION_TYPES} from "../../constants";


import { createElement , getSvgPathFromStroke , isCusrorNearElement } from "../../utils/element";
import getStroke from "perfect-freehand";




const boardReducer = ( state , action ) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:{
            return {
                ...state ,
                activeToolItem : action.payload.tool_item , //updating active tool 
            }
        }
        case BOARD_ACTIONS.CHANGE_ACTION_TYPE:{
            // console.log('change action type ');
            return {
                ...state ,
                toolActionType : action.payload.actionType , //updating action type 
            }
        }
        case BOARD_ACTIONS.DRAW_DOWN:{
            const { clientX , clientY , stroke , fill , size } = action.payload ; 
            const newEle = createElement(state.elements.id,clientX,clientY,clientX,clientY,{type:state.activeToolItem, stroke , fill , size});
            return {
                ...state ,
                toolActionType :  state.activeToolItem === TOOL_ITEMS.TEXT ?  TOOL_ACTION_TYPES.WRITING : TOOL_ACTION_TYPES.DRAWING , //update the action type 
                elements : [ ...state.elements , newEle ] , //appending new element 
            }
        }
        case BOARD_ACTIONS.DRAW_MOVE:{
            const { clientX , clientY } = action.payload ; 
            const elems = [...state.elements]
            const ind = state.elements.length-1 ;
            const { type} = elems[ind] 
            
            switch (type) {
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.ELLIPSE:
                case TOOL_ITEMS.ARROW:{
                    const {x1, y1 , stroke , fill, size } = elems[ind] 
                    const newEle = createElement(ind, x1 , y1 ,clientX,clientY,{type:state.activeToolItem, stroke , fill , size});
                    elems[ind] = newEle 
                    return {
                        ...state ,
                        elements : elems , //updating last element
                    }
                }
                case TOOL_ITEMS.BRUSH:
                    elems[ind].points = [ ...elems[ind].points , {x:clientX , y:clientY} ]; // appeds the new point 
                    elems[ind].path = new Path2D( getSvgPathFromStroke( getStroke(elems[ind].points) ) );
                    return {
                        ...state ,
                        elements : elems , //updating last element
                    }
                default:
                    throw new Error("Type not recognized");
            }

        }
        case BOARD_ACTIONS.ERASE :{
            const { clientX , clientY } = action.payload ; 
            let elems = [...state.elements]
            
            elems = elems.filter( (ele)  => {
                return !isCusrorNearElement(ele,clientX,clientY);
            })

            return {
                ...state ,
                elements : elems, // updating the element after erasing 
            }
        }
        case BOARD_ACTIONS.CHANGE_TEXT :{
            const ind = state.elements.length -1 ;
            let elems = [...state.elements]
            elems[ind].text = action.payload.text ;
            return {
                ...state ,
                toolActionType:TOOL_ACTION_TYPES.NONE,
                elements : elems, // updating the element after updating text 
            }
        }
        default:
            return state;
    }
}

export default boardReducer ;
