import './loader.css'


const Loader = ({loading}) => {



    const RenderLOAD = () => {
        if (loading){
            return (<div className='loader-div'><span className="loader"></span></div>)
        }

    

    }
    return(
        <>
        
        <RenderLOAD/>
        
        </>

    )




}



export default Loader;