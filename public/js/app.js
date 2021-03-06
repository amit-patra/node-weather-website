console.log("Javascript Loaded");

function searchLocation(loc){

}


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const location = searchElement.value;
  // const url = "http://localhost:3000/weather?address="+location;
  const url = "/weather?address="+location;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

fetch(url).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
     
      console.log(data.error);
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      console.log(data);
    }
  });
});
})
