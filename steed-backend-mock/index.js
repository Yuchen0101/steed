const express = require("express");
const app = express();
const port = 2333;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/fetch_user_profile", (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const resp = {
    current_month: {
      points: getRandomInt(100),
      leadboard_position: 9,
      accuracy: 0.76,
    },
    all_time: {
      points: 1234,
      leadboard_position: 10,
      accuracy: 0.87,
    },
    points_hist: {
      highest_points: 509,
      average_points: 300,
      total_redeemed: 459,
      hist: [345, 509, 102, 342, 230, 120, 349],
    },
    badges: [
      {
        id: "bid1",
        name: "The Toorak King",
        description: "Highest accuracy on Toorak homes",
        accuracy: 0.87,
        date: "17/04/2021",
        achieved: true,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
      {
        id: "bid2",
        name: "Sydney Savvy",
        description: "No one prediction Sydney homes like you",
        accuracy: 0.87,
        achieved: false,
      },
    ],
    impact: {
      house: 47,
      townhouse: 9,
      unit: 13,
    },
  };

  res.send(resp);
});

app.get("/api/leaderboard", (req, res) => {
  const resp = {
    overall: [
      {
        name: "Warren HuanM",
        score: "11,980",
      },
      {
        name: "Joe Blogsn",
        score: "9,810",
      },
      {
        name: "Eddy MerckY",
        score: "9,918",
      },
      {
        name: "Peter Sagaj",
        score: "78,120",
      },
      {
        name: "Dinesh Krishnaj",
        score: "15,919",
      },
      {
        name: "Jayden Vef",
        score: "19.927",
      },
    ],
    current_month: [
      {
        name: "Peter Sagaj",
        score: "78,120",
      },
      {
        name: "Dinesh Krishnaj",
        score: "15,919",
      },
      {
        name: "Jayden Vef",
        score: "19.927",
      },
      {
        name: "Warren HuanM",
        score: "11,980",
      },
      {
        name: "Joe Blogsn",
        score: "9,810",
      },
      {
        name: "Eddy MerckY",
        score: "9,918",
      },
    ],
  };
  res.send(resp);
});

app.get("/api/get_properties", (req, res) => {
  const resp = {
    matched: [
      {
        _id: "YI-0097-WU",
        propertyType: "House",
        bathrooms: 2,
        bedrooms: 4,
        carSpaces: 6,
        address: "3 Castlebar Road, Lockleys SA 5032",
        short_address: "Lockleys SA 5032",
        sold_date: "07/07/2020",
        short_sold_date: "May 2020",
        areaSize: 861,
        landsize: 570,
        headline: "Magnificent Estate Metres from the Beach",
        summaryDescription:
          "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
        min_price: 1000000,
        max_price: 1200000,
        photos: [
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
          {
            fullUrl:
              "https://b.domainstatic.com.au/2013958589_1_0_171026_043335-w4500-h3000-w4096-h2160",
          },
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
        ],
      },
      {
        _id: "YI-0097-WU-2",
        propertyType: "House",
        bathrooms: 2,
        bedrooms: 4,
        carSpaces: 6,
        address: "3 Castlebar Road, Lockleys SA 5032",
        short_address: "Lockleys SA 5032",
        sold_date: "07/07/2020",
        short_sold_date: "May 2020",
        areaSize: 861,
        landsize: 570,
        headline: "Magnificent Estate Metres from the Beach",
        summaryDescription:
          "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
        min_price: 1000000,
        max_price: 1200000,
        photos: [
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
          {
            fullUrl:
              "https://b.domainstatic.com.au/2013958589_1_0_171026_043335-w4500-h3000-w4096-h2160",
          },
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
        ],
      },
      {
        _id: "YI-0097-WU-3",
        propertyType: "House",
        bathrooms: 2,
        bedrooms: 4,
        carSpaces: 6,
        address: "3 Castlebar Road, Lockleys SA 5032",
        short_address: "Lockleys SA 5032",
        sold_date: "07/07/2020",
        short_sold_date: "May 2020",
        areaSize: 861,
        landsize: 570,
        headline: "Magnificent Estate Metres from the Beach",
        summaryDescription:
          "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
        min_price: 1000000,
        max_price: 1200000,
        photos: [
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
          {
            fullUrl:
              "https://b.domainstatic.com.au/2013958589_1_0_171026_043335-w4500-h3000-w4096-h2160",
          },
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
        ],
      },
      {
        _id: "YI-0097-WU-4",
        propertyType: "House",
        bathrooms: 2,
        bedrooms: 4,
        carSpaces: 6,
        address: "3 Castlebar Road, Lockleys SA 5032",
        short_address: "Lockleys SA 5032",
        sold_date: "07/07/2020",
        short_sold_date: "May 2020",
        areaSize: 861,
        landsize: 570,
        headline: "Magnificent Estate Metres from the Beach",
        summaryDescription:
          "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
        min_price: 1000000,
        max_price: 1200000,
        photos: [
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
          {
            fullUrl:
              "https://b.domainstatic.com.au/2013958589_1_0_171026_043335-w4500-h3000-w4096-h2160",
          },
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
        ],
      },
      {
        _id: "YI-0097-WU-5",
        propertyType: "House",
        bathrooms: 2,
        bedrooms: 4,
        carSpaces: 6,
        address: "3 Castlebar Road, Lockleys SA 5032",
        short_address: "Lockleys SA 5032",
        sold_date: "07/07/2020",
        short_sold_date: "May 2020",
        areaSize: 861,
        landsize: 570,
        headline: "Magnificent Estate Metres from the Beach",
        summaryDescription:
          "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
        min_price: 1000000,
        max_price: 1200000,
        photos: [
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
          {
            fullUrl:
              "https://b.domainstatic.com.au/2013958589_1_0_171026_043335-w4500-h3000-w4096-h2160",
          },
          {
            fullUrl:
              "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          },
        ],
      },
    ],
  };
  res.send(resp);
});

app.post("/api/make_prediction", (req, res) => {
  const resp = {
    accuracy: Math.random(),
    points: 230,
    sold_price: 1340000,
    sold_date: "21-05-2020",
    description:
      "Setellar performance again Warren. You are one of the top predictors in this category. Kudos!",
    total_points: 1355,
    rank: 9,
    avg_accuracy: Math.random(),
  };
  res.send(resp);
});

app.listen(port, "0.0.0.0");
