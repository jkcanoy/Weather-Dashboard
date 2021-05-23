// save to local storage
  //   var savedCity = localStorage.getItem("city name");
  //   var storeArr;
  //   if (savedCity === null) {
  //     storeArr = [];
  //   } else {
  //     storeArr = JSON.parse(savedCity);
  //   }

  //   var cityName = {
  //       city: searchEl.value.trim()
  //   };

  //   storeArr.push(cityName);

  //   var storeArrString = JSON.stringify(storeArr);
  //   window.localStorage.setItem("city name", storeArrString);

  var savedCity = localStorage.getItem("city name");
//   if (savedCity === null) {
//     return;
//   }

//   var storedCity = JSON.parse(savedCity);

//   for (var i = 0; i < storedCity.length; i++) {
//     var cityDiv = $(
//       '<button type="button" class="btn btn-outline-primary" style="width: 100%;"></button>'
//     );
//     cityDiv.text = storedCity[i].city;
//     var olderSearch = $("<div>");
//     olderSearch.append(cityDiv);
//     $("#searchHistory").prepend(olderSearch);
//     var historyDiv = $(
//       '<button type="button" class="btn btn-outline-primary" style="width: 100%;"></button>'
//     ).text(lastCity);
//     var olderSearch = $("<div>");
//     olderSearch.append(historyDiv);
//     $("#searchHistory").prepend(olderSearch);