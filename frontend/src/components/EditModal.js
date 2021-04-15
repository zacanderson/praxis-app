import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Button';
import IconsArr from './Icons';
import axios from 'axios';



//import axios from 'axios';



function EditModal(props) {

  const [color, setColor] = useState(props.Color);
  const [habitName, setHabitName] = useState('');
  const [desc, setDesc] = useState(props.Description);
  const [occur, setOccur] = useState(props.Occurence);
  const [amount, setAmount] = useState(props.TimesPerOccurence);
  const [icon, setIcon] = useState(-1);
  const[streak, setStreak] = useState(0)
  const[lstreak, setLStreak] = useState(0)


  const [showIcons, setShowIcons] = useState(true);
  let date = new Date();


  const bp = require('./bp.js');
  const storage = require('../tokenStorage.js');
  const jwt = require("jsonwebtoken");

  var card = '';
  var search = '';

  const [message,setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  
  

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok,{complete:true});

//    var userId = ud.payload.id;
  var userId = ud.payload.userId;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;

  const editHabit = async event => 
  {
    event.preventDefault();
    date = new Date();

       
    var obj = {
          accessToken:tok, 
          newOccurence:occur, 
          habitID:props._id, 
          description:desc, 
          timesPerOccurence:amount, 
          color:color, 
          icon:props.Icon, 
          percent:props.Progress.Percent,
          currDate: date 
        
      
          }


      var js = JSON.stringify(obj);

      try
      {
          // Axios code follows
          var config = 
          {
              method: 'post',
              url: bp.buildPath('api/editHabit'),        // or api/edit or api/searchcards
              headers: 
              {
                  'Content-Type': 'application/json'
              },
              data: js
          };

          axios(config)
          .then(function (response) 
          {
              var res = response.data;
              if (res.error) 
              {
                  setMessage(res.error);
              }
              else 
              {
                  if( res.error.length > 0 )
                  {
                      setMessage( "API Error:" + res.error );
                  }
                  else
                  {
                      setMessage('Habit has been added');
                      setTimeout(() => {
                        closeModal();
                        setEditMode(false);
                      }, 300);
                  }
              }
          })
          .catch(function (error) 
          {
              setMessage(error);
          });

      }
      catch(e)
      {
          setMessage(e.message);
      }


      
};

const deleteHabit = async event => 
  {
    event.preventDefault();

       
    var obj = {
          accessToken:tok,  
          habitID:props._id
          }


      var js = JSON.stringify(obj);

      try
      {
          // Axios code follows
          var config = 
          {
              method: 'post',
              url: bp.buildPath('api/deleteHabit'),        // or api/edit or api/searchcards
              headers: 
              {
                  'Content-Type': 'application/json'
              },
              data: js
          };

          axios(config)
          .then(function (response) 
          {
              var res = response.data;
              if (res.error) 
              {
                  setMessage(res.error);
              }
              else 
              {
                  if( res.error.length > 0 )
                  {
                      setMessage( "API Error:" + res.error );
                  }
                  else
                  {
                      setMessage('Habit has been added');
                      props.onHide();
                      setTimeout(() => {
                        
                        setEditMode(false);
                      }, 300);
                  }
              }
          })
          .catch(function (error) 
          {
              setMessage(error);
          });

      }
      catch(e)
      {
          setMessage(e.message);
      }


      
};

useEffect(() => {

  if (props.Checkins.length !== 0) {
     setStreak(props.Checkins[props.Checkins.length - 1].currStreak)
     setLStreak(props.Checkins[props.Checkins.length - 1].longestStreak)

  }
  else {
    setStreak(0)
    setLStreak(0)
  }
},[props.Checkins.length])






//  useEffect(() => {
//     setColor(props.Color);
    
//     setDesc(props.Description);
//     setAmount(props.TimesPerOccurence);
//     setOccur(props.Occurence);

// });






  const closeModal = async event => {
  
    
    
    props.onHide();


    setTimeout(() => {
      //setShowIcons(true);
      setEditMode(false);
      setColor(props.Color);
    
      setDesc(props.Description);
      setAmount(props.TimesPerOccurence);
      setOccur(props.Occurence);
    }, 300);

  }




  return (
    <Modal
    scrollable
      backdrop='static'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
     
    >
      <Modal.Header>
        
            <div className = "container">
            <div className = "row justify-content-center align-items-center mx-auto" >
                <div className="col-6" align="center" style={{ fontFamily: 'Bungee', fontSize: 25, textAlign:"center" }}>
                {props.HabitName}
                </div>
         
          </div>
          <div className="row justify-content-center align-items-center" style={{height: 140 }}>
              <div className="col-6 " align="center" style={{ width:140, height:140}}>
              <img style={{  marginTop: 17, maxWidth:140, maxHeight:110 }} src={IconsArr[props.Icon]} alt="habit"/>
              </div>

          </div>
          </div>
       
      </Modal.Header>


      {
        
          <Modal.Body>
            

            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Description</h8>


{       editMode ?     <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={desc} onChange={(c) => setDesc(c.target.value)}></textarea>
                        : <p><strong>{props.Description}</strong> </p>
}
            <br></br>
           
            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Occurrence</h8>

           { !editMode ? <p><strong>{amount} time(s) {occur}</strong></p> :

            <select class="form-control" id="exampleFormControlSelect1" value={occur} onChange={(c) => setOccur(c.target.value)}>
              <option>daily</option>
              <option>weekly</option>
            </select>

            }

            
            {editMode && <br></br>}
           {editMode && <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Times Per Occurrence</h8>}


            { editMode && <select class="form-control" id="exampleFormControlSelect1" value={amount} onChange={(c) => setAmount(c.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>


            </select>
}
            <br></br>
            

            { !editMode && <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Streak</h8>}
            {!editMode && <p><strong>{streak}</strong></p>}
            <br></br>
            
            { !editMode && <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Longest Streak</h8>}
            
     
            {!editMode && <p><strong>{lstreak}</strong></p>}
            

           { editMode && <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Choose A Color</h8>}

            {editMode && <div className="container">
              <div className="row" style={{ height: 38, marginTop: 10 }}>
                <div
                  className="col-1" style={{ backgroundColor: "#8DCAD4", borderRadius: 100, marginRight: 10, border: color === "#8DCAD4" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#8DCAD4")}></div>
                <div
                  className="col-1" style={{ backgroundColor: "#EDBBB4", borderRadius: 100, marginRight: 10, border: color === "#EDBBB4" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#EDBBB4")}></div>
                <div
                  className="col-1" style={{ backgroundColor: "#FCB4B6", borderRadius: 100, marginRight: 10, border: color === "#FCB4B6" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#FCB4B6")}></div>
                <div
                  className="col-1" style={{ backgroundColor: "#DBABBE", borderRadius: 100, marginRight: 10, border: color === "#DBABBE" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#DBABBE")}></div>
              </div>
              <div className="row" style={{ height: 38, marginTop: 10 }}>
                <div
                  className="col-1" style={{ backgroundColor: "#BAA1A7", borderRadius: 100, marginRight: 10, border: color === "#BAA1A7" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#BAA1A7")}></div>
                <div className="col-1" style={{ backgroundColor: "#FCEAC6", borderRadius: 100, marginRight: 10, border: color === "#FCEAC6" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#FCEAC6")}></div>
                <div
                  className="col-1" style={{ backgroundColor: "#B7A2CC", borderRadius: 100, marginRight: 10, border: color === "#B7A2CC" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#B7A2CC")}></div>
                <div
                  className="col-1" style={{ backgroundColor: "#CDF1AE", borderRadius: 100, marginRight: 10, border: color === "#CDF1AE" ? "3px solid red" : "0px solid red" }}
                  onClick={() => setColor("#CDF1AE")}></div>
              </div>
            </div>}


          </Modal.Body>

          

        //   <Modal.Body scrollable>
        //     <div className="container">
        //       <div className="row">
        //         <div className="col">
        //           <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Choose An Icon</h8>

        //         </div>
        //       </div>
        //       <div className="row" style={{marginTop: 40}}>
                

               
        //          { IconsArr.map((eachIcon, index) => (
        //           <div className="col-lg-2 col-sm-6">
        //           <div style={{ width: 100, height: 100, margin:"5%", padding:10 }}>
        //             <img style={{ width: "100%", marginTop: -5, borderRadius:10 ,border: icon === index ? "3px solid #EDBBB4" : "0px solid #EDBBB4"  }} src={eachIcon} alt="icon" key={index} onClick={() => setIcon(index)}/>
        //           </div>
        //         </div>

        //         ))}
        //       </div>
        //     </div>

        //         <div>{tok}</div>

        //   </Modal.Body>



      }
      <Modal.Footer>

         {editMode && <Button onClick={deleteHabit} variant="secondary">Delete</Button>}
         { editMode && <Button onClick={editHabit} variant="secondary">Save</Button>}
          {!editMode && <Button onClick={()=> setEditMode(true)} variant="secondary">Edit</Button>}
        <Button onClick={closeModal} variant="secondary">Exit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;