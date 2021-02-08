// <script src="/javascript/signup.js"></script> add script to signup.handlebars file 
//emember to give the absolute path, not the relative file path
// we already have static file paths set up in the server telling the serve to access all static file with path dirname_ public 
// so all we need to add to that path is the /javascript/signup.js

async function signupFormHandler(event) {
    event.preventDefault();
    // grab username input, email input, password input and make a fetch post request to the server which will then make a post request to the database to add this user to the database 
    
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        // object retructuring username: username value form input,  email: email value from input, password: password value form input
        body: JSON.stringify({
          username,
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
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);