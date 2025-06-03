import { redirect } from "react-router";


export const getTodos = async() => {
  const res = await fetch('http://localhost:3000/posts')
  return await res.json()
}


export const getTodo = async({ params }) => {
  const res = await fetch(`http://localhost:3000/posts/${params.id}`)
  return await res.json()
}


export const createPost = async({ request }) => {
  const response = await request.formData()
  const formData = Object.fromEntries(response)

  await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  return redirect(`/todo/${formData.id}`, { status: 301})
}