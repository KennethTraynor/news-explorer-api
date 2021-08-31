
# news-explorer-api
Back-end for the News Explorer website.

## Functionality
* Registration, authorization, and logging in (generating a token)
* Can get current user info
* Can save, delete, and get articles

## Technologies & Techniques
**Technologies:**
* Visual Studio Code: Website code
* Git: Used to work in different branches, managing the development of the website's features
* Github: Stores the different branches
* MongoDB: Database
* Microsoft Azure: Hosting a remote server
* Express: Back-end framework

**Techniques**
* Centralized error handling
* Authorization to prevent non-registered users from accessing specific routes
* Verify incoming requests using Celebrate before sending them to the controllers
* Requests and errors are logged
* A rate limiter is used in the case that too many requests are being sent
* A .env file is stored on the server containing the secret key used for generating and checking tokens

## Links
* API: https://api.ktraynornews.students.nomoreparties.site/
