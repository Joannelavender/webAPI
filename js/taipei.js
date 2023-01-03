const temperatureAll = document.querySelectorAll(".temperature");
const symbolImgAll = document.querySelectorAll(".symbol-img");
const cloud = `https://i.imgur.com/BeWfUuG.png`;
const sunny = `https://i.imgur.com/Shrg84B.png`;
const week = ["MON", "TUE", "WED", "THR", "FRI"];
let allStr = "";

// console.log(symbolImgAll[0].src);

$(function () {
  $.ajax({
    url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-689470A3-511B-40BF-875A-ADAE7D3A190B",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      // console.log(data.records.locations[0]);
      // console.log(data.records.locations[0].location[4].locationName);
      // console.log(data.records.locations[0].location[4].weatherElement[1].time);
      // console.log(
      //   data.records.locations[0].location[4].weatherElement[1].time[0]
      //     .elementValue[0].value
      // );

      $("#city_name").html(data.records.locations[0].locationsName);
      $("#district").html(data.records.locations[0].location[4].locationName);
      $("#tempture").html(
        data.records.locations[0].location[4].weatherElement[1].time[0]
          .elementValue[0].value + `&#176`
      );

      for (let i = 0; i < 5; i++) {
        // temperatureAll[i].innerHTML =
        //   data.records.locations[0].location[4].weatherElement[1].time[i * 2]
        //     .elementValue[0].value + `&#176`;

        let currentWeather =
          data.records.locations[0].location[4].weatherElement[1].time[i * 2]
            .elementValue[0].value;

        let str = `<div class="d-flex flex-column block">
            <small class="text-muted mb-0">${week[i]}</small>
            <div class="text-center">
              <img class="symbol-img" src="${
                currentWeather > 18 ? sunny : cloud
              }" />
            </div>
            <h6><strong class="temperature">${
              data.records.locations[0].location[4].weatherElement[1].time[
                i * 2
              ].elementValue[0].value
            }&#176;</strong></h6>
            </div>`;

        allStr += str;

        // if (current > 18) symbolImgAll[i].src = sunny;
        // else symbolImgAll[i].src = cloud;
      }
      $("#weekday").html(allStr);
    },
    error: function (res) {
      console.log(res);
    },
  });
});
