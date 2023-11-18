import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "ranbirsi";
const yourPassword = "webdev";
const yourAPIKey = "7e88535c-08ae-4daf-8640-f84d770be091";
const yourBearerToken = "0afcb3a2-c707-4735-b15b-c910a81e9b39";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content:JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
   
    
});

app.get("/basicAuth",async (req, res) => {
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/all?page=${4}`,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
    });
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content:result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey",async (req, res) => {
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter`,{
      params:{
        score:5,
        apiKey:yourAPIKey,
      },
    });
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
 
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
