import { useSelector } from "react-redux" 
 import { useEffect, useState } from "react"
 import {collection, onSnapshot, updateDoc, doc, addDoc, getDocs, query, where, deleteDoc} from 'firebase/firestore'
import database from "../db"

 const ShoppingArea = () => {

const user = useSelector(state => state.user)
const [products , setProducts] = useState([])
const [list , setList] = useState({})
const [list_Product , setList_Product] = useState([])
const [productsList , setProductsList] = useState([])
const [pago , setPago] = useState(0)

useEffect(() => {
    const collectionRef = collection(database, 'producto');
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const updatedProducts = [];
      querySnapshot.forEach((doc) => {
        updatedProducts.push({ id: doc.id, ...doc.data() });
      });
      setProducts(updatedProducts);
    });

    const getIdList = async () => {
        const ListRef = collection(database, 'List');
        const q = query(ListRef, where('id_User', '==', user.id));
  
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
       
            setList(
                {
                    id: doc.id,
                    ...doc.data()
                }
            )
          });
        } catch (error) {
          console.log('Error al obtener el documento:', error);
        }
    }

    getIdList()
 
   



    return () => {
      // Cuando se desmonta el componente, se cancela la suscripción a los cambios
      unsubscribe();
      
    };


  }, []);


  useEffect(() => {
    if(list.id){
    const collectionRefList_Product = collection(database, 'List_Product');
    const queryList_Product = query(collectionRefList_Product, where('id_List', '==', list.id));
   const unsubscribeList_Product =  onSnapshot( queryList_Product , (querySnapshot) => {
       const updatedList_Product = [];
       querySnapshot.forEach((doc) => {
           updatedList_Product.push({ id: doc.id, ...doc.data() });
       });
       setList_Product(updatedList_Product);
   });
   return () => {
    unsubscribeList_Product()
}
    }
 

}   ,[list])



useEffect(() => {
if(list_Product.length > 0){
    const productsListMatch = list_Product.map((list_Product) => {
        return products.find((product) => product.id === list_Product.id_Product)
    }
    )
    setProductsList(productsListMatch)   
}
else{
    setProductsList([])
}



}   ,[list_Product])

useEffect(() => {
    if(productsList.length > 0){
        const totalPago = productsList.reduce((acc, product) => {
            return acc + product.precio
        }, 0)
        setPago(totalPago)
    }
    else{
        setPago(0)
    }
}   ,[productsList])



const handleChangeStock=async (event) =>{
        event.preventDefault()
        let product = []
        for (let i = 0; i < products.length; i++) {
            if(products[i].id === event.target.name){
                product = products[i]     
            }    
        }
        product.stock = product.stock - 1
        const updateStock = async () => {
            try {
                await updateDoc(doc(database, 'producto', product.id), {
                    stock: product.stock
                })
            } catch (error) {
                console.log(error)
            }
        }
        updateStock()

        const addList_Product = async () => {
            try {
                await addDoc(collection(database, 'List_Product'), {
                    id_List: list.id,
                    id_Product: event.target.name
                })
            } catch (error) {
                console.log(error)
            }
        }
        addList_Product()

}

const handleChangeDeleteProductList = async (event) => {
    event.preventDefault()
    
const idForList_Product = list_Product.find((list_Product) => list_Product.id_Product === event.target.name)
    const deleteList_Product = async () => {
        try {
            await deleteDoc(doc(database, 'List_Product', idForList_Product.id))
        } catch (error) {
            console.log(error)
        }
    }

const addStock = async () => {
    const product = products.find((product) => product.id === event.target.name)
    product.stock = product.stock + 1
    try {
        await updateDoc(doc(database, 'producto', product.id), {
            stock: product.stock
        })
    } catch (error) {
        console.log(error)

    }
}

    deleteList_Product()
    addStock()

}

    return (
        <div>
            <h1>Hello! {user.name}</h1>
            <h2>Lista de productos</h2>
 <ul>
        {products.map((product, index) => (
            <li key={index}>
                <h2>{product.nombre_producto}</h2>
                <p>{product.precio}</p>
                <p>{product.stock}</p>
                {
                    product.stock === 0 ? <p>No hay stock</p> : <button name={product.id} onClick={handleChangeStock}>Añadir producto</button>
                }
            </li>
        ))}

 </ul>

    <h2>Lista de compra</h2>
    <ul>
        {productsList.map((product, index) => (
            <li key={index}>
                <h2>{product.nombre_producto}</h2>
                <button onClick={handleChangeDeleteProductList} name={product.id}>x</button>
            </li>
        ))}
    </ul>
    <h2>Total a pagar: {pago}</h2>

        </div>
    
    )
 }

    export default ShoppingArea