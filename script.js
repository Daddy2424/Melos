
const body = document.body;
const name = document.getElementById('name');
const blog = document.getElementById('blog');
const blogsContainer = document.getElementById('blogs');
const admin = document.getElementById('admin');
const signInBtn = document.getElementById('signInBtn');
const signContainer = document.getElementById('sign');
const buttons = document.getElementById('buttons');
const notice = document.getElementById('notice');

let god = 'Deepak Poly';
let count = true;


admin.addEventListener('click', ()=>{
  if(count == true){
    god = 'abcd';
    count = false;
  }else if(count == false){
    god = 'Deepak Poly';
    count = true;
  }
})

function playNotificationSound() {
  const audio = new Audio('notification.mp3'); 
  audio.play();
}

let userName  ;
let userNameEntered = false;

async function storeData(){

  let nameVal = userName;
  let blogVal = blog.value;

  if(blogVal == ''){
    alert("no message to post!")
    return;
  }
  const postData = {
    name : nameVal,
    blog : blogVal,
    status : ''
  }
  
  const response = await fetch('/api/storeData',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  name.value = ' ';
  blog.value = ' ';
  
  showData();
  
}



let times = 0;

let previousMessageCount = 0;

// show data
async function showData(){

  const response = await fetch('/api/showData',{
    method: 'GET',
    headers:{
      'content-type': 'application/json'
    }
    })

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }

  const responseData = await response.json();
  console.log(responseData);

  if (responseData.length > previousMessageCount) {
    
    playNotificationSound();
    
    previousMessageCount = responseData.length;

  }

  


// Add the 'new' class only to the most recent blog entry
    
    blogsContainer.innerHTML = '';
    notice.innerHTML = '';


    let nameStyle  = document.createElement('p');
    nameStyle.classList.add('name');
    nameStyle.textContent = responseData[0].name;


    let blogdata = document.createElement('p');
    blogdata.textContent = responseData[0].blog;
    blogdata.classList.add('blogData');


    notice.appendChild(nameStyle);
    notice.appendChild(blogdata);





  for(let i = responseData.length - 1; i >= 1; i--){

    let blog = document.createElement('div');
    blog.classList.add('blogchild');



    let nameStyle  = document.createElement('p');
    nameStyle.classList.add('name');
    nameStyle.textContent = responseData[i].name;
    

    let blogdata = document.createElement('p');
    blogdata.textContent = responseData[i].blog;
    blogdata.classList.add('blogData');


    blog.appendChild(nameStyle);
    blog.appendChild(blogdata);

    blogsContainer.appendChild(blog);

  }
}

setInterval(() => {
  showData();
}, 2000);

const mockingStatements = [
  "Haha, nice try!",
  "You can't delete me!",
  "I'm too important to be deleted!",
  "I'm eternal!",
  "My bad human I lied , you cant delete the creator!",
  "Hmm Hmm i am the creator Dwag!",
];

async function deleteData() {

  name.readOnly = false;
  const nameVal = name.value;
  const postData = {
    name: nameVal
  };

  if(postData.name == god){

    for(let i = 1 ; i > 0 ; i--){

      const randomMockingStatement = mockingStatements[Math.floor(Math.random() * mockingStatements.length)];

      let blog = document.createElement('div');
      blog.classList.add('blogchild');
  
      let nameStyle  = document.createElement('p');
      nameStyle.classList.add('name');
      nameStyle.textContent = postData.name
      
  
      let blogdata = document.createElement('p');
      blogdata.textContent = randomMockingStatement;
      blogdata.classList.add('blogData');
  
  
      blog.appendChild(nameStyle);
      blog.appendChild(blogdata);
  
      blogsContainer.appendChild(blog);
  
    }
    name.value = '';
    return;
  }

  try {
    const response = await fetch('/api/deleteData', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Failed to delete data');
    }

    console.log('Data deleted successfully');
    name.value = '';
    showData();
  } catch (error) {
    console.error('Error:', error);
  }
  
}

signInBtn.addEventListener('click', async ()=>{

  let nameVal = name.value;

  if(nameVal == ''){
    alert("Please enter your name (or any name!) to sign in.")
    return;
  }

  let user = {
    id : 0,
    name : nameVal
  }
  
  // storing username
  await fetch('/api/signin',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  // if(!response.ok){
  //   alert("Failed to store user.")
  // }

  // getting username


  setTimeout(async () => {
    try {
        const response = await fetch('/api/userdata', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const responseData = await response.json();

        for(let i =0; i< responseData.length; i++){
          if(userName != responseData[i].name){
            userName = responseData[i].name;
          }
        }
        console.log(userName);

        signContainer.style.display = 'none';
        buttons.style.display = 'flex';
        notice.style.display = 'none';
        blogsContainer.style.display = 'flex';
    } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to fetch userdata');
    }
}, 2000); // Adjust the timeout duration as needed
});







