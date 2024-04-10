



const body = document.body;
const name = document.getElementById('name');
const blog = document.getElementById('blog');
const blogsContainer = document.getElementById('blogs');

async function storeData(){



  let nameVal = name.value;
  let blogVal = blog.value;

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

  showData();
}

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

  blogsContainer.innerHTML = '';

  for(let i = responseData.length - 1; i >= 0; i--){

    let blog = document.createElement('div');
    blog.classList.add('blogchild');

    let nameStyle  = document.createElement('p');
    nameStyle.classList.add('name');
    nameStyle.textContent = responseData[i].name
    

    let blogdata = document.createElement('p');
    blogdata.textContent = responseData[i].blog;
    blogdata.classList.add('blogData');


    blog.appendChild(nameStyle);
    blog.appendChild(blogdata);

    blogsContainer.appendChild(blog);

  }

}

showData();

async function deleteData() {
  const nameVal = name.value;
  const postData = {
    name: nameVal
  };

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
    showData();
  } catch (error) {
    console.error('Error:', error);
  }
}





