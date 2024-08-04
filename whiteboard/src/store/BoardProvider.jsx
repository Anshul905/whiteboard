import React, { act, useCallback } from 'react'
import boardContext from './board-context'
import { TOOL_ITEMS , BOARD_ACTIONS, TOOL_ACTION_TYPES } from '../constants'

import { useReducer } from 'react'
import boardReducer from './reducer/boardReducer'


const BoardProvider = ( {children} ) => {
    
    const initialBoardState = {
        activeToolItem : TOOL_ITEMS.BRUSH , 
        toolActionType : TOOL_ACTION_TYPES.NONE ,
        elements : [] ,
        history : [[]],
        index : 0 ,
    
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


    
    const boardMouseDownHandler = (event,toolboxState) => {
        // console.log(event);

        if( boardState.toolActionType === TOOL_ACTION_TYPES.WRITING ) return ;


        const { clientX , clientY } = event ;    

 
        if( boardState.activeToolItem===TOOL_ITEMS.ERASER ){
            // console.log('move down for erasing');
            dispatchBoardAction( {
                type : BOARD_ACTIONS.CHANGE_ACTION_TYPE ,
                payload : {
                    actionType  : TOOL_ACTION_TYPES.ERASING,
                } 
            } ) ;
            return ;
        }
        // console.log('move down for others');

        dispatchBoardAction( {
            type : BOARD_ACTIONS.DRAW_DOWN , 
            payload : {
                clientX , 
                clientY ,
                stroke : toolboxState[boardState.activeToolItem]?.stroke,
                fill : toolboxState[boardState.activeToolItem]?.fill,
                size : toolboxState[boardState.activeToolItem]?.size,
            } ,
        } )
    }



    const boardMouseMoveHandler  = (event) =>{
        // console.log(event);
        if( boardState.toolActionType==TOOL_ACTION_TYPES.WRITING ) return ;


        const { clientX , clientY } = event ; 
        if( boardState.toolActionType==TOOL_ACTION_TYPES.ERASING ){
            console.log('moving for erasing');
            dispatchBoardAction( {
                type : BOARD_ACTIONS.ERASE , 
                payload : {
                    clientX , 
                    clientY ,
                } ,
            } )    
        }else if( boardState.toolActionType==TOOL_ACTION_TYPES.DRAWING ){
            console.log('moving for dawing');
            dispatchBoardAction( {
                type : BOARD_ACTIONS.DRAW_MOVE , 
                payload : {
                    clientX , 
                    clientY ,
                } ,
            } )    
        }
    }


    const boardMouseUpHandler  = (event) =>{
        // console.log(event);

        if( boardState.toolActionType==TOOL_ACTION_TYPES.WRITING ) return ;

        //was drawing and mouse up -> element is created, new board state is crated  
        if( boardState.toolActionType==TOOL_ACTION_TYPES.DRAWING ){
            dispatchBoardAction( {
                type : BOARD_ACTIONS.DRAW_UP , 
            } )    
        }

        dispatchBoardAction( {
            // type : BOARD_ACTIONS.DRAW_UP , 
            type : BOARD_ACTIONS.CHANGE_ACTION_TYPE ,
            payload : {
                actionType  : TOOL_ACTION_TYPES.NONE,
            } 
        } )    
    }

    const textAreaBlurHandler = ( text ) => {
        console.log('blur');
        dispatchBoardAction({
            type:BOARD_ACTIONS.CHANGE_TEXT,
            payload:{
                text,
             }
        })
    }


    const boardUndoHandler =  useCallback( () => {
        dispatchBoardAction({
            type : BOARD_ACTIONS.UNDO,
        })
    } , []);

    const boardRedoHandler = useCallback (() => {
        dispatchBoardAction({
            type : BOARD_ACTIONS.REDO,
        })        
    } , []);

    const boardContextValue = {
        activeToolItem : boardState.activeToolItem,
        toolActionType : boardState.toolActionType ,
        elements : boardState.elements, 
        changeToolHandler,
        boardMouseDownHandler,  
        boardMouseMoveHandler,
        boardMouseUpHandler,
        textAreaBlurHandler,
        undo : boardUndoHandler,
        redo : boardRedoHandler,
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
