let food_url =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.8344396&lng=77.5698527&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

fetch(food_url)
  .then((data) => data.json())
  .then((data) => {
    console.log(data);

    let restaurants =
      data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log(restaurants);

    // let card = document.getElementById("class");
    // let search_bar = document.getElementById("search_bar");
    let input_item = document.getElementById("input_item");
    // let restaurant_card = document.getElementById("restaurant-card");
    let filterFood = restaurants;

    let modelCategory = document.getElementById("category");
    const containerFluidRows =
      modelCategory.getElementsByClassName("card-container")[0];

    let htmlContent1 = "";

    let htmlContent2 = "";

    input_item.addEventListener("keyup", function () {
      console.log(input_item.value);
      let lowers = input_item.value.toLowerCase();

      filterFood = restaurants.filter((food) =>
        food.info.name.toLowerCase().includes(lowers)
      );

      getFood(htmlContent2);
      console.log(filterFood);
    });

    console.log(filterFood);

    function getFood(foodItem) {
      for (const element of filterFood) {
        foodItem += `
<a href="#menu-category" class="card">
<div class="restaurant-card">
       <div class="image-container">
                    <img
                       src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${
                         element.info.cloudinaryImageId
                       }"  alt="...">
                    <div class="discount-badge">${
                      element?.info?.aggregatedDiscountInfoV3?.header
                        ? element?.info?.aggregatedDiscountInfoV3?.header
                        : "20% OFF"
                    } ${
          element?.info?.aggregatedDiscountInfoV3?.subHeader
            ? element?.info?.aggregatedDiscountInfoV3?.subHeader
            : " UPTO ₹50"
        }</div>
                </div>
                <h3 class="restaurant-name">${element.info.name}</h3>
                <div class="info-container">
                    <div class="info-row">
                        <div class="rating">
                            <span class="rating-star icons"><i class="bi bi-star-fill star"></i></span>
                            <span class="review-count">${
                              element.info.avgRating
                            }</span>
                        </div>
                        <div class="delivery-info">
                            <i class="bi bi-dot"></i>${
                              element.info.sla.slaString
                            }
                        </div>
                    </div>
                    <p id="info_para">${element.info.cuisines.join(", ")}</p>
                    <p id="location"><span class="icons location-icon"><i class="bi bi-geo-alt-fill"></i></span>${
                      element.info.locality
                    }</p>
                </div>
  </div>
</a>`;
      }
      containerFluidRows.innerHTML = foodItem;
    }

    getFood(htmlContent1);

    // menu page

    let foodCard = document.getElementsByClassName("card");

    Array.from(foodCard).forEach((element, index) => {
      element.addEventListener("click", () => {
        console.log(restaurants[index].info.id);
        let menu_url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.8344396&lng=77.5698527&restaurantId=${restaurants[index].info.id}`;

        console.log(menu_url);

        fetch(menu_url)
          .then((data) => data.json())
          .then((data) => {
            console.log(data);

            console.log(data?.data?.cards[2]?.card?.card?.info?.name);

            let containerFluidRows2 = document.getElementById("menu-container");
            containerFluidRows2.innerHTML = `
            <div class="menu-container">
              <div class="menu-header">
                <img class="res-img" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${
                  data?.data?.cards[2]?.card?.card?.info?.cloudinaryImageId ||
                  ""
                }" alt="Restaurant Image">
                <h3 class="restaurant-name">${
                  data?.data?.cards[2]?.card?.card?.info?.name ||
                  "Unknown Restaurant"
                }</h3>
                <p id="location">
                  <span class="icons location-icon"><i class="bi bi-geo-alt-fill"></i></span>
                  ${
                    data?.data?.cards[2]?.card?.card?.info?.locality ||
                    "Unknown Location"
                  }
                </p>
              </div>
              <div class="foodItem-list">
              <ul>
                    <h2>${
                      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
                        ?.cards[1].card.card.title || "Recommended"
                    }</h2>

                ${
                  (
                    data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
                      ?.cards[1]?.card?.card?.itemCards || []
                  )
                    .map(
                      (item) => `
                      <li>
                        <p class="menu-name">
                          ${item?.card?.info?.name || "Unnamed Item"}
                        </p>
                        <span class="dots"></span>
                        <p class="menu-price">
                          ₹ ${
                            (parseFloat(item.card.info.price) / 100).toFixed(
                              2
                            ) || "Price Not Available"
                          }
                        </p>
                      </li>
                    `
                    )
                    .join("") // `.join('')` to correctly concatenate array elements
                }
  </ul>
                 <ul>
                      <h2>${
                        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
                          ?.cards[2].card.card.title || "Recommended 2"
                      }</h2>

                ${
                  (
                    data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
                      ?.cards[2]?.card?.card?.itemCards || []
                  )
                    .map(
                      (item) => `
                      <li>
                        <p class="menu-name">
                          ${item?.card?.info?.name || "Unnamed Item"}
                        </p>
                        <span class="dots"></span>
                        <p class="menu-price">
                          ₹ ${
                            (parseFloat(item.card.info.price) / 100).toFixed(
                              2
                            ) || "Price Not Available"
                          }
                        </p>
                      </li>
                    `
                    )
                    .join("") // `.join('')` to correctly concatenate array elements
                }
              </ul>
               
              
              </div>
            </div>
          `;
          })
          .catch((error) => {
            console.log(error.statusMessage);
          });
      });
    });
  })
  .catch((error) => console.log(error));

// for (const element of foodItem) {

// }
