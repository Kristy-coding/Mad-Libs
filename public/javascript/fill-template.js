

const unicornArray = ["plural noun","adjective", "plural noun (animals)","plural noun", "adjective","color,adjective", "noun", "plural noun", "adjective", "verb", "plural noun", "verb ending in -ed", "verb", "noun", "adjective"]



//var part_of_speech = document.querySelector('input').placeholder
// on page load initiate the placeholder text with the first index of the array 

var index = 0
var part_of_speech = unicornArray[index];
//var part_of_speech = unicornArray[index];
//console.log(part_of_speech)

//grab placeholder text
var input_box = document.querySelector('input')
input_box.placeholder = part_of_speech


// grab input box (innerhtml)

// grabbing the story id from the url (the number at the end of the url is the id of the story)
var story_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1]
    //console.log(story_id)

async function addWordHandler(event) {

    event.preventDefault();
    
    

    var word = document.querySelector('input').value;

    //clear input box after value is captured in word 
    input_box.value = ""
    //console.log(word)

    // for (var i = 0; i < unicornArray.length; i++) {
        
    //     // placeholder text gets put in 
    //     // then on submit a word get added to the data base for this story via a fetch post request
    //     // when the array ends, a button pops up to 'finish- template', on click we grab the story form the databse(findOne where id = id in url) which nows has a bunch of words associated with it and loop through the array of associated words backwards? depending on how they end up in the database and render them to the hardcoded templat word[0],word[1] etc. 
    // }   
        if (word && part_of_speech && story_id) {
            const response = await fetch('/api/word', {
              method: 'POST',
              body: JSON.stringify({
                the_word: word,
                part_of_speech: part_of_speech,
                story_id: story_id,
                
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          
            if (response.ok) {
            // word get added to the database then reload the page so we can fill in the next word 
            
            console.log('response ok')
                    if(index < unicornArray.length -1 ){
                        index++
                        console.log(index);
                         part_of_speech = unicornArray[index];
                         input_box.placeholder = part_of_speech
                         
                        //var part_of_speech = unicornArray[index];
                        console.log(part_of_speech);
                        
                        
                    } else {
                        console.log('template finished!')

                        // make generate template button visible (take hide off)
                        
                    }
                   
    
              //document.location.reload();
            } else {
              alert(response.statusText);
            }
        }
}



document.querySelector('.input-button').addEventListener('click', addWordHandler);