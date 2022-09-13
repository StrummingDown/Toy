import React, { useEffect } from "react";

const { kakao } = window;

export const Location = () => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>내 위치</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          id="myMap"
          style={{
            width: "500px",
            height: "80vh",
          }}
        ></div>
      </div>
    </div>
  );
};
