import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Button';
import IconsArr from './Icons';
import axios from 'axios';



//import axios from 'axios';



function AddModal(props) {

  const [color, setColor] = useState("");
  const [habitName, setHabitName] = useState('');
  const [desc, setDesc] = useState("");
  const [occur, setOccur] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState(-1);
  const [enableNext, setEnableNext] = useState(true)
  const [enableSave, setEnableSave] = useState(true)

  const [showIcons, setShowIcons] = useState(true);
  let date = new Date();


  const bp = require('./bp.js');
  const storage = require('../tokenStorage.js');
  const jwt = require("jsonwebtoken");

  var card = '';
  var search = '';

  const [message, setMessage] = useState('');



  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });

  //    var userId = ud.payload.id;
  var userId = ud.payload.userId;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;

  const addCard = async event => {
    event.preventDefault();

    var obj = { accessToken: tok, habitName: habitName, description: desc, occurence: occur, currentDate: date, color: color, icon: icon, timesPerOccurence: amount };


    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config =
      {
        method: 'post',
        url: bp.buildPath('api/addHabit'),        // or api/addcard or api/searchcards
        headers:
        {
          'Content-Type': 'application/json'
        },
        data: js
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            setMessage(res.error);
          }
          else {
            if (res.error.length > 0) {
              setMessage("API Error:" + res.error);
            }
            else {
              setMessage('Habit has been added');
          
              setTimeout(() => {
                closeModal();
              }, 300);
            }
          }
        })
        .catch(function (error) {
          setMessage(error);
        });

    }
    catch (e) {
      setMessage(e.message);
    }



  };


  useEffect(() => {

    console.log(color)
    if (color !== "" && habitName !== "" && desc !== "" && occur !== "" && amount !== "") {
      setEnableNext(false)

      if (icon !== -1) {
        setEnableSave(false)
      }

    }


  })












  const closeModal = async event => {
    setColor("");
    setHabitName("");
    setDesc("");
    setAmount("");
    setOccur("");
    setIcon(-1);

    props.onHide();
    setEnableNext(true)
    setEnableSave(true)


    setTimeout(() => {
      setShowIcons(true);
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
        <Modal.Title id="example-custom-modal-styling-title">
          <h6 style={{ fontFamily: 'Bungee', fontSize: 25 }}>Create Habit</h6>
        </Modal.Title >
      </Modal.Header>


      {
        showIcons ?
          <Modal.Body>
            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Habit Name</h8>
            <input type="text" className="form-control" placeholder="E.g. Drink Water " value={habitName} onChange={(c) => setHabitName(c.target.value)} />
            <br></br>
            <br></br>

            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Description</h8>

            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={desc} onChange={(c) => setDesc(c.target.value)}></textarea>

            <br></br>
            <br></br>
            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Occurrence</h8>

            <select class="form-control" id="exampleFormControlSelect1" value={occur} onChange={(c) => setOccur(c.target.value)}>
              <option hidden ></option>
              <option>daily</option>
              <option>weekly</option>


            </select>

            <br></br>
            <br></br>
            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Times Per Occurrence</h8>

            <select class="form-control" id="exampleFormControlSelect1" value={amount} onChange={(c) => setAmount(c.target.value)}>
              <option hidden ></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>


            </select>

            <br></br>
            <br></br>
            <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Choose A Color</h8>
            <div className="container">
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
            </div>


          </Modal.Body>

          :

          <Modal.Body scrollable>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h8 style={{ fontFamily: 'Bungee', fontSize: 17 }}>Choose An Icon</h8>

                </div>
              </div>
              <div className="row" style={{ marginTop: 40 }}>



                {IconsArr.map((eachIcon, index) => (
                  <div className="col-lg-2 col-sm-6">
                    <div style={{ width: 100, height: 100, margin: "5%", padding: 10 }}>
                      <img style={{ width: "100%", marginTop: -5, borderRadius: 10, border: icon === index ? "3px solid #EDBBB4" : "0px solid #EDBBB4" }} src={eachIcon} alt="icon" key={index} onClick={() => setIcon(index)} />
                    </div>
                  </div>

                ))}
              </div>
            </div>

            <div>{tok}</div>

          </Modal.Body>



      }
      <Modal.Footer>

        {showIcons ? <Button onClick={() => setShowIcons(false)} variant="secondary" disabled={enableNext}>Next</Button>
          : <Button onClick={() => setShowIcons(true)} variant="secondary">Prev</Button>}
        {showIcons ? <></> : <Button onClick={addCard} variant="secondary" disabled={enableSave}>Save</Button>}
        <Button onClick={closeModal} variant="secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;