import React from 'react'
import { withStyles, Button } from '@material-ui/core'
// import { formatNumber } from '../utils'

const styles = {
    container: {
        border: 'solid 1px gray',
        padding: '5px',
        backgroundColor: 'gray',
    },
    button: {
        margin: 10,
    },
}
const Tooltip = props => {
    if (!props.active) return null
    const value = props.payload[0].payload.y.toExponential(1)
    return (
        <div classes={props.classes.container}>
            <i>{props.payload[0].payload.x}</i>
            <div>
                <b>{props.name}: </b>
                {`${value} ${props.unit}`}
            </div>
            <Button className={props.classes.button}>See details</Button>
        </div>
    )
}

export default withStyles(styles)(Tooltip)
