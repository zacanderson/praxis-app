import React, { useState, useEffect } from 'react';
import plusSym from '../images/plusSymbol.png'
import AddModal from './AddModal';


function AddButton () {
    const [hover, setHover] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);


    return (
        <>
        <div className="col d-flex justify-content-center">

                    <div 
                        style={{marginBottom:40, marginTop:17, width:110,height:110, border:  hover ? "9px solid #DBABBE" : "9px solid #BAA1A7" , borderRadius:70, cursor: "pointer"}}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={() => setModalShow(true)}>
                    <img style={{ width: "40%", display:"block", margin:"30%"}} src={plusSym} alt="habit" />
                        
                    </div>
        </div>

        <AddModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </>
    )
}

export default AddButton