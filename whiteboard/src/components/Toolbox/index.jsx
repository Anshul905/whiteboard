import React, { useContext } from 'react'
import classes from "./index.module.css"
import cx from "classnames"
import { COLORS } from '../../constants';
import toolboxContext from '../../store/toolbox-context';
import boardContext from '../../store/board-context';

const ToolBox = () => {
    const { activeToolItem } = useContext(boardContext)
    const  { toolboxState , changeStroke } = useContext(toolboxContext)

    const strokeColor = toolboxState[activeToolItem]?.stroke;
    
  return (
    <div className={classes.container} >
        <div className={classes.selectOptionContainer} >
            <div className={classes.toolBoxLabel} >Stroke</div>
                <div className={classes.colorsContainer} >
                    {
                        Object.keys(COLORS).map( (k) => {
                            return (
                                <div key={k} 
                                    className={cx(classes.colorBox , 
                                        {[classes.activeColorBox]:strokeColor==COLORS[k]},
                                     )} 
                                     style={{background:COLORS[k]}}
                                     onClick={ ()=>changeStroke(activeToolItem,COLORS[k]) }     
                                ></div>
                            )
                        })
                    }
                </div>
        </div>
    </div>
  )
}

export default ToolBox;
