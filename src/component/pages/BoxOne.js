import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./BoxOneCss.css";

//Importing NewData file
import { countyCoordinates } from './NewData';






//Importing the library for the Leaflet Map
import { MapContainer, TileLayer, Marker, Popup, Polygon} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const center = [52.90330510839568, -1.1862272800848968];




function BoxOne() {
  //UseState
  const [dataOne, setDataOne] = useState("");
  const [dataTwo, setDataTwo] = useState(''); //usestate for second API
  //NEW DATA useState
  const [newDatas, setNewDatas] = useState('');

  //MODAL FOR ALERTS SECTION
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);




  //Function getCounties
  const getCounties = () => {
    axios
      .get("https://environment.data.gov.uk/flood-monitoring/id/floods")
      //.then
      .then((res) => {
        const newData = res.data.items;
        
        //set the countyList for useState()
        setDataOne(
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
  }, [dataOne]);




  //SECOND API FOR THE MARKER AND POPUP COMPONENT

  useEffect(() => {
    axios.get('https://environment.data.gov.uk/flood-monitoring/id/floodAreas')
    .then(response => setDataTwo(response.data.items))
    .catch(error => console.log(error))
  }, []);



  //useEffect for NEW DATA

  useEffect(() => {
    const listOfCounty = countyCoordinates.features;
    setNewDatas(listOfCounty.map((element) => {
      return element;
    }))
  }, [])



  //Handle Click function for ALERT SECTION
  const handleClick = (data) => {
    setSelectedData(data);
    setModalOpen(true);
  }











  return (


    <div>
      <div>
        <MapContainer
        
        
          center={center}
          zoom={6}
          scrollWheelZoom={true}
          style={{
            width: "70vw",
            height: "74vh",
            position: "relative",
            left: "500px",
            display: "flex",
            top: "62px",
          }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=QEKtqsx9T1xF2GHc6yu6"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
             />





          {/* Geo location for the counties to highlight */}
          {/* Geo location for the counties to highlight */}
          {/* Geo location for the counties to highlight */}
          {/* Geo location for the counties to highlight */}

          {
            countyCoordinates.features.map((state, index) => {
              const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

              return  (<Polygon
                  key={index}
                  pathOptions={{
                    fillColor: '#FD8D3C',
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    dashArray: '3',
                    color: 'white'
                  }}
                  positions={coordinates}



                  eventHandlers={{
                    mouseover: (e) => {
                      var layer = e.target;
                        layer.setStyle({
                        fillOpacity: 0.7,
                        weight: 5,
                        dashArray: '',
                        color: '#666',
                        fillColor: '#d45962'
                      })
                      
                    },
                    mouseout: (e) => {
                      const layer = e.target;
                      layer.setStyle({
                        fillOpacity: 0.7,
                        weight: 2,
                        dashArray: '',
                        color: 'white',
                        fillColor: '#FD8D3C'
                      })
                    },
                    click: (e) => {
                      
                        
                      
                      
                      
                      
                    }
                  }}
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





      


     

        <ul className="nobull">
            <h3>Alets</h3>

              {dataOne &&
              dataOne?.map((ele, index) => (
              <li key={index}> 
              <button onClick={() => handleClick(ele)} className="button-list">{ele.floodArea.riverOrSea}</button></li>
              ))
            }


              {modalOpen && (
                <div className="modal-overlay">
                  <div className="modal">

                    <div className="info">
                    <p>Description: {selectedData.description}</p>
                    <p>Area Name: {selectedData.eaAreaName}</p>
                    <p>County Name: {selectedData.floodArea.county}</p>
                    <p>River Name: {selectedData.floodArea.riverOrSea}</p>
                    <p>Flood Area ID: {selectedData.floodAreaID}</p>
                    <p>Message: {selectedData.message}</p>
                    <p>Severity Des: {selectedData.severity}</p>
                    <p>Severity Level: {selectedData.severityLevel}</p>
                    <p>Time Of message Change: {selectedData.timeMessageChanged}</p>
                    <p>Time Raised: {selectedData.timeRaised}</p>
                    <p>Time The severity Changed: {selectedData.timeSeverityChanged}</p>
                    </div>


                    <button onClick={() => setModalOpen(false)}>Close</button>
                  </div>
                </div>
              )}








        </ul>
 




      
    </div>
  );
}

export default BoxOne;
