import React, { act } from 'react'
import boardContext from './board-context'
import { TOOL_ITEMS , BOARD_ACTIONS, TOOL_ACTION_TYPES } from '../constants'

import { useReducer } from 'react'
import boardReducer from './reducer/boardReducer'


const BoardProvider = ( {children} ) => {
    
    const initialBoardState = {
        activeToolItem : TOOL_ITEMS.LINE , 
        toolActionType : TOOL_ACTION_TYPES.NONE ,
        elements : [] ,
    }
    const [ boardState, dispatchBoardAction ] = useReducer( boardReducer , initialBoardState )

    const changeToolHandler  = (tool_item) =>{
        dispatchBoardAction( {
            type : BOARD_ACTIONS.CHANGE_TOOL , 
            payload : {
                tool_item
            } ,
        } )
    }


    const boardMouseDownHandler = (event) => {
        // console.log(event);

        const { clientX , clientY } = event ;        
        dispatchBoardAction( {
            type : BOARD_ACTIONS.DRAW_DOWN , 
            payload : {
                clientX , 
                clientY ,
            } ,
        } )
    }

    const boardMouseMoveHandler  = (event) =>{
        // console.log(event);

        const { clientX , clientY } = event ;
        dispatchBoardAction( {
            type : BOARD_ACTIONS.DRAW_MOVE , 
            payload : {
                clientX , 
                clientY ,
            } ,
        } )    
    }


    const boardMouseUpHandler  = (event) =>{
        // console.log(event);

        dispatchBoardAction( {
            type : BOARD_ACTIONS.DRAW_UP , 
        } )    
    }


    const boardContextValue = {
        activeToolItem : boardState.activeToolItem,
        toolActionType : boardState.toolActionType ,
        elements : boardState.elements, 
        changeToolHandler,
        boardMouseDownHandler,  
        boardMouseMoveHandler,
        boardMouseUpHandler,
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
