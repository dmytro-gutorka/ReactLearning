import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTodos } from "../services/todo";


export default function ToDoList() {

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => 1,
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(['posts'], data)
    }
  })

  const { isError, error, data, isPending} = useQuery({
    queryKey: ['posts'],
    queryFn: getTodos
  })

  if (isPending) {
    toast.loading('Loading...', { id: 'loading-toast' })
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  toast.dismiss('loading-toast')
  toast.success('Data has been loaded')

  return (
    <div>
      <div>
        {data?.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({ id: 10, title: 'my title'})
      }}
            className='flex flex-col gap-5 bg-stone-100'>

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
    </div>
  )
}