import { useState , React } from 'react'

import classes from "./index.module.css"
import cx from "classnames"

import { TOOL_ITEMS } from '../../constants';

import { FaSlash } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";

import boardContext from '../../store/board-context';
import { useContext } from 'react';


const Toolbar = () => {

  const { activeToolItem , handleToolItemClick } = useContext(boardContext)

  return (
    <>
        <div className={classes.container}>
            
            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.LINE }) }
                onClick={ () => handleToolItemClick(TOOL_ITEMS.LINE) }
            >
              <FaSlash />
            </div>

            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.RECTANGLE }) }
                onClick={ () => handleToolItemClick(TOOL_ITEMS.RECTANGLE) }
            >
              <LuRectangleHorizontal/>
            </div>
            

        </div>    
    </>
  )
}

export default Toolbar;