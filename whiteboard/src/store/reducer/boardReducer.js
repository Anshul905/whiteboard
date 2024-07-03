import { TOOL_ITEMS , BOARD_ACTIONS } from "../../constants";

const boardReducer = ( state , action ) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:
            return {
                ...state ,
                activeToolItem : action.payload.tool_item ,
            }
        default:
            return state;
    }
}

export default boardReducer ;
