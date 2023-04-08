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

## 🏃🏻‍♀️ Instructions to Run
- make sure `package-lock.json` and `node_modules` are deleted
- run `npm install` in both client and server folder
    - if there are still errors when running, run `- npm install node --reinstall-packages-from=node` in client folder
- run `npm start` in both client and server folder
