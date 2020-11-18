import React from 'react';

// const ItemList = [{
//   list01: {
//     tag: "sv1",
//     title:"dfkjdfkjdfkjdfkj1",
//     video: "video1",
//     hour: "hour1",
//     people: "people1",
//     rating:5,
//   },
//   list02: {
//     tag: "sv2",
//     title:"dfkjdfkjdfkjdfkj2",
//     video: "video2",
//     hour: "hour2",
//     people: "people2",
//     rating:5,
//   },
//   list03: {
//     tag: "sv3",
//     title:"dfkjdfkjdfkjdfkj3",
//     video: "video3",
//     hour: "hour3",
//     people: "people3",
//     rating:5,
//   },
//   list04: {
//     tag: "sv4",
//     title:"dfkjdfkjdfkjdfkj4",
//     video: "video4",
//     hour: "hour4",
//     people: "people4",
//     rating:5,
//   }
// }]

const BoxCard: React.FC = () => {
  return (
    <div
      style={{
        padding: '40px',
        width: '280px',
        height: '360px',
        background: '#fff',
        boxShadow: '0 2px 6px 0',
      }}
    >
      {/* {
        ItemList.map((item, index) => {
          return (
            <div>{item}</div>
          )
        })
      } */}
    </div>
  );
};

export default BoxCard;
