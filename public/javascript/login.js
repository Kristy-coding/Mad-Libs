// <script src="/javascript/login.js"></script> add script to login.handlebars file 
//emember to give the absolute path, not the relative file path
// we already have static file paths set up in the server telling the serve to access all static file with path dirname_ public 
// so all we need to add to that path is the /javascript/login.js

async function signupFormHandler(event) {
    event.preventDefault();
    // grab email input, password input and make a fetch post request to the server which will then make a post request to the database to add this user to the database 
    
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        // object retructuring username: username value form input,  email: email value from input, password: password value form input
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      }); 
       if (response.ok) {
           document.location.replace('/');
       } else {
           alert(response.statusText);
       }
    }
  
   }

  
  document.querySelector('.login-form').addEventListener('submit', signupFormHandler);