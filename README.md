1. Clone Rep
2. npm install server and client
3. Create yourProjectName-dev app in console.developers.google.com
4. Enable Google+ API and create OAucth credentials:
    4.1. Configure consent screen (just add name)
    4.2. Create credentials:
        4.2.1. Authorized JavaScript origins: 
                    http://localhost:5000
        4.2.2. Authorized redirect URIs: 
                    http://localhost:3000/auth/google/callback
                    http://localhost:5000/auth/google/callback
5. Add ClientID and Secret to config/dev.js
6. Create Mlab db (yourProjectName-dev) with user (any free option will do, !make sure to include user and password in URI)
7. Add MongoURI to config/dev.js
8. Add random string as CookieKey
9. In cmd login to Heroku: heroku login (if heroku is installed globally, if not, install heroku)
10. In working dir: git init
11. Create Heroku app: heroku create
12. Add project to Heroku path: git remote add heroku "given second link after heroku app is created"
13. Add files to git: git add .
14. Commit project to git: git commit -m "first commit"
15. Push to Heroku: git push heroku master
-- At this point your application should be working locally and should be uploaded to Heroku
-- The production version will not work yet cause the production evenviroment variables are not yet configured
16. In your Heroku app under settings:
    16.1. Repeat step 3-8 with ending -prod and add to heroku variables as shown in config/prod.js 
         16.1.1. For Google OAuth:
                16.1.1.1. Authorized JavaScript origins: 
                            "Your Heroku URL"
                16.1.1.2. Authorized redirect URIs: 
                            "Yout Heroku URL"/auth/google/callback (https)
                            "Yout Heroku URL"/auth/google/callback (http) --> i dont know why but sometimes this solves some issues
-- Your production app should be working now
                           
