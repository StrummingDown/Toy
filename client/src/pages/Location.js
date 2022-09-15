import React, { useEffect } from "react";

const { kakao } = window;

export const Location = ({ searchPlace }) => {
  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.54848767687406, 127.06275444726965),
      //   draggable: false,
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    const ps = new kakao.maps.services.Places();

    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " + result[0].road_address.address_name + "</div>"
            : "";
          detailAddr += "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          var content = '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>' + detailAddr + "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
    // 키워드로 장소를 검색
    // ps.keywordSearch(searchPlace, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    // function placesSearchCB(data, status, pagination) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가
    //     let bounds = new kakao.maps.LatLngBounds();

    //     for (let i = 0; i < data.length; i++) {
    //       displayMarker(data[i]);
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    //     map.setBounds(bounds);
    //   }
    // }

    // function displayMarker(place) {
    //   // 마커를 생성하고 지도에 표시
    //   let marker = new kakao.maps.Marker({
    //     map: map,
    //     position: new kakao.maps.LatLng(place.y, place.x),
    //   });

    //   // 마커에 클릭이벤트를 등록
    //   kakao.maps.event.addListener(marker, "click", function () {
    //     // 마커를 클릭하면 장소명이 인포윈도우에 표출
    //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
    //     infowindow.open(map, marker);
    //   });
    // }

    // var mapTypeControl = new kakao.maps.MapTypeControl();
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // var zoomControl = new kakao.maps.ZoomControl();
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, [searchPlace]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>내 위치</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative" }} className="map_wrap">
          <div
            id="myMap"
            style={{
              width: "500px",
              height: "70vh",
              position: "relative",
              overflow: "hidden",
            }}
          ></div>
          <div style={{ position: "absolute", left: "10px", background: "#FFF", zIndex: "1" }} className="hAddr">
            <span style={{ fontWeight: "bold", display: "block" }} className="title">
              지도중심기준 행정동 주소정보
            </span>
            <span id="centerAddr"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
