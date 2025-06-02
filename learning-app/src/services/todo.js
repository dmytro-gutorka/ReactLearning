export const getTodos = async() => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return await res.json()
}


export const getTodo = async({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  return await res.json()
}


export const createPost = async({ request }) => {
  const response = await request.formData()
  const formData = Object.fromEntries(response)

  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  console.log(res)
}