// importing packages/libraries and MUI icons
import * as React from 'react';
import { useState, useEffect } from 'react';
import MapGL, {Marker, Popup, GeolocateControl, NavigationControl, ScaleControl, FullscreenControl } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";

import "./app.css";

//importing components
import Register from './components/Register';
import Login from './components/Login';
/*import {format} from "timeago.js";*/


import 'mapbox-gl/dist/mapbox-gl.css';



function App() {
  // setting state
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 4,
    
  }); 

  // gets all the pins and renders them on page load
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        
        setPins(allPins.data);
        console.log(allPins.data);
        console.log(pins);
      } catch (err) {
        console.log(err);
      }
    };
    
    getPins();
    
  }, []);

  // reposition the viewport when the user clicks on a pin to place the pin
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({...viewport, latitude: lat, longitude: long});
  };

  // allow the user to add a new pin
  const handleAddClick = (e) => {
    console.log(e);
    const longitude = e.lngLat.lng;
    const latitude = e.lngLat.lat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  // creates the new pin when user hits add pin
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long:newPlace.long,
    }

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);

    } catch(err) {
      console.log(err)

    }
  };

  // removes the user from local storage when they log out
const handleLogout = () => {
  myStorage.removeItem("user");
  setCurrentUser(null);
}

// setting different map styles so the user can switch the style
const styles = {
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11'
};

// setting the style state
const [styleId, setStyleId] = useState('dark');



/*const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
Map.setmapStyle('mapbox://styles/mapbox/' + layerId);
};
}*/


  

// MAP
  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
      <div id="menu">

<button onClick={() => setStyleId('light')} className={styleId === "light" ? "styleBtn active" : "styleBtn"}>Light</button>
<button onClick={() => setStyleId('dark')} className={styleId === "dark" ? "styleBtn active" : "styleBtn"}>Dark</button>
<button onClick={() => setStyleId('streets')} className={styleId === "streets" ? "styleBtn active" : "styleBtn"}>Streets</button>
<button onClick={() => setStyleId('outdoors')} className={styleId === "outdoors" ? "styleBtn active" : "styleBtn"}>Outdoor</button>
</div>
    <MapGL
      {...viewport}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ width: '100%', height: '100%' }}
      onMove={(viewport) => setViewport(viewport)}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      mapStyle={styles[styleId]}
      
      /*onViewportChange={setViewport}*/
      onDblClick = {handleAddClick}
      transitionDuration="200"
      
    >
      {pins.map((p) => (
        <>
         <Marker longitude={p.long} latitude={p.lat} color="red" key={p._id}>
         <RoomIcon style={{fontSize: "3em", color: p.username === currentUser ? "tomato" : "slateblue", cursor:"pointer"}} 
         onClick={() => handleMarkerClick(p._id,p.lat,p.long)}
         />
       </Marker>

       {p._id === currentPlaceId && (
  <Popup 
        key={p._id}
         longitude={p.long}
         latitude={p.lat}
         closeButton={true}
         closeOnClick={false}
         anchor="left"
         onClose={() => setCurrentPlaceId(null)}
         >
         <div className='card'>
           <label>Place</label>
           <h4 className='place'>{p.title}</h4>
           <label>Review</label>
           <p className='desc'>{p.desc}</p>
           <label>Rating</label>
           <div className='stars'>
           {Array(p.rating).fill(<StarIcon className='star' />)}
           
 
           </div>
 
           <label>Information</label>
           <span className='username'>Created by <b>{p.username}</b></span>
            {/* <span className='date'>{format(p.createdAt)}</span>  */}
           </div>
       </Popup> 
       )}
        </>
      ))}
      {newPlace && 
      <Popup 
         longitude={newPlace.long}
         latitude={newPlace.lat}
         closeButton={true}
         closeOnClick={false}
         anchor="left"
         onClose={() => setNewPlace(null)}
         >

           <div>
             <form onSubmit={handleSubmit}>
               <label>Title</label>
               <input placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)}/>
               <label>Review</label>
               <textarea placeholder='Say something about this plave' onChange={(e) => setDesc(e.target.value)}/>
               <label>Rating</label>
               <select onChange={(e) => setRating(e.target.value)}>
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
               </select>
               <button className='submitButton' type='submit'>Add Pin</button>
             </form>
           </div>
         </Popup> 
      } 
      {currentUser ? (<button className='button logout' onClick={handleLogout}>Log out</button>) 
      : (
      <div className='buttons'>
      <button className='button login' onClick={() => setShowLogin(true)}>Login</button>
      <button className='button register' onClick={() => setShowRegister(true)}>Register</button>
      </div>
      )}

        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage = {myStorage} setCurrentUser={setCurrentUser} />}
        <GeolocateControl position='top-right' />
        <NavigationControl showCompass showZoom position='bottom-left' />
        <ScaleControl unit='metric' position='bottom-right' />
        <FullscreenControl position='bottom-left' />
        
    </MapGL>
     
    </div>
  );
}

export default App;


