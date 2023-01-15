// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { useEffect } from 'react'


// function BoxOne() {

//   const [countyList, setCountyList] = useState('')


//     const getCounties = () => {
//         axios.get('https://environment.data.gov.uk/flood-monitoring/id/floods')
//         //.then
//         .then(res => {
//           const newData = res.data.items;
         
//           setCountyList(newData.map(el => {
//             return el.floodArea.county
//           }))
//         })
//         //.catch
//         .catch(error => {
//           console.log(error)
//         })
//     }

//     //useEffect to run the function getCounties once the page loads
//     useEffect(() =>{
//       getCounties();
      
//     }, [countyList])



//   return (
//     <div>       

//       <div>
//         <ul>
//           {countyList && countyList?.map((ele, index) => <li key={index}>{ele}</li>) } 
//         </ul>
//       </div>
     
//     </div>
//   )
// }

// export default BoxOne




