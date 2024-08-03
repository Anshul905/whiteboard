import React, { act } from 'react'
import { useReducer } from 'react';
import toolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from '../constants';

const initialToolboxState = {
    [TOOL_ITEMS.BRUSH] : {
        stroke : COLORS.GREEN,
    },
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
        stroke : COLORS.BLUE,
        fill : null,
        size : 1 ,
    },
    [TOOL_ITEMS.ARROW] : {
        stroke : COLORS.YELLOW,
        size : 1 ,
    },
    [TOOL_ITEMS.TEXT] : {
        stroke : COLORS.BLACK,
        size : 32 ,
    },
}


function toolboxReducer( state , action ) {
    // console.log(action.payload);
    switch (action.type) {
        case TOOLBOX_ACTIONS.CHANGE_STROKE:{
            const newState = { ...state };
            newState[action.payload.tool].stroke = action.payload.stroke;
            return newState;
        }
        case TOOLBOX_ACTIONS.CHANGE_FILL:{
            const newState = { ...state };
            newState[action.payload.tool].fill = action.payload.fill;
            return newState;
        }
        case TOOLBOX_ACTIONS.CHANGE_SIZE:{
            const newState = { ...state };
            newState[action.payload.tool].size = action.payload.size;
            return newState;
        }
        default : 
            return state;             
    }
}

const ToolboxProvider = ( {children} ) => {
    
    const [ toolboxState, dispatchToolboxAction ] = useReducer( toolboxReducer , initialToolboxState )
    
    
    const changeStrokeHandler = (tool,stroke) => {
        // console.log(tool , 'colors is' , stroke);
        dispatchToolboxAction({
            type : TOOLBOX_ACTIONS.CHANGE_STROKE,
            payload : {
                tool,
                stroke,
            },
        })
    }

    const changeFillHandler = (tool,fill) => {
        // console.log(tool , 'colors is' , fill);
        dispatchToolboxAction({
            type : TOOLBOX_ACTIONS.CHANGE_FILL,
            payload : {
                tool,
                fill,
            },
        })
    }

    const changeSizeHandler = (tool,size) => {
        // console.log(size);
        dispatchToolboxAction({
            type : TOOLBOX_ACTIONS.CHANGE_SIZE,
            payload : {
                tool,
                size,
            },
        })        
    }


    const toolboxContextValue = {
        toolboxState,
        changeStroke : changeStrokeHandler,
        changeFill : changeFillHandler,
        changeSize : changeSizeHandler ,
    }

    return <toolboxContext.Provider value={toolboxContextValue}>  
        {children}
    </toolboxContext.Provider>
}

export default ToolboxProvider