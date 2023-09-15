import { createBrowserRouter ,
         createRoutesFromElements ,
         Route, 
         RouterProvider,} from "react-router-dom"
import Landing from './pages/Landing'
import {NextUIProvider} from "@nextui-org/react";
import Register from "./pages/Register";
import Login, { loader as loginLoader, loginAction } from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import AllMessageList, { loader as messageLoader } from "./pages/AllMessageList";
import ConversationBox, { loader } from "./pages/ConversationBox";
import { loader as conversationLoader } from "./pages/ConversationBox";
import { loader as layoutLoader } from "./pages/DashboardLayout";
import { action as sendAction } from "./pages/ConversationBox/InputBox";
import ProfileUpdate from "./pages/ProfileUpdate";
import ProfileView from "./componets/ProfileUpdationAndView/ProfileView";
import { loader as profileViewLoader } from "./componets/ProfileUpdationAndView/ProfileView";
import UpdatePictures, {loader as updatePicturesLoader , action as updatePicturesAction} from "./componets/ProfileUpdationAndView/UpdatePhotos";
import UpdateInfo  , {loader as loaderUpdateInfo , action as actionUpadateInfo} from "./componets/ProfileUpdationAndView/UpdateInfo";
import ChangePassword , {loader as changePasswordLoader}from "./componets/ProfileUpdationAndView/ChangePassword";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element ={<Landing/>}/>
    <Route path="/login"
           element={<Login/>}
           loader={loginLoader}
           action={loginAction}/>
    <Route path="/register"
           element={<Register/>}/>
    <Route path="dashboard/:userId"
          element={<DashboardLayout/>}
          loader={layoutLoader}>
          <Route
                path="messages"
                element={<AllMessageList/>}
                loader={messageLoader}>
                <Route
                  path="conversation/:type/:id"
                  element={<ConversationBox/>}
                  loader= {conversationLoader}
                  action={sendAction}
                />
          </Route>
          <Route path="profile"
                 element={<ProfileUpdate/>}>
              <Route path="preview"
                     element={<ProfileView/>}
                     loader={profileViewLoader}/>
              <Route path="update_pictures"
                     element={<UpdatePictures/>}
                     loader={updatePicturesLoader}
                     action={updatePicturesAction}/>
              <Route path="update_info"
                     element={<UpdateInfo/>}
                     loader={loaderUpdateInfo}
                     action={actionUpadateInfo}/>
              <Route path="change_password"
                     element={<ChangePassword/>}
                     loader={changePasswordLoader}/>
                     
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
