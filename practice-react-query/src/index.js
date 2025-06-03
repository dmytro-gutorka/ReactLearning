import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import React from "react";
import ReactDOM from 'react-dom/client';

import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import ToDoList from "./components/ToDoList";
import ToDoDetails from "./components/ToDoDetails";


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { path: '/about', Component: About},
      { path: '/contacts', Component: Contacts },
      { path: '/', Component: Homepage },
      { path: '/login', Component: Login },
      { path: '/todo',
        children: [
          { index: true, Component: ToDoList },
          { path: ':id', Component: ToDoDetails },
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);


