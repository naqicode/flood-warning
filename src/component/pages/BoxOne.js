import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./BoxOneCss.css";

//IMporting the city Geometry
import { statesData } from './NewData';

//Importing modal component to use for modal window




//Importing the library for the Leaflet Map
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const center = [52.90330510839568, -1.1862272800848968];




function BoxOne() {
  //UseState
  const [countyList, setCountyList] = useState("");
  const [dataTwo, setDataTwo] = useState(''); //usestate for second API
  //NEW DATA



  //Function getCounties
  const getCounties = () => {
    axios
      .get("https://environment.data.gov.uk/flood-monitoring/id/floods")
      //.then
      .then((res) => {
        const newData = res.data.items;
        
        //set the countyList for useState()
        setCountyList(
          newData.map((el) => {
            return el; //it should be el.floodArea.county
          })
        );

        //NEW DATA
        


      })
      //.catch
      .catch((error) => {
        console.log(error);
      });
  };
  //useEffect to run the function getCounties once the page loads
  useEffect(() => {
    getCounties();
  }, [countyList]);




  //SECOND API FOR THE MARKER AND POPUP COMPONENT

  useEffect(() => {
    axios.get('https://environment.data.gov.uk/flood-monitoring/id/floodAreas')
    .then(response => setDataTwo(response.data.items))
    .catch(error => console.log(error))
  }, []);











  return (
    <div>
      <div>
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={true}
          style={{
            width: "70vw",
            height: "70vh",
            position: "relative",
            left: "500px",
            top: "50px",
          }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=QEKtqsx9T1xF2GHc6yu6"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
             />





          {/* Geo location for the cities to highlight */}
          {/* Geo location for the cities to highlight */}
          {/* Geo location for the cities to highlight */}
          {/* Geo location for the cities to highlight */}

          {
            statesData.features.map((state, index) => {
              const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

              return  (<Polygon
                  key={index}
                  pathOptions={{
                    fillColor: '#FD8D3C',
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    dashArray: 3,
                    color: 'white'
                  }}
                  positions={coordinates}
                />)
            })
          }













          {dataTwo &&
            dataTwo.map((item, index) => {
              return (
                <Marker
                  key={index}
                  position={[item.lat, item.long]}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [10, 20],
                      iconAnchor: [12, 41],
                    })
                  }
                >







                <Popup key={index}>
                <div className="popupContent">

                <h3 className="label">{item.label}</h3>

                  <h4>Area Name:{item.eaAreaName}</h4>
                  <h4>Nearby River or Sea: {item.riverOrSea}</h4>
                  <h4>Emergency number to dial: {item.quickDialNumber}</h4>
                  <h4>Map longitude: {item.long}</h4>
                  <h4>Map Latitude: {item.lat}</h4>
                  <h4>FWD code: {item.fwdCode}</h4>
                  <h4>Description: {item.description}</h4>
              
                
          



                </div>
                    </Popup>
               
                  









                  
                </Marker>
              );
            })}


        </MapContainer>

   



      </div>

      <div className="container">
        <ul className="nobull">
          {countyList &&
            countyList?.map((ele, index) => <li key={index}>{ele.floodArea.county}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default BoxOne;
