import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './BoxOneCss.css';
import dataMarker from './data/data-marker.json';


//Importing the library for the Leaflet Map
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet';
const center = [52.15774515198826, -1.8251373028708429];





function BoxOne() {
  //UseState
  const [countyList, setCountyList] = useState('')

    //Function getCounties
    const getCounties = () => {
        axios.get('https://environment.data.gov.uk/flood-monitoring/id/floods')
        //.then
        .then(res => {
          const newData = res.data.items;
          //set the countyList for useState()
          setCountyList(newData.map(el => {
            return el.floodArea.county
          }))
        })
        //.catch
        .catch(error => {
          console.log(error)
        })
    }
    //useEffect to run the function getCounties once the page loads
    useEffect(() =>{
      getCounties();
    }, [countyList])



    //LEAFLET MAP location CODES




    
  return (
    <div>       




        <div>
          <MapContainer
            center={center}
            zoom={6}
            scrollWheelZoom={true}
            style={{ width: '70vw', height: '70vh', position: 'relative', left: '500px', top:'50px'}}
          >
            <TileLayer
              url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=QEKtqsx9T1xF2GHc6yu6'
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />


            {dataMarker.items.map(mark => (
            
                
              <Marker 
              key={mark['@id']}
              position={[mark.lat, mark.long]}
              icon={new Icon({iconUrl: markerIconPng, iconSize: [10,20], iconAnchor: [12, 41]})}>


              <Popup
                position={[mark.lat, mark.long]}>
                  <div>
                    {/*Make an alert or something similar*/}
                    (<h2>{mark.description}</h2>) 
                    </div>
              </Popup>
              
              </Marker>
            ))}



        
          </MapContainer>
        </div>




    

      <div className='container'>
        <ul className='nobull'>
          {countyList && countyList?.map((ele, index) => <li key={index}>{ele}</li>) } 
        </ul>
      </div>






    </div>
  )
}

export default BoxOne