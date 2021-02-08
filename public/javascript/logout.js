// add scrip to logout to the main.handlebars page 
// <scripts>/javascript/logout.js</script>

async function logout() {
    // when the user clicks the logout button we will make a fetch post request to the server with the /api/users/logout route which will destroy/end the session
      const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  
    document.querySelector('#logout').addEventListener('click', logout);

    // make sure when you add this script to the main.handlebars page you also add the {{#if 