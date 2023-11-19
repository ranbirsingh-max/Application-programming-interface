import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


  const yourBearerToken = "2603d526-90cc-4308-a963-898e3e994942";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId=req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" +searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const response = await axios.post("https://secrets-api.appbrewery.com/secrets",req.body,config);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.patch("https://secrets-api.appbrewery.com/secrets"+searchId,req.body,config);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
 
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.delete("https://secrets-api.appbrewery.com/secrets"+searchId,req.body,config);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
