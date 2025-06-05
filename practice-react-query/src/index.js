import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';

import './index.css'
import React from "react";
import ReactDOM from 'react-dom/client';

import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import ToDoListInfiniteScroll from "./components/ToDoListInfiniteScroll";
import MovieItem from "./components/MovieItem";


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { path: '/', Component: Homepage },
      { path: '/about', Component: About},
      { path: '/contacts', Component: Contacts },
      { path: '/login', Component: Login },
      { path: '/todo',
        children: [
          { index: true, Component: ToDoListInfiniteScroll },
          { path: ':id', Component: MovieItem },
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
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);