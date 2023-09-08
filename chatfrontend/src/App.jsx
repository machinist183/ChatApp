import { createBrowserRouter ,
         createRoutesFromElements ,
         Route, 
         RouterProvider,} from "react-router-dom"
import Landing from './pages/Landing'
import {NextUIProvider} from "@nextui-org/react";
import Register from "./pages/Register";
import Login, { loader as loginLoader, loginAction } from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import AllMessageList, { dummyLoader } from "./pages/AllMessageList";
import ConversationBox, { loader } from "./pages/ConversationBox";
import { loader as conversationLoader } from "./pages/ConversationBox";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element ={<Landing/>}/>
    <Route path="/login"
           element={<Login/>}
           loader={loginLoader}
           action={loginAction}/>
    <Route path="/register"
           element={<Register/>}/>
    <Route path="dashboard"
          element={<DashboardLayout/>}>
          <Route
                path="messages"
                element={<AllMessageList/>}
                loader={dummyLoader}>
                <Route
                  path="conversation/:type/:id"
                  element={<ConversationBox/>}
                  loader= {conversationLoader}
                />
          </Route>
          
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
