# Scraper
Week 18 Mongo and Cheerio Web Scraper Assignment

## Description

App that scrapes articles from NHL.com and allows users to make notes on the articles they find.

The application demonstrates the ability to use [Cherrio](https://www.npmjs.com/package/cheerio) to scrape data from a website and save to a [MongoDB](https://www.mongodb.com/) database

## Demo
	
*NHL Scraper* is deployed to Heroku. Please check it out [here](https://mankin-scraper.herokuapp.com/).

- What is the direct link to the project?
  * The code is hosted here: [Scraper](https://github.com/JoseaphMankin/scraper).

![Alt text](/public/images/scraperScreen.png?raw=true "Scraper Screenshot")

## Installation

To install the application follow the instructions below:

	git clone https://github.com/JoseaphMankin/scraper.git
	cd scraper
	npm install or yarn install
	
## Running Locally

To run the application locally and access it in your browser, first set the `PORT` environment variable to the value of your choice. An example is shown below.

	var PORT = process.env.PORT || 3000;
	
After the `PORT` environment variable has been set, run the Node.js application with the command below. Note, the process.env.PORT is for deploying to Heroku, otherwise, 3000 will be the local host.

	node server.js
	
The application will now be running locally on `PORT`, in this case that is port 3000. You can then access it locally from your browser at the URL `localhost:PORT`, in this case `localhost:3000`.