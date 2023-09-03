import { createBrowserRouter ,
         createRoutesFromElements ,
         Route, 
         RouterProvider,} from "react-router-dom"
import Landing from './pages/Landing'
import {NextUIProvider} from "@nextui-org/react";
import Register from "./pages/Register";
import Login, { loader as loginLoader, loginAction } from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import AllMessageList from "./pages/AllMessageList";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element ={<Landing/>}/>
    <Route path="/login"
           element={<Login/>}
           loader={loginLoader}
           action={loginAction}/>
    <Route path="/register"
           element={<Register/>}/>
    <Route path="/dashboard"
          element={<DashboardLayout/>}>
          <Route index
                path="messages"
                element={<AllMessageList/>}/>
    </Route> 
  </>
  
  
  
))
function App() {
  return (
    <>
      <NextUIProvider>
          <RouterProvider router={router} />
      </NextUIProvider>
    </>
  )
}
export default App
