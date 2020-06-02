import React, { Component } from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from "@material-ui/core/styles/withStyles";

class SuccessAlert extends Component {
    render() {
        const { classes} = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={this.props.open}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={`${classes['success']}`}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <CheckCircle className={`${classes.icon} ${classes.iconVariant}`} />
                            {this.props.message}
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" onClick={this.props.closeSnackBar} color="inherit">
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    ]}
                />
            </Snackbar>
        );
    }
}

const styles = theme => ({
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
      success: {
        backgroundColor: green[600],
      }
})

export default withStyles(styles)(SuccessAlert)