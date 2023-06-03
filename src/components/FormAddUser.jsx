import { useState, useEffect } from 'react'
import database from '../db'
import { collection, addDoc } from "firebase/firestore";
import validateUserAdd from '../utils/validateUserAdd'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const FormAddUser = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        username: '',
        password: '',
        email: '',
    })

    const auth = getAuth();

    const navigate = useNavigate()
    const collectionRef = collection(database, "Users")
    const collectionRfList = collection(database, "List")

    useEffect(() => {
const addUser = async () => {

    try {
        await addDoc(collectionRef, {
            id: user.id,
            name: user.name,
            username: user.username,
        })
        await addDoc(collectionRfList, {
            id_User : user.id,
            name_List : user.username,
        date : new Date()
        })
        alert('Usuario registrado')
        navigate('/')
    } catch (error) {
        alert(error.message)
    }
}
if(user.id){
    addUser()
}
        

    }, [user.id])




    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const errors = validateUserAdd(user)
            if (errors.length > 0) {
                const errorMessage = errors.join('\n')
                alert(errorMessage)
                return
            }else{
                const userCredential =    await createUserWithEmailAndPassword(auth, user.email, user.password)
                setUser({
                    ...user,
                    id: userCredential.user.uid
                })
            }

        } catch (error) {
            alert(error.message)
        }

    }


    return (
        <div>
            <h1>Formulario de registro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={user.username} onChange={handleInputChange} />
                <label htmlFor="password">Clave</label>
                <input type="password" name="password" value={user.password} onChange={handleInputChange} />
                <label htmlFor="email">Correo</label>
                <input type="email" name="email" value={user.email} onChange={handleInputChange} />
                <button type='submit'>Ingresar</button>
            </form>
        </div>


    )
}

export default FormAddUser;