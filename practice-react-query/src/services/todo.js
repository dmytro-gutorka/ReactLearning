
// const API_KEY = 'd0e93483'
//
// &apikey=d0e93483

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjVhODFiMjExZWQ1MmFjMTdhYmJhYWIyY2VjZDM5YSIsIm5iZiI6MTczMzQ3NTU0OC45NzYsInN1YiI6IjY3NTJiY2RjODBlNWI4ZjBhNzU2MzEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zX82V-5f3weDqX-4sTp4rvxY2YPyT7Z_AHdTLYYI2mI'
  }
};

export const getTodos = async() => {

  try {
    const res = await fetch('http://localhost:3000/posts')

    if (!res.ok) throw new Error('Could not fetch posts')

    return await res.json()
  }

  catch(error) {
    throw error
  }

}


export const getTodo = async(id) => {
  const res = await fetch(`http://localhost:3000/posts/${id}`)
  return await res.json()
}


export const deleteTodo = async(id) => {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
  })
  return await res.json()
}


export const createPost = async(formData) => {

  try {
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (!response.ok) throw new Error('Could not create a post')
  }

  catch (error) {
    throw error
  }
}

export const getMoviesPerPage = async (page) =>  {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=12&page=${page}`, options)
  return await response.json()
}


