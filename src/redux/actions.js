export const CHANGE_AUTHENTICATION = 'CHANGE_AUTHENTICATION';
export const CHANGE_USER = 'CHANGE_USER';

export const changeAuthentication = (isAuthenticated) => {
   return { type: CHANGE_AUTHENTICATION,
     payload: isAuthenticated}
}

;

export const changeUser = (user) => {
   return{ type: CHANGE_USER,
    payload: user}
};
 

