import { Form, useFetcher } from "react-router";


export default function CreatePost() {

  const fetcher = useFetcher()

  return (
    <fetcher.Form action='/todo' method="post">

      <label>
        Title
        <input type="text" name="title" />
      </label>

      <label>
        Body
        <input type="text" name="body"/>
      </label>

      <label>
        userId
        <input type="text" name="userId" />
      </label>

      <button>Create</button>

    </fetcher.Form>
  )
}