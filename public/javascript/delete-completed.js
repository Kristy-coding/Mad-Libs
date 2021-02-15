


async function deleteStoryHandler(event) {
    event.preventDefault();

    //const id = event.target.value
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]

    document.location.replace('/dashboard');
   
   
      const response = await fetch(`/api/story/${id}`, {
        method: 'DELETE'
      });
    
      if (response.ok) {
        //document.location.replace('/dashboard');
        console.log('respoonse ok')
      } else {
        alert(response.statusText);
      }
  
  }
  
  document.querySelector('.play-again-delete').addEventListener('click', deleteStoryHandler);