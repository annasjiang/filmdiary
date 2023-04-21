# 🎬 Film Diary
A tool to help you keep track of films you've watched and your sentiments. We've also added a feature to recommend films based on your watch history and ratings.

## 🥳 Figma
To begin our process, we created some mockups of our UI on Figma. You can access the files [here](https://www.figma.com/file/eXmLRPK87lixrUbTIWt6vj/Film-Diary?node-id=0%3A1&t=pu79JIqV9nKcAnLG-1).

## 😎 About
BACKEND
- our backend uses MongoDB and makes calls to the database to fetch our info (reviews, lists, etc.) 

FRONTEND
- our frontend displays the data from our MongoDB database and has options to view, create, edit, and delete items
- we included an admin login feature using Firebase, which restricts edit privileges to the owners of the diary
- we use Axios to fetch results from API calls to TMDB, allowing us to access the details of any film

## 🤠 Features
- ability to view, create, edit, and delete reviews/lists
    - use live search feature to find a film and get basic info (official title, year, poster, etc)
    - add/edit titles, descriptions, rating, date watched
- access more information about a film by clicking on a film title in diary or lists
    - includes director(s), runtime, description, cast, crew, genres, and keywords
    - hover over a cast or crew name to get information about their role
    - similar movies are displayed at the bottom of the page as well
- discover page includes updated trending movies from TMDB and recommendations based on watch history
- admin access ensures that only the owners of the diary (Anna & Allison) can create/edit/delete reviews 

## 🤝 Set Up
- create a new `config.env` file in `/server`
- follow instructions to connect to your MongoDB database
    - we used "Connect Using VS Code" and set `ATLAS_URI` to the generated link and `PORT=4000`
    - make sure to connect with your current IP address on the MongoDB website

## 🏃🏻‍♀️ Instructions to Run
- make sure `package-lock.json` and `node_modules` are deleted
- run `npm install` in both client and server folder
    - if there are still errors when running, run `- npm install node --reinstall-packages-from=node` in client folder
- run `npm start` in both client and server folder

