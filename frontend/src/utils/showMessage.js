import {toast} from 'react-toastify';
export const showError = (error) => {
    for(let key in error) {
        for(const err of error[key]) {
            toast.error(err)
        }
    }
}

export const getError= (error) => {
    let stringArray = [];
    for(let key in error) {
        for(const err of error[key]) {
            stringArray.push(err)
        }
    }
    return stringArray;
}


export const showErrors = (error) => {
    for(let key in error) {
        for(const err of error[key]) {
            toast.error(`${key}: ${err}`)
        }
    }
}

export const showSuccess = (message) => {
    toast.success(message);
}

export const showErrorMsg = (error_msg,position=toast.POSITION.TOP_RIGHT) => {
            toast.error(error_msg,{position:position});
}

export const showWarning = (warning) => {
    toast.warning(warning);
}
export const showEmptyError = (error1) => {
    toast.error(error1);
}