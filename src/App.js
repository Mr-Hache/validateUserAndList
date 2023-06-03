import {Route, Routes, Navigate} from 'react-router-dom';  
import Home from './components/Home';
import Error from './components/Error';
import FormAddUser from './components/FormAddUser';
import { useSelector } from 'react-redux';
import ShoppingArea from './components/ShoppingArea';
import CrudProduct from './components/CrudProduct';

function App() {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  return (
    <div className="App">
     
    

      <Routes>
        <Route path="/add" element={<FormAddUser />} />
        <Route path='/shoppingarea/:id' element={isAuthenticated? <ShoppingArea/>:<Error/> }/>
        <Route path="/" element={<Home />} />
        <Route path="/crudproduct" element={<CrudProduct />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>

    </div>
  );
}

export default App;
