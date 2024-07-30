import React, { useContext } from 'react'
import classes from "./index.module.css"
import cx from "classnames"
import { COLORS, FILL_TOOL_TYPES, STROKE_TOOL_TYPES } from '../../constants';
import toolboxContext from '../../store/toolbox-context';
import boardContext from '../../store/board-context';

const ToolBox = () => {
    const { activeToolItem } = useContext(boardContext)
    const  { toolboxState , changeStroke , changeFill } = useContext(toolboxContext)

    const strokeColor = toolboxState[activeToolItem]?.stroke;
    const fillColor = toolboxState[activeToolItem]?.fill;
    
  return (
    <div className={classes.container} >
        {  STROKE_TOOL_TYPES.includes(activeToolItem) &&
            <div className={classes.selectOptionContainer} >
                <div className={classes.toolBoxLabel} >Stroke Color</div>
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
        }

        
        {   FILL_TOOL_TYPES.includes(activeToolItem) &&
            <div className={classes.selectOptionContainer} >
                <div className={classes.toolBoxLabel} >Fill Color</div>
                <div className={classes.colorsContainer} >
                    {
                        Object.keys(COLORS).map( (k) => {
                            return (
                                <div key={k} 
                                    className={cx(classes.colorBox , 
                                        {[classes.activeColorBox]:fillColor==COLORS[k]},
                                    )} 
                                    style={{background:COLORS[k]}}
                                    onClick={ ()=>changeFill(activeToolItem,COLORS[k]) }     
                                ></div>
                            )
                        })
                    }
                </div>
            </div>
        }


    </div>
  )
}

export default ToolBox;
