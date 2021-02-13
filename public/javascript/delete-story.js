


async function deleteStoryHandler(event) {
    event.preventDefault();

    const id = event.target.value

    document.location.replace('/dashboard')
   
   
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
  
  document.querySelector('.saved-container').addEventListener('click', deleteStoryHandler);