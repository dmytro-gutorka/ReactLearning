import {memo, useCallback, useEffect, useMemo, useState} from "react";
import { PostProvider, usePosts} from './PostContext'

import { faker } from "@faker-js/faker";


function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}


function App() {
    const [isFakeDark, setIsFakeDark] = useState(false);
    const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));

    const handleAddPost = useCallback((post) => setPosts((posts) => [post, ...posts]), []);
    const archiveOpt = useMemo(() => {
        return { show: false, title: `Post archive in addition to ${isFakeDark}` }
    }, [])

    console.log("App render");

    useEffect(() => {document.documentElement.classList.toggle("fake-dark-mode")}, [isFakeDark]);

    return (
        <section>
        <button
            onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
            className="btn-fake-dark-mode"
        >
            {isFakeDark ? "☀️" : "🌙"}
        </button>
        <PostProvider>
            <Header posts={posts}/>
            <Main posts={posts}/>
            <Archive archiveOpt={archiveOpt} onAddPost={handleAddPost}/>
            <Footer />
        </PostProvider>
        </section>
    );
}


function Header({posts}) {

    const { onClearPosts } = usePosts()

    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results posts={posts} />
                <SearchPosts />
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}


function SearchPosts() {

    const {searchQuery, setSearchQuery} = usePosts()

    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
        />
    );
}


function Results({ posts }) {

    return <p>🚀 {posts.length} atomic posts found</p>;
}


function Main({ posts }) {

    return (
        <main>
            <FormAddPost />
            <Posts posts={posts}/>
        </main>
    );
}


function Posts({ posts }) {

    return (
        <section>
            <List posts={posts}/>
        </section>
    );
}


function FormAddPost() {

    const {onAddPost} = usePosts()

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = function (e) {
        e.preventDefault();

        if (!body || !title) return;

        onAddPost({ title, body });

        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Post body"
            />
            <button>Add post</button>
        </form>
    );
}



function List({posts}) {

    return (
        <>
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

const Archive = memo(
    function Archive({ archiveOpt, onAddPost }) {

        console.log('Re-rerender Archive')

        const [showArchive, setShowArchive] = useState(archiveOpt.show);
        const [posts] = useState(() => Array.from({ length: 30000 },
            () => createRandomPost()));

        return (
            <aside>
                <h2>{archiveOpt.title}</h2>
                <button onClick={() => setShowArchive((s) => !s)}>
                    {showArchive ? "Hide archive posts" : "Show archive posts"}
                </button>

                {showArchive && (
                    <ul>
                        {posts.map((post, i) => (
                            <li key={i}>
                                <p>
                                    <strong>{post.title}:</strong> {post.body}
                                </p>
                                <button onClick={() => onAddPost(post)}>Add as new post</button>
                            </li>
                        ))}
                    </ul>
                )}
            </aside>
        );
    }
)


function Footer() {
    return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
