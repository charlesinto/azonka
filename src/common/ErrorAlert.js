import React, { Component } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from "@material-ui/core/styles/withStyles";

class ErrorAlert extends Component {
    render() {
        const {classes } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={this.props.open}
                autoHideDuration={6000}
            >
                <SnackbarContent
                    className={`${classes['warning']}`}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`} />
                            {this.props.errorMessage}
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
    warning: {
        backgroundColor: amber[700],
      },
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
})

export default withStyles(styles)(ErrorAlert)