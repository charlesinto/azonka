import React, { Component } from 'react';

class CustomInput extends Component {
    render() {
        const {error, value, onIputChange, inputStyle, errorStyle,
             placeholder, name, errorMessage } = this.props;
        return (
            <div>
                <input type="text" value={value} 
                                className={`${ error ? 'invalid' : '' }`}
                                onChange={onIputChange} id="new_pwd"
                                style={{...inputStyle}} name={name} placeholder={placeholder} />
                {
                    error ?
                    (
                        <div className="error-message required" style={{...errorStyle}}>
                            {errorMessage}
                        </div>
                    ): null 
                }
            </div>
        );
    }
}

export default CustomInput;