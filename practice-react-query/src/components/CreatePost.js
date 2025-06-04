import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/todo";
import toast from "react-hot-toast";

export default function CreatePost() {

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (formData) => createPost(formData),
    onSuccess: () => {
      toast.success('Successfully created!', { position: "top-right"});
      return queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => console.log(error)
  })

  function handleSubmit(e) {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target))

    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-stone-100'>

      <label>
        Title
        <input type="text" name="title" />
      </label>

      <label>
        Views
        <input type="text" name="views"/>
      </label>

      <label>
        id
        <input type="text" name="id" />
      </label>

      <button type="submit" className="self-start bg-yellow-200">Create</button>

    </form>
  )
}