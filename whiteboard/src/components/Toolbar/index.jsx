import { useState , React } from 'react'
import classes from "./index.module.css"

import cx from "classnames"
import { FaSlash } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";

const Toolbar = () => {
  const [activeToolItem, setactiveToolItem] = useState("LINE")
  return (
    <>
        <div className={classes.container}>
            
            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem==="LINE" }) }
                onClick={ () => setactiveToolItem("LINE") }
            >
              <FaSlash />
            </div>

            <div className={ cx(classes.toolItem , { [classes.active] : activeToolItem==="RECTANGLE" }) }
                onClick={ () => setactiveToolItem("RECTANGLE") }
            >
              <LuRectangleHorizontal/>
            </div>
            

        </div>    
    </>
  )
}

export default Toolbar;