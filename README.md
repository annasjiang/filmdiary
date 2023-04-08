# 🎬 Film Diary
A tool to help you keep track of films you've watched and your sentiments. We've also added a feature to recommend films based on your watch history and ratings.

## 🥳 Figma
To begin our process, we created some mockups of our UI on Figma. You can access the files [here](https://www.figma.com/file/eXmLRPK87lixrUbTIWt6vj/Film-Diary?node-id=0%3A1&t=pu79JIqV9nKcAnLG-1).

## 🏃🏻‍♀️ Instructions to Run
- follow instructions to connect to your MongoDB database
    - we used "Connect Using VS Code" and replaced `ATLAS_URI` in `config.env` with `mongodb+srv://<username>:<password>@cluster0.4vid1ei.mongodb.net/test`
    - make sure to connect with your current IP address!
- make sure `package-lock.json` and `node_modules` are deleted
- run `npm install` in both client and server folder
    - if there are still errors when running, run `- npm install node --reinstall-packages-from=node` in client folder
- run `npm start` in both client and server folder
