const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const questionsUrl =
  "https://www.cheatsheet.com/gear-style/20-questions-to-ask-siri-for-a-hilarious-response.html/";

const iftttUrl =
  "https://maker.ifttt.com/trigger/random_question/with/key/bjzanHtOAhcRmeJOc3H6Ku";

/// Description: Scrapes the url to find the questions on the site and adds them to a questions array
/// Param: url that needs to be scarped
/// Return: questions array
async function getQuestions(url) {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  let questions = [];

  //loops through each h2 tag in the parent div id the specified id
  $("#spt-initial-content")
    .find("h2")
    .each((i, el) => {
      questions.push($(el).text());
    });

  return questions;
}

/// Description: Takes the question array and writes the data to a .csv file
/// Param: questionsArray
/// Return:
function createQuestionCSV(questionsArray) {
  fs.writeFile(
    "Yash_Pandya_full_stack_challenge_questions.csv",
    questionsArray.toString(),
    (err) => {
      if (err) throw err;
      console.log("written to questions.csv");
    }
  );
}

/// Description: Randomly selects a question from the questions array
/// Param: questionsArray
/// Return: question
function randomQuestion(questionsArray) {
  const randInt = Math.floor(Math.random() * questionsArray.length);
  let question = questionsArray[randInt];
  question = question.substr(question.indexOf(" ") + 1);
  return question;
}

/// Description: Uses the IFTTT webhook to email the random question
/// Param: iftttUrl, question
/// Return: Promise
async function emailQuestion(iftttUrl, question) {
  axios
    .post(iftttUrl, { value1: question })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}

//Main funtion
getQuestions(questionsUrl)
  .then((questionsArray) => {
    createQuestionCSV(questionsArray);
    const question = randomQuestion(questionsArray);
    //display the random question
    console.log("Question: " + question);
    emailQuestion(iftttUrl, question).catch((err) => console.log(err));
  })
  .catch((err) => console.error(err));
