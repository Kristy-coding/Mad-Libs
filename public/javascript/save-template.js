//we need to capture the id of the story as well as the value of the text form element. The id will be included in the URL of the PUT request (e.g., /api/story/${id}), but the text will need to be part of the body. Remember that the body needs to be stringified.

async function saveStoryHandler(event) {
    event.preventDefault();

    const text = document.querySelector('.completed-template-text').textContent
    console.log(text)
    // grabbing id from the url again 
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/story/${id}`, {
      method: 'PUT',
      body: JSON.stringify({text}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/saved'); 
    } else {
      alert(response.statusText);
    }

}
  

document.querySelector('.save-story-button').addEventListener('click', saveStoryHandler);