import CartBox from "../components/cartBox"
import Header from "../components/header"
import { useEffect } from "react";
import { useNavigate } from "react-router";


const Cart = ({buttonDelete,Setdelete, loading, SetLoading}) => {
    let navigate = useNavigate();
    useEffect(()=>{
    const token = localStorage.getItem('token')

    if(!token){
        navigate('/login')
    }

})
    

    return (
       <>
       <title>Carrinho</title>
        <div>
        <Header buttonDelete={buttonDelete}/>
        </div>
        <CartBox buttonDelete={buttonDelete} Setdelete={Setdelete} loading={loading} SetLoading={SetLoading} />
       </>

    )
}


export default Cart