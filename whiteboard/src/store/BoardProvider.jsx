import React, { act } from 'react'
import boardContext from './board-context'
import { TOOL_ITEMS } from '../constants'
import { useReducer } from 'react'


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

const BoardProvider = ( {children} ) => {
    
    const initialBoardState = {
        activeToolItem : TOOL_ITEMS.LINE , 
        elements : [] ,
    }
    const [ boardState, dispatchBoardAction ] = useReducer( boardReducer , initialBoardState )

    const handleToolItemClick = (tool_item) =>{
        dispatchBoardAction( {
            type : BOARD_ACTIONS.CHANGE_TOOL , 
            payload : {
                tool_item
            } ,
        } )
    }


    const boardContextValue = {
        activeToolItem : boardState.activeToolItem,
        handleToolItemClick,    
    }
    return (
    <>
        <boardContext.Provider  value={boardContextValue} >
            {children}
        </boardContext.Provider>
    </>
  )
}

export default BoardProvider ;
