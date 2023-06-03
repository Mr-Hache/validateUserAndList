
const validateUserAdd = (user) => {

    const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/; // Carácter especial
  const regexMayuscula = /[A-Z]/; // Letra mayúscula
  const regexNumero = /[0-9]/; // Número
    const errors = [];
    if(!user.name ){
        errors.push("the name is required");
    }
    if(!user.username){
        errors.push("the username is required");
    }

    if(user.password < 8){

        errors.push('the password must be at least 8 characters long')
    }
    if(!regexEspecial.test(user.password)){
        errors.push('the password must have at least one special character')
    }

    if(!regexMayuscula.test(user.password)){
        errors.push("the password must have at least one uppercase letter")
    }

    if(!regexNumero.test(user.password)){
        errors.push("the password must have at least one number")
    }


    return errors;


    

}

export default validateUserAdd;