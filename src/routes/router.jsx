import { createBrowserRouter } from "react-router";
import AddTask from "../pages/AddTask";
import BrowseTasks from "../pages/BrowseTasks";
import MyPostedTasks from "../pages/MyPostedTasks";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Root from "../root";
import Home from "../pages/home";
import TaskDetails from "../pages/TaskDetails";
import UpdateTask from "../pages/UpdateTask";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/add-tasks',
            element: <AddTask />
        },
        {
            path: '/browse-tasks',
            element: <BrowseTasks />
        },
        {
            path: '/task-details',
            element: <TaskDetails />
        },
        {
            path: '/update-task',
            element: <UpdateTask />
        },
        {
            path: '/my-posted-tasks',
            element: <MyPostedTasks />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        }
    ]
  }
]);
