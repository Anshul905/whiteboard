import React from 'react'
import boardContext from './board-context'
import { TOOL_ITEMS } from '../constants'
import { useState } from 'react'

const BoardProvider = ( {children} ) => {
    
    const [activeToolItem, setactiveToolItem] = useState(TOOL_ITEMS.RECTANGLE)
    const [ elements , setElements] = useState(second)

    const handleToolItemClick = (item) =>{
        setactiveToolItem(item);
    }

    
    const boardContextValue = {
        activeToolItem ,
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
