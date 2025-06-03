import { createBrowserRouter, RouterProvider } from "react-router";
import { createPost, getTodo, getTodos } from "./services/todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import ReactDOM from 'react-dom/client';

import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import ToDoList from "./components/ToDoList";
import ToDoItem from "./components/ToDoItem";


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { path: '/about', Component: About},
      { path: '/contacts', Component: Contacts },
      { path: '/homepage', Component: Homepage },
      { path: '/login', Component: Login },
      { path: '/todo', action: createPost,
        children: [
          { index: true, Component: ToDoList, loader: getTodos },
          { path: ':id', Component: ToDoItem, loader: getTodo },
        ]
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);


