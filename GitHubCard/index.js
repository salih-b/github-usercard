/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/salih-b')
    .then( response => {
        // Remember response is an object, response.data is an array.
        console.log(response);
        let UserInfo = UserCard(response);
        let cards = document.querySelector('.cards');
        cards.append(UserInfo);
    })
    .catch( error => {
        console.log("Error:", error);
    });


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function UserCard(userObj){
  let mainCard = document.createElement('div');
  let userImg = document.createElement('img');
  let cardInfo = document.createElement('div');
  let titleName = document.createElement('h3');
  let username = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let aTagAddress = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');

  // img and text assignment
  userImg.src = userObj.data.avatar_url;
  titleName.textContent = userObj.data.name;
  username.textContent = userObj.data.login;
  location.textContent = `Location: ${userObj.data.location}`;
  aTagAddress.textContent = userObj.data.html_url;
  profile.textContent = "Profile: ";
  followers.textContent = `Followers: ${userObj.data.followers}`;
  following.textContent = `Following: ${userObj.data.following}`;
  bio.textContent = `Bio: ${userObj.data.bio}`;
  aTagAddress.setAttribute("href", userObj.data.html_url);


  // Classes
  mainCard.classList.add('card');
  cardInfo.classList.add('card-info');
  titleName.classList.add('name');
  username.classList.add('username');

  // appendments
  mainCard.append(userImg);
  mainCard.append(cardInfo);
  cardInfo.append(titleName);
  cardInfo.append(username);
  cardInfo.append(location);
  cardInfo.append(profile);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);
  profile.append(aTagAddress);
  
  return mainCard;
}




/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
let getLinks = followersArray.map(function(item){
return `https://api.github.com/users/${item}`;
});

function cardCreator(arrayCard){
    arrayCard.forEach(function(item){
      axios.get(item)
    .then( response => {
        // Remember response is an object, response.data is an array.
        console.log(response);
        let UserInfo = UserCard(response);
        let cards = document.querySelector('.cards');
        cards.append(UserInfo);
    })
    .catch( error => {
        console.log("Error:", error);
    });
    });
}
cardCreator(getLinks);


