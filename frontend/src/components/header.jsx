import './header.css'
import cart from '../assets/shopping-cart.png'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import userImg from '../assets/user.png'
import api from '../lib/axios';




//const url = 'http://localhost:5000/api/v1/products/name';



const Header = ({newPurchase,setSearch, buttonDelete}) =>{
    let navigate = useNavigate();
    const [name,Setname] = useState('')
    const [logOut,SetLog] = useState(false);
    const [cartNumber,SetcartNumber] = useState(0);
    

    useEffect(()=>{
        const findName = async () => {
                
            try {
                const token = localStorage.getItem('token');
                //const name = await Axios.get(url,{
                const name = await api.get('/name',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }});
    
                    const dataname = name.data.name
                    Setname(dataname)
    
                
            } catch (error) {
                console.log(error);
                
            }
    
        }
        findName();

    })

    useEffect(()=>{
        const findCart = async () => {
            
            try {
                const token = localStorage.getItem('token');
                //const cart = await Axios.get('http://localhost:5000/api/v1/products/cart',{
                const cart = await api.get('/cart',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }});

                    const dataArray = cart.data;
                    SetcartNumber(dataArray.cart.length)
                    
                    

                
            } catch (error) {
                console.log(error);
                
            }

        }
        findCart();

    },[newPurchase,buttonDelete])


const ButtonLog = () => {
    if (logOut){
        return <input type='button' value='logout' className='logoutButton' onClick={()=>{localStorage.removeItem('token'); window.location.reload()}}/>
    }

}

return (
<div className='container-all'>
<h1 onClick={()=>navigate('/')} className='nome-loja'>Loja</h1>
<div className='segundo'>
    
    <input type='text' className='input' onChange={(e)=>{setSearch(e.target.value)}}></input>
    <div className='cart-div'>
        <input className='cart' type='image' src={cart} onClick={()=> navigate('/cart')}/>
        <h1 className='cart-number'>{cartNumber}</h1>
    </div>
    <div className='account' onClick={()=>{SetLog(!logOut);}}>
    <h1 className='contaName'>{name}</h1>
    <input type='image' src={userImg} className='userImg' />
    <ButtonLog/>
    </div>
</div>
</div>
)
}

export default Header;