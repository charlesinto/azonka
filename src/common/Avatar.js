import React, { Component } from 'react';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import withStyles from "@material-ui/core/styles/withStyles";

class AvatarComponent extends Component {
    render() {
        const { classes, name, styles } = this.props;
        return (
            <Avatar style={{...styles}} className={classes.orangeAvatar}>{name}</Avatar>
        );
    }
}

const styles = theme => ({
    avatar: {
        // margin: 10,
        paddingBottom: 20,
        width: 80,
        height: 80
      },
      orangeAvatar: {
        // margin: 10,
        color: '#fff',
        width: 80,
        height: 80,
        fontSize: '2em',
        backgroundColor: deepOrange[500],
      },
      purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
      },
})

export default withStyles(styles)(AvatarComponent)