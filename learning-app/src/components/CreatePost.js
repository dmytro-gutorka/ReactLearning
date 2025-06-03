import { useFetcher } from "react-router";


export default function CreatePost() {

  const fetcher = useFetcher()

  return (
    <fetcher.Form action='/todo' method="post" className='flex flex-col gap-5'>

      <label>
        Title
        <input type="text" name="title" />
      </label>

      <label>
        views
        <input type="text" name="views"/>
      </label>

      <label>
        id
        <input type="text" name="id" />
      </label>

      <button type="submit" className="self-start bg-yellow-200">Create</button>

    </fetcher.Form>
  )
}