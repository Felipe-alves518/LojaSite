import { useEffect, useState} from "react";
import Axios from 'axios';
import './cartBox.css';
import trash from '../assets/delete.png'
import api from '../lib/axios';



const CartBox = ({buttonDelete,Setdelete}) => {


    //const url = 'http://localhost:5000/api/v1/products/cart';


    
    const [ProductCart,SetCart] = useState([])

    const deleteItem = async (productID) => {
        const token = localStorage.getItem('token');
        const DELETE = await api.delete(`/${productID}`,{headers:{Authorization: `Bearer ${token}`}});
        //const DELETE = await Axios.delete(`http://localhost:5000/api/v1/products/${productID}`,{headers:{Authorization: `Bearer ${token}`}});
        Setdelete(buttonDelete+1)




    }
    

 

    useEffect(() => {
        const findCart = async () => {
            
            try {
                const token = localStorage.getItem('token');
                //const cart = await Axios.get(url,{
                const cart = await api.get('cart',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }});

                    const dataArray = cart.data;
                    SetCart(dataArray.cart);

                
            } catch (error) {
                console.log(error);
                
            }

        }
        findCart();
        },[buttonDelete])


   

    return (
        <>

        <div className="cartBoxBody">
            <div className="allCartbox">
       { ProductCart.map((elements)=>{
                    return(
                    <>
                    <div key={elements._id} className="cartContainerP">
                    <input type="image" src={trash} onClick={() => deleteItem(elements._id)} className="trash" />
                    <img src={elements.image} className="cartImage"/>
                    <h1>{elements.name}</h1>
                    <div className="priceC">
                    <p>R${elements.price}</p>
                    </div>
                    </div>

                    
                    </>
                    )


                })}
            </div>
            <div className="priceContainer">
            <h1>Preço:R${ProductCart.reduce((acc, item) => acc + item.price, 0)}</h1>
            </div>
        </div>
        

        </>
    )
}


export default CartBox