import {useState, useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom'
import { changeAuthentication, changeUser } from '../redux/actions';
import {collection,query, where, getDocs} from 'firebase/firestore'
import database from '../db'


const Home = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [idAuth, setIdAuth] = useState('')
    const [userVerificated, setUserVerificated] = useState(
        {
            id: '',
            name: '',
            username: ''
        }
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const isAuthenticated = useSelector(state => state.isAuthenticated)

    useEffect(() => {
        dispatch(changeAuthentication(false))
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            const q = query(collection(database, "Users"), where("id", "==", idAuth));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                setUserVerificated(doc.data());
            });
        }
        if(idAuth){
            getUsers()
          
        }
    }, [idAuth])

useEffect(() => {
    if(userVerificated.id){
        dispatch(changeAuthentication(true))
    }
}, [userVerificated])
            

    useEffect(() => {
       if(isAuthenticated){
              dispatch(changeUser(userVerificated))

              navigate(`/shoppingarea/${userVerificated.id}`)
       }
    }, [isAuthenticated])


    const auth = getAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const UserCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
        setIdAuth(UserCredential.user.uid)
  
        console.log('Inicio de sesión exitoso');
      } catch (error) {
         alert(error.message)
      }
    };



    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
return (

    <div>
        <h1>Home</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={user.email} onChange={handleInputChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={user.password} onChange={handleInputChange} />
        <button type='submit'>Ingresar</button>
        </form>
 
        <span> You do not have an account?</span>
        <Link to='/Add'>
        <button>Register user</button>
        </Link>


      


    </div>
)
}

export default Home