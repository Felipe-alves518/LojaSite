import { Fragment, useEffect, useState } from 'react'
import Axios from 'axios';
import './box.css'
import right from '../assets/angle-right.png'
import left from '../assets/angle-left.png'
import api from '../lib/axios';


const ProductBox = ({newPurchase, SetNewPurchase, search, SetLoading}) => {

//const url = 'http://localhost:5000/api/v1/products';


const [dados,setDados] = useState([{}]);
const [page,SetPage] = useState(1);



useEffect(() => {

    const fetchData = async () => {
        SetLoading(true);
        if (search){
            SetPage(1)
            SetLoading(false);
        }
        try {
            const products = await api.get('/',{params:{page:page, name:search}});
            //const products = await Axios.get(url,{params:{page:page, name:search}});
            setDados(products.data);
            SetLoading(false);
        } catch (error) {
            console.log(error);
        }
    }    

    fetchData()
},[page,search])   

const cartProduct = async (productId) =>{
    const token = localStorage.getItem('token')
    //const url = `http://localhost:5000/api/v1/products/${productId}`
try {
    //const ADDCART = await Axios.patch(url,{},{
    SetLoading(true);
    const ADDCART = await api.patch(`/${productId}`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }})
    SetNewPurchase(newPurchase+1)
    SetLoading(false);
        
    
    
} catch (error) {
    console.log(error);
    
}

}

const Render =  () =>{
    if (page == 1 && !search){
        return (<><p>Page:{page}</p>
        <input type="image" src={right} className="pageButtonR" value='pra cima' onClick={()=>{SetPage(page+1)}}/>
        </>

    )
    }
    else if(page==2 && !search){
        return( <><input type="image" src={left} className="pageButtonL" value='pra baixo' onClick={()=>{SetPage(page-1)}}/>
        <p>Page:{page}</p></>)

    }
    else if(!search){
        return(
            <>
            <input type="image" src={left} className="pageButtonL" value='pra baixo' onClick={()=>{SetPage(page-1)}}/>
            <p>Page:{page}</p>
            <input type="image" src={right} className="pageButtonR" value='pra cima' onClick={()=>{SetPage(page+1)}}/>
            </>
        )
    }

}

return(
<>
<div className='container-master'>
{dados.map((idw)=>{ return (
<>
   
    <div className='container' key={idw._id}>
        
        <div className='cont-img'>
            <img className='image' src={idw.image}/>
        </div>
        <div className='baixo'>
            <div className='text'>
                <div className='title-P'>
                <h1 >{idw.name}</h1>
                </div>
                <p>R${idw.price}</p>
            </div>
            <div className='botao'>
                <input type='button' value='Comprar' className='comprar' onClick={()=> cartProduct(idw._id)}/>
            </div>

        </div>
    </div>
</>
)  
}
)}
</div>

<div className='buttons-div'>
<Render/>
</div>

</>
)
}

export default ProductBox;