import { createBrowserRouter ,
         createRoutesFromElements ,
         Route, 
         RouterProvider,} from "react-router-dom"
import Landing from './pages/Landing'
import {NextUIProvider} from "@nextui-org/react";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter(createRoutesFromElements(
  <>
   <Route path='/' element ={<Landing/>}>

</Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/> 
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
