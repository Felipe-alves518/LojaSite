import { useEffect, useState } from "react";
import ProductBox from "../components/box";
import Header from "../components/header";
import './HomePage.css'
import { useNavigate } from "react-router";
import Loader from "../components/loader";



const HomePage = ({loading, SetLoading}) => {
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
<Loader loading={loading}/>
<Header newPurchase={newPurchase} setSearch={setSearch} />
<div className="products-container-H">
<ProductBox newPurchase={newPurchase} SetNewPurchase={SetNewPurchase} search={search}  SetLoading={SetLoading}/>

</div>


</>
)

}


export default HomePage;