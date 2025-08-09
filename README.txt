Creating a simple login panel as an intern.
And some stuff such as sending a confirmation code to the user,
storing it in a temporary memory and checking if the code given
by the user matches the code sent.

This task is going to be done using: HTML & CSS, JavaScript, Vue.js,
Node.js, Tailwind, daisyUI, Redis and MariaDB.

Refactoring will be implemented if needed in some places.

Step 1: Writing HTML & CSS templates in "App.vue" file, setting
the proper styles and refactoring the templates with Tailwind and daisyUI

Step 2: Adding two database named Redis and MariaDB
Redis for storing a CAPTCHA code while a user tries to sign in and
MariaDB for storing the information of the user

Step 3: Generating a JSON Web Token (JWT) for the user when logged in

Step 4: Redirecting to another page while the token is still valid. If the token expires,
the user will be redirected to the login page.

Step 5: Creating a panel for admins to control the users' status and activity.

(LOL, test stuff)
