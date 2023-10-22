import { createBrowserRouter ,
         createRoutesFromElements ,
         Route, 
         RouterProvider,} from "react-router-dom"
import Landing from './pages/Landing'
import {NextUIProvider} from "@nextui-org/react";
import Register, { registerAction } from "./pages/Register";
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import AllMessageList, { loader as messageLoader } from "./pages/AllMessageList";
import ConversationBox, { loader } from "./pages/ConversationBox";
import GroupConversationBox , {loader as groupConversationLoader} from "./pages/GroupConversationBox";
import { loader as conversationLoader } from "./pages/ConversationBox";
import { loader as layoutLoader } from "./pages/DashboardLayout";
import { action as sendAction } from "./pages/ConversationBox/InputBox";
import ProfileUpdate from "./pages/ProfileUpdate";
import ProfileView from "./componets/ProfileUpdationAndView/ProfileView";
import { loader as profileViewLoader } from "./componets/ProfileUpdationAndView/ProfileView";
import UpdatePictures, {loader as updatePicturesLoader , action as updatePicturesAction} from "./componets/ProfileUpdationAndView/UpdatePhotos";
import UpdateInfo  , {loader as loaderUpdateInfo , action as actionUpadateInfo} from "./componets/ProfileUpdationAndView/UpdateInfo";
import ChangePassword , {loader as changePasswordLoader , action as changePasswordAction}from "./componets/ProfileUpdationAndView/ChangePassword";
import { loader as ProfileLoader } from "./pages/ProfileUpdate";
import Explore from "./pages/Explore";
import { loader as ExploreLoader } from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Error from "./componets/Error";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element ={<Landing/>}/>
      <Route path="login"
            element={<Login/>}
            loader={loginLoader}
            action={loginAction}
            errorElement={<Error/>}/>
      <Route path="register"
            element={<Register/>}
            action={registerAction}
            errorElement={<Error/>}/>
      <Route path="dashboard/:userId"
            element={<DashboardLayout/>}
            loader={layoutLoader}
            errorElement={<Error/>}>
            <Route
                  path="messages"
                  element={<AllMessageList/>}
                  loader={messageLoader}
                  errorElement={<Error/>}>
                  <Route
                    index
                    path="privatechat/:user_id"
                    element={<ConversationBox/>}
                    loader= {conversationLoader}
                    action={sendAction}
                    errorElement={<Error/>}
                  />
                  <Route
                    path="groupchat/:groupName"
                    element={<GroupConversationBox/>}
                    loader= {groupConversationLoader}
                    action={sendAction}
                    errorElement={<Error/>}
                  />
            </Route>
            <Route path="profile"
                  element={<ProfileUpdate/>}
                  loader={ProfileLoader}
                  errorElement={<Error/>}>
                <Route index
                      path="preview"
                      element={<ProfileView/>}
                      loader={profileViewLoader}
                      errorElement={<Error/>}/>
                <Route path="update_pictures"
                      element={<UpdatePictures/>}
                      loader={updatePicturesLoader}
                      action={updatePicturesAction}
                      errorElement={<Error/>}/>
                <Route path="update_info"
                      element={<UpdateInfo/>}
                      loader={loaderUpdateInfo}
                      action={actionUpadateInfo}
                      errorElement={<Error/>}/>
                <Route path="change_password"
                      element={<ChangePassword/>}
                      loader={changePasswordLoader}
                      action={changePasswordAction}
                      errorElement={<Error/>}/> 
            </Route>
            <Route index
                  path="explore"
                  element={<Explore/>}
                  loader={ExploreLoader}
                  errorElement={<Error/>}>
            </Route>
    </Route>
    <Route path="*"
           element={<NotFound/>}/>
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
