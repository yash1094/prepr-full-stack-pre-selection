## Prepr Full Stack Challenge

### by: Yash Pandya

### To run the program, type : node run start

### Steps taken to solve problem

1. Used axios to get return html source from the page
2. Used cheerio the parse the html data and find all the questions which were h2 elements in the div tag with the id = "spt-initial-content"
3. Collected all the questions into a questions array
4. Write all the questions to a questions.csv file using the fs module
5. Used the Math library to randomly select a question from the questions array
6. (Optional) Displayed the random question to the user
7. Created a IFTTT webhook to send an email when a request is send to the url
8. Passed the question in the body of the POST request to the IFTTT webhook
