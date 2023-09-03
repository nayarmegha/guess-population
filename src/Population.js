import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import cities from "./GenerateCountries.json";

const theme = createTheme({
  palette: {
    background: {
      default: "#252b36",
    },
    primary: {
      main: "#2b56d6",
      dark: "#252b36",
    },
    secondary: {
      main: "#abe444",
    },
  },
  typography: {
    fontFamily: "Raleway, Arial",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "white",
        },
      },
    },
  },
});

var myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.teleport.v1+json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export default function Population() {
  const [cityA, setCityA] = useState({
    name: "",
    pop: 0,
  });
  const [cityB, setCityB] = useState({
    name: "",
    pop: 0,
  });
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [points, setPoints] = useState(0);

  function getPopulation(whichCity) {
    resetText();
    var city = "";
    if (whichCity === "a") {
      //city a
      city = document.getElementById("city-a-text").value;
    } else {
      //city b
      city = document.getElementById("city-b-text").value;
    }

    fetch("https://api.teleport.org/api/cities/?search=" + city, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const cityUrl =
          result._embedded["city:search-results"][0]._links["city:item"].href;
        fetch(cityUrl, requestOptions)
          .then((response) => response.json())
          .then((cityInfo) => {
            if (whichCity === "a") {
              setCityA({
                name: cityInfo.name,
                pop: cityInfo.population,
              });
            } else {
              setCityB({
                name: cityInfo.name,
                pop: cityInfo.population,
              });
            }
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  function isBigger(whichCity) {
    resetText();
    if (whichCity === "a") {
      if (cityA.pop >= cityB.pop) {
        document.getElementById("correct").hidden = false;
        document.getElementById("a-bigger").hidden = false;
        setPoints(points + 1);
        console.log(points);
      } else {
        document.getElementById("wrong").hidden = false;
        document.getElementById("b-bigger").hidden = false;
        setPoints(points - 1);
        console.log(points);
      }
    } else {
      // city b
      if (cityA.pop < cityB.pop) {
        document.getElementById("correct").hidden = false;
        document.getElementById("b-bigger").hidden = false;
        setPoints(points + 1);
        console.log(points);
      } else {
        document.getElementById("wrong").hidden = false;
        document.getElementById("a-bigger").hidden = false;
        setPoints(points - 1);
        console.log(points);
      }
    }
    document.getElementById("total-score").hidden = false;
  }

  function resetText() {
    document.getElementById("correct").hidden = true;
    document.getElementById("a-bigger").hidden = true;
    document.getElementById("wrong").hidden = true;
    document.getElementById("b-bigger").hidden = true;
  }

  function generateAnyCity(whichCity) {
    resetText();
    var randomIndex = 0;
    randomIndex = Math.floor(Math.random() * 10);
    if (whichCity === "a") {
      setCityA({
        name: cities[randomIndex].name,
        pop: cities[randomIndex].population,
      });
    } else {
      setCityB({
        name: cities[randomIndex].name,
        pop: cities[randomIndex].population,
      });
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <br></br>
        <br></br>
        <Grid container justifyContent="center" alignItems="flex-start">
          <TextField
            id="city-a-text"
            label="search for a city"
            size="small"
            sx={{ color: "#252b36" }}
            InputLabelProps={{
              sx: {
                color: "white",
              },
            }}
            inputProps={{
              sx: {
                color: "white",
                paddingLeft: "15px",
              },
            }}
            value={searchA}
            onChange={(event) => {
              const newValue = event.target.value;
              setSearchA(newValue);
            }}
          />
          <Button
            id="city-a-button"
            variant="contained"
            sx={{ px: 6, mx: "auto" }}
            onClick={() => {
              getPopulation("a");
            }}
          >
            Find City A
          </Button>

          <TextField
            id="city-b-text"
            label="search for a city"
            size="small"
            sx={{}}
            InputLabelProps={{
              sx: {
                color: "white",
              },
            }}
            inputProps={{
              sx: {
                color: "white",
                paddingLeft: "15px",
              },
            }}
            value={searchB}
            onChange={(event) => {
              const newValue = event.target.value;
              setSearchB(newValue);
            }}
          />
          <Button
            id="city-b-button"
            variant="contained"
            sx={{ px: 6, mx: "auto" }}
            onClick={() => {
              getPopulation("b");
            }}
          >
            Find City B
          </Button>
        </Grid>
        <br></br>
        {/* user wants random cities */}
        <Grid container justifyContent="center" alignItems="flex-start">
          <Button
            id="generate-random-city-a"
            variant="contained"
            sx={{ px: 6, mx: "auto" }}
            onClick={() => {
              generateAnyCity("a");
            }}
          >
            GENERATE RANDOM CITY A
          </Button>
          <Button
            id="generate-random-city-b"
            variant="contained"
            sx={{ px: 6, mx: "auto" }}
            onClick={() => {
              generateAnyCity("b");
            }}
          >
            GENERATE RANDOM CITY B
          </Button>
        </Grid>
        <br></br>
        <br></br>
        <b>Choose the city that is bigger by population:</b>
        <br></br>
        <br></br>
        <Grid container justifyContent="center" alignItems="flex-start">
          <Button
            id="city-a-bigger"
            color="secondary"
            variant="contained"
            sx={{ px: 6, mx: "auto" }}
            onClick={() => {
              isBigger("a");
            }}
          >
            {cityA.name} is bigger
          </Button>
          <Button
            id="city-b-bigger"
            color="secondary"
            variant="contained"
            sx={{ px: 6, mx: "auto" }}
            onClick={() => {
              isBigger("b");
            }}
          >
            {cityB.name} is bigger
          </Button>
        </Grid>
        <br></br>
        <p hidden id="correct">
          🤠✅🤠✅🤠✅🤠✅
        </p>
        <p hidden id="wrong">
          😤❌😤❌😤❌😤❌
        </p>
        <p hidden id="a-bigger">
          {cityA.name} (population {cityA.pop}) is bigger than {cityB.name}{" "}
          (population {cityB.pop})
        </p>
        <p hidden id="b-bigger">
          {cityB.name} (population {cityB.pop}) is bigger than {cityA.name}{" "}
          (population {cityA.pop})
        </p>
        <p hidden id="total-score">
          Score: {points}
        </p>
      </ThemeProvider>
    </>
  );
}
