import { useState , React } from 'react'
import classes from "./index.module.css"

import { TOOL_ITEMS } from '../../constants';

import cx from "classnames"
import { FaSlash } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";

const Toolbar = () => {
  const [activeToolItem, setactiveToolItem] = useState(TOOL_ITEMS.LINE)
  return (
    <>
        <div className={classes.container}>
            
            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.LINE }) }
                onClick={ () => setactiveToolItem(TOOL_ITEMS.LINE) }
            >
              <FaSlash />
            </div>

            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem===TOOL_ITEMS.RECTANGLE }) }
                onClick={ () => setactiveToolItem(TOOL_ITEMS.RECTANGLE) }
            >
              <LuRectangleHorizontal/>
            </div>
            

        </div>    
    </>
  )
}

export default Toolbar;