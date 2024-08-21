import React, { useEffect, useState } from "react";
import Card from "./Card";

const Crush = () => {
  const [crushData, setCrushData] = useState([]);

  useEffect(() => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setCrushData(likedMovies);
  }, []);

  return (
    <div className="crushes">
      {crushData.map((crush) => (
        <Card key={crush.id} movie={crush} />
      ))}
    </div>
  );
};

export default Crush;
