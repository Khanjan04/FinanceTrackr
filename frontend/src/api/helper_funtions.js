import { store } from '../state/store';
import { logoutUser } from '../state/slices/user';
export const get_jwt_token = () => {
    const state = store.getState();
    const jwt_token = state.user.token;
    return jwt_token ? jwt_token : localStorage.getItem('jwt');
}
export const isTokenExpired = (token) => {
    try {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000))+10 >= expiry;
    } catch (e) { 
        store.dispatch(logoutUser());
        window.location.href = window.location.origin;
    }
}
export const loginRedirect = (token) => {
    if (token === null  || isTokenExpired(token)) {
        store.dispatch(logoutUser());
        window.location.href = window.location.origin;
    }
} 
