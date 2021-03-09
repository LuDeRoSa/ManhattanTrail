// import React from "react";

// const Marker = (props) => {
//   const { color, name, id, points } = props;
//   return (
//     <div
//       className="marker"
//       style={{ backgroundColor: color, cursor: "pointer" }}
//       title={name}
//     />
//   );
// };

// export default Marker;

import React from "react";

const Marker = (props) => {
  const { color, name } = props;
  console.log("this is the marker");
  return (
    <div
      className="marker"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
};

export default Marker;
