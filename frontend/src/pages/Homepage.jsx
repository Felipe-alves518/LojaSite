import { useEffect, useState } from "react";
import ProductBox from "../components/box";
import Header from "../components/header";
import './HomePage.css'
import { useNavigate } from "react-router";



const HomePage = () => {
const [newPurchase,SetNewPurchase] = useState(0)
const [search, setSearch]=useState('')



let navigate = useNavigate();
    useEffect(()=>{
    const token = localStorage.getItem('token')

    if(!token){
        navigate('/login')
    }

})
return(
<>
<title>Loja</title>
<Header newPurchase={newPurchase} setSearch={setSearch}/>
<div className="products-container-H">
<ProductBox newPurchase={newPurchase} SetNewPurchase={SetNewPurchase} search={search}/>

</div>


</>
)

}


export default HomePage;