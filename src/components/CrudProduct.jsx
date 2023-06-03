import database from '../db'
import {addDoc, getDoc, doc, updateDoc, collection} from 'firebase/firestore'
import {useState, useEffect} from 'react'

const CrudProduct = () => {
    const [idProductGet, setIdProductGet] = useState('')
    const [idProductUpdate, setIdProductUpdate] = useState({
        id: '',
         nombre_producto: '',
            precio: '',
            stock: '',
            fecha_creacion: '',
    })

    const [addProduct, setProduct] = useState({
        nombre_producto: '',
        precio: '',
        stock: '',
        fecha_creacion: '',
    })
 

    useEffect(() => {
        console.log(idProductGet)
    }, [idProductGet])




    const handleGetProduct = async (event) => {
        event.preventDefault()
        const docRef = doc(database, 'producto', idProductGet)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            console.log(docSnap.data())
        }
        else{
            console.log('No existe el producto')
        }
    }

    const handleAddProduct = async (event) => {
        event.preventDefault()
        console.log(addProduct)
if(!addProduct.nombre_producto|| !addProduct.precio || !addProduct.stock || !addProduct.fecha_creacion){
        window.alert('Todos los datos son obligatorios')
            return
        }
        else{
            try{
                const add = await addDoc(collection(database, 'producto'), addProduct)
                console.log(add.id)
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const handleUpdateProduct = async (event) => {
        event.preventDefault()
        const data = {};

        console.log(idProductUpdate)

        if (idProductUpdate.nombre_producto !== null) {
          data.nombre_producto = idProductUpdate.nombre_producto;
        }
        
        if (idProductUpdate.precio !== null) {
          data.precio = idProductUpdate.precio;
        }
        
        if (idProductUpdate.stock !== null) {
          data.stock = idProductUpdate.stock;
        }
        
        if (idProductUpdate.fecha_creacion !== null) {
          data.fecha_creacion = idProductUpdate.fecha_creacion;
        }

        try{
            const docRef = doc(database, 'producto', idProductUpdate.id)
             await updateDoc(docRef, data)
    
        }
        catch(error){
            console.log(error)
        }


    }


    return (
        <div>
            <h1>Crud Product</h1>
            <h2>Get product</h2>
            <form>
                <input type="text" placeholder="id" onChange={(event) => setIdProductGet(event.target.value)} />
                <button type="submit" onClick={handleGetProduct}>Get</button>
            </form>
            <h2>Add product</h2>
            <form>
                <input type="text" placeholder="Nombre producto" onChange={(event) => setProduct({...addProduct, nombre_producto: event.target.value})} />
                <input type="number" placeholder="Precio" onChange={(event) => setProduct({...addProduct, precio: event.target.value})} />
                <input type="number" placeholder="Stock" onChange={(event) => setProduct({...addProduct, stock: event.target.value})} />
                <input type="date" placeholder="Fecha creacion" onChange={(event) => setProduct({...addProduct, fecha_creacion: event.target.value})} />
                <button type="submit" onClick={handleAddProduct}>Add</button>
            </form>

            <h2>Update Product</h2>
            <form>
                <input type="text" placeholder="id" onChange={(event) => setIdProductUpdate({...idProductUpdate, id: event.target.value})} />
                <input type="text" placeholder="Nombre producto" onChange={(event) => setIdProductUpdate({...idProductUpdate, nombre_producto: event.target.value})} />
                <input type="number" placeholder="Precio" onChange={(event) => setIdProductUpdate({...idProductUpdate, precio: event.target.value})} />
                <input type="number" placeholder="Stock" onChange={(event) => setIdProductUpdate({...idProductUpdate, stock: event.target.value})} />
                <input type="date" placeholder="Fecha creacion" onChange={(event) => setIdProductUpdate({...idProductUpdate, fecha_creacion: event.target.value})} />
                <button type="submit" onClick={handleUpdateProduct}>Update</button>
            </form>

        </div>
    )
}

export default CrudProduct