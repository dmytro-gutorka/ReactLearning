export const getTodos = async({ meta }) => {

  console.log(meta)
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