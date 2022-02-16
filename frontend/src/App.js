import * as React from 'react';
import { useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./app.css";

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  
  return (
    <div className="App">
    <Map
      initialViewState={{
        latitude: 48.78,
        longitude: 2.47,
        zoom: 5
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      <Marker longitude={2.2945} latitude={48.8584} color="red">
        <RoomIcon style={{fontSize: "3em", color: "slateblue"}} />
      </Marker>
      {/* <Popup 
        longitude={2.2945}
        latitude={48.8584}
        closeButton={true}
        closeOnClick={false}
        anchor="left">
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>Eiffell Tower</h4>
          <label>Review</label>
          <p className='desc'>Beautiful place. I like it.</p>
          <label>Rating</label>
          <div className='stars'>
          <StarIcon className='star' />
          <StarIcon className='star' />
          <StarIcon className='star' />
          <StarIcon className='star' />
          <StarIcon className='star' />

          </div>

          <label>Information</label>
          <span className='username'>Created by <b>charles</b></span>
          <span className='date'>1 hour ago</span>
          </div>
      </Popup> */}
      
    </Map>
     
    </div>
  );
}

export default App;


