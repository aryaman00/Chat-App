import React,{useState,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import $ from 'jquery';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyCJlxvwZUWrxbrKYnFUFTAPhJfA4iWX8I4",
  authDomain: "chat-app-dd843.firebaseapp.com",
  databaseURL:"https://chat-app-dd843-default-rtdb.firebaseio.com/",
  projectId: "chat-app-dd843",
  storageBucket: "chat-app-dd843.appspot.com",
  messagingSenderId: "275452961801",
  appId: "1:275452961801:web:7d3872f0ef10ba8c5484d8",
  measurementId: "G-MFJH9M6VKK"
});

const auth=firebase.auth();
const firestore =firebase.firestore();



function App()
{
  const [user]=useAuthState(auth);
  function changeCss(e){
    if(e.target.checked==true)
    document.body.style.backgroundColor="white";
    else
    document.body.style.backgroundColor="#282c34";
  }
  return (
    <>
    <nav className="navbar navbar-expand-sm bg-primary navbar-light justify-content-between" style={{border:'3px solid white',borderRadius:'5px'}}>
    <a className='navbar-brand neonText'><img className='App-logo pic' src={logo}  alt="logo"/> Super Chat</a>
  <ul className="navbar-nav  d-flex">
    
     
    
    <div class="d-flex flex-row-reverse">
  <div class="p-2"><li className="nav-item" style={{color:'white'}}><b>Dark Mode :ON</b><label className="switch">
  <input type="checkbox" class="cc" onChange={(e)=>changeCss(e)}/>
  <span className="slider round"></span>
</label><b>:OFF</b></li></div>
</div>
    
    <li className="nav-item" style={{position:'flex',left:'0'}}><SignOut /></li>
  </ul>
</nav>        
    <div className="container-fluid" >  
      <section style={{position:'relative'}}>
        
        {user ? <ChatRoom />:<SignIn />}
        
        </section>
    </div>
    </>
  );
}

function SignIn(){
  const signInWithGoogle=()=>{
    const provider= new firebase.auth.GoogleAuthProvider();
   auth.signInWithPopup(provider); }
  return (
    <>
    <div className="jumbotron text-center bg-primary">
    <img src={"https://media.giphy.com/media/MfnJATkfrAIBG/giphy.gif"} className="App-logo" alt="logo" />
      <h1 className="neonText">Super Chat Room</h1>
      </div>
        <div className="d-flex justify-content-center" >
<button  className="btn btn-warning btn-md" onClick={signInWithGoogle}><h1 style={{}} ><img src="https://img.icons8.com/fluent/96/000000/google-logo.png"/> Sign In </h1></button>
</div>
<hr />
<div class="container" >
  <div className="row">
    <div className="col-sm-4 text-center bg-info" style={{borderRadius:'20px'}} >
      <h1>About This App</h1>
      <p>This is a simple chat room based on ReactJs with a backend support of firebase created by:<br/> Aryaman:Firebase & React<br />Abhinandan:Javascript & React<br />Dipanshu:Bootstrap &CSS<br />Abhinav:Bootstrap &Css</p>
       </div>
    <div className="col-sm-4" > </div>
    <div className="col-sm-4 text-center bg-warning" style={{borderRadius:'20px'}}><h1>Contact Us:</h1><br />
    <a href="https://www.facebook.com/" className="fa fa-facebook"></a>
<a href="https://twitter.com/" className="fa fa-twitter"></a>
<a href="https://mail.google.com/mail/u/0/#inbox" className="fa fa-google"></a>
<a href="https://in.linkedin.com/" className="fa fa-linkedin"></a>
<br />
<a href="https://www.youtube.com/" className="fa fa-youtube"></a>
<a href="https://www.instagram.com/" className="fa fa-instagram"></a>
    </div>
    </div>
  </div>
</>
  );
}
 function SignOut(){
   return auth.currentUser &&(
<button onClick={()=>auth.signOut() } className='btn btn-warning' >Sign out</button>
   );
 }
function ChatRoom(){
  const dummy=useRef();
  const messagesRef=  firestore.collection('newmsg');
  const query=messagesRef.orderBy('createdAt').limit(25);
  const [messages]=useCollectionData(query,{idField:'id'});

   const[formValue,setFormValue]=useState('');

   
  const sendMessage = async(e)=>{
e.preventDefault();
const{uid,displayName,photoURL}=auth.currentUser;
await messagesRef.add({
  text:formValue,
  createdAt:firebase.firestore.FieldValue.serverTimestamp(),
  uid,
  photoURL,
  displayName
})
setFormValue('');
dummy.current.scrollIntoView({behavior:'smooth'})
}

  return (
    <>
    <div>
       
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      <div ref={dummy} className="container">

        </div>
      </div>
      <div className="container-fluid" >
      <form onSubmit={sendMessage} >
        <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} className="ip form-control-plaintext bg-light" style={{border:'3px solid grey',borderRadius:'30px 0px 0px 30px'}} placeHolder="Enter Your Message here" />
        <button type="submit" className="btn btn-info" style={{fontSize:'24px',border:'3px solid #61daf',borderRadius:'0px 30px 30px 0px'}} disabled={!formValue}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
</svg></button>
      </form>
      </div>
</>

  );
}
function ChatMessage(props){ 
  const {text,uid,photoURL,displayName}=props.message;
const messageClass= uid===auth.currentUser.uid?'sent':'received';

  return  (
    <div className={`message ${messageClass}`} >
   <img className='p' src={photoURL}  title={displayName} />
        <name className="name" >:{displayName}</name>
      <p style={{display:'block'}}>{text}</p>
      
      </div>
  
    )
}
export default App;
