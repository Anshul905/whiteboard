import React, { act } from 'react'
import { useReducer } from 'react';
import toolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS } from '../constants';

const initialToolboxState = {
    [TOOL_ITEMS.LINE] : {
        stroke : COLORS.BLACK,
        size : 1 ,
    },
    [TOOL_ITEMS.RECTANGLE] : {
        stroke : COLORS.RED,
        fill : null,
        size : 1 ,
    },
    [TOOL_ITEMS.ELLIPSE] : {
        stroke : COLORS.BLACK,
        fill : null,
        size : 1 ,
    },
    [TOOL_ITEMS.ARROW] : {
        stroke : COLORS.BLACK,
        size : 1 ,
    },
}


function toolboxReducer( state , action ) {
    // console.log(action.payload);
    switch (action.type) {
        case "CHANGE_STROKE":
            const newState = { ...state };
            newState[action.payload.tool].stroke = action.payload.stroke;
            return newState;
        default : 
             return state;            
    }
}

const ToolboxProvider = ( {children} ) => {
    
    const [ toolboxState, dispatchToolboxAction ] = useReducer( toolboxReducer , initialToolboxState )
    
    
    //updates tool's stroke
    const changeStrokeHandler = (tool,stroke) => {
        // console.log(tool , 'colors is' , stroke);

        dispatchToolboxAction({
            type : "CHANGE_STROKE",
            payload : {
                tool,
                stroke,
            },
        })
    }
    
    const toolboxContextValue = {
        toolboxState,
        changeStroke : changeStrokeHandler,
    }

    return <toolboxContext.Provider value={toolboxContextValue}>  
        {children}
    </toolboxContext.Provider>
}

export default ToolboxProvider