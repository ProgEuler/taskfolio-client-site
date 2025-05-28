import { createBrowserRouter } from "react-router";
import AddTask from "../pages/AddTask";
import BrowseTasks from "../pages/BrowseTasks";
import MyPostedTasks from "../pages/MyPostedTasks";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Root from "../Root";
import Home from "../pages/Home";
import TaskDetails from "../pages/TaskDetails";
import UpdateTask from "../pages/UpdateTask";
import ErrorPage from "../pages/ErrorPage";
import UserProfile from "../pages/UserProfile";
import PrivateRoute from "../provider/PrivateRoute";

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
            element:
            <PrivateRoute>
                <AddTask />
            </PrivateRoute>
        },
        {
            path: '/browse-tasks',
            element: <BrowseTasks />
        },
        {
            path: '/task-details/:id',
            element: <TaskDetails />
        },
        {
            path: '/update-task/:id',
            element: <UpdateTask />
        },
        {
            path: '/my-posted-tasks',
            element:
            <PrivateRoute>
                <MyPostedTasks />
            </PrivateRoute>
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/user/:email',
            element:
            <PrivateRoute>
                <UserProfile />
            </PrivateRoute>
        }
    ]
  }
]);
