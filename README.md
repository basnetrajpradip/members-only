# Only Members

"Only Members" website written in in Node/Express.

This web application is an exclusive clubhouse where users can write anonymous posts. Inside the clubhouse, users with member/admin can see who the author of a post is along with managing posts authority to users having admin access but outside they can only see the story and wonder who wrote it.

---

## Live Preview

Live preview of the web app is [Here](https://pradip-members-only.glitch.me).

---

## Quick Start

To get this project up and running locally on your computer:

1. Set up a Node.js development environment.
2. Once you have node setup install the project in the root of your clone of this repo:

   ```bash
   npm install
   ```

> **Note:** The Members Only uses a MongoDB database hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).So inorder to make the app function, One must create a database in atlas cluster and add the connection string linking that database by creating .env file at root of the project as:

```bash
# .env file
MONGODB_URI="<your mongo db connection string>"
```

3. Run the devlopment server, using the appropriate command line shell for your environment:

   ```bash
   # Linux terminal
   DEBUG=members-only:* npm run devstart

   # Windows Powershell
   $ENV:DEBUG = "members-only:*"; npm start
   ```

4. Open a browser to <http://localhost:3000/> to open the members only site.
