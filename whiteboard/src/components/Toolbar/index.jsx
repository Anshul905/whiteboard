import { useState , React } from 'react'

import classes from "./index.module.css"
import cx from "classnames"

import { TOOL_ITEMS } from '../../constants';

import { FaSlash , FaRegCircle } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";

import boardContext from '../../store/board-context';
import { useContext } from 'react';


const Toolbar = () => {

  const { activeToolItem , changeToolHandler  } = useContext(boardContext)

  return (
    <>
        <div className={classes.container}>
            
            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.LINE }) }
                onClick={ () => changeToolHandler(TOOL_ITEMS.LINE) }
            >
              <FaSlash />
            </div>

            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.RECTANGLE }) }
                onClick={ () => changeToolHandler(TOOL_ITEMS.RECTANGLE) }
            >
              <LuRectangleHorizontal/>
            </div>
            
            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.ELLIPSE }) }
                onClick={ () => changeToolHandler(TOOL_ITEMS.ELLIPSE) }
            >
              <FaRegCircle/>
            </div>

        </div>    
    </>
  )
}

export default Toolbar;