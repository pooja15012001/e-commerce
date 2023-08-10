// import { useEffect, useState } from 'react';
// import { db } from '../Service/firebase.config';

// const MyComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Set up a listener for real-time updates
//     const dataRef = db.ref('myData');
//     dataRef.on('value', (snapshot) => {
//       const data = snapshot.val();
//       setData(data);
//     });

//     // Clean up the listener when the component unmounts
//     return () => dataRef.off('value');
//   }, []);

//   return (
//     <div>
//       {data && Object.keys(data).map((key) => (
//         <div key={key}>{data[key]}</div>
//       ))}
//     </div>
//   );
// };

// export default MyComponent;
