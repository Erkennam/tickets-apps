import React,{FC} from "react";
import ReactLoading from 'react-loading';

const Loader:FC = ()=>{
    return(
        <ReactLoading type={'bubbles'} color={'#ffffff'} height={667} width={375} />
    )
}

export default Loader;