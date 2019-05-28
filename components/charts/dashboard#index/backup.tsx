// import {
//   Base,
//   Constants,
//   Geolocation,
//   InfoWindow,
//   Map,
//   Marker,
//   MarkerClusterer,
//   PointCollection,
// } from '@core/rc-bmap';
// import React, { useState } from 'react';
// import styleJson from './style.json';

// const { Point, Events, Path } = Base;
// const { Title, Content } = InfoWindow;
// const { CONTROL_ANCHOR, SHAPE_TYPE, SIZE_TYPE } = Constants;

// export default (props: any) => {
//   const points = props.points.filter(i => i.lng && i.lat);
//   const [info, setInfo] = useState({ visible: false, activeIndex: 0 });
//   const closeInfo = () =>
//     setInfo({
//       visible: false,
//       activeIndex: 0,
//     });
//   const handleMarkerClustererClick = a => {
//     // console.log(a);
//   };

//   const activePoint = points[info.activeIndex] || {
//     lng: '121.482782',
//     lat: '31.207978',
//   };

//   return (
//     <Map
//       ak="GjvS6Dlao5YyR4wzR37Nju8VWX7Gxz9d"
//       scrollWheelZoom
//       mapStyleV2={{ styleJson }}
//       zoom={10}
//       minZoom={4}
//     >
//       <Point name="center" lng="121.482782" lat="31.207978" />
//       <MarkerClusterer dataSource={points} />
//       {/* <PointCollection
//         shape={SHAPE_TYPE.STAR}
//         size={SIZE_TYPE.BIGGER}
//         color="#d340c3"
//       >
//         {points.map((item, index) => (
//           <Marker key={index}>
//             <Point lng={item.lng} lat={item.lat} />
//           </Marker>
//         ))}
//       </PointCollection> */}
//       <Geolocation anchor={CONTROL_ANCHOR.BOTTOM_RIGHT} />
//       <InfoWindow visible={info.visible}>
//         <Point lng={activePoint.lng} lat={activePoint.lat} />
//         <Title>{activePoint.sales}</Title>
//         <Content>
//           <p>{activePoint.sales}</p>
//           <p>{activePoint.sales}</p>
//           <p>{activePoint.sales}</p>
//         </Content>
//         <Events close={closeInfo} />
//       </InfoWindow>
//     </Map>
//   );
// };
