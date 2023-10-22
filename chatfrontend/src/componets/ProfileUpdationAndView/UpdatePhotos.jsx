import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import axiosWithJwtInterceptor , {redirectToLogin} from "../../helpers/jwtInterceptor";
import { API_BASE_URL } from "../../config";

export async function loader({ params }) {

  const jwtAxios = axiosWithJwtInterceptor()
  const userId = params["userId"]
  try {
      const response = await jwtAxios.get(
          `${API_BASE_URL}/profile/${userId}`,
          {
              withCredentials:true,
          }
      )
      return response.data
  } catch (error) {
      redirectToLogin(error)
      return error
  }
}

export async function action({ request , params }) {

  const formData = await  request.formData()
  const profilePic = formData.get("profilePic")
  const coverPic = formData.get("coverPic")
  const requestFormData = new FormData()
  if (profilePic.size){
    requestFormData.append('profile_pic',profilePic)
  }
  if (coverPic.size){
    requestFormData.append('cover_pic',coverPic)
  }
  const jwtAxios = axiosWithJwtInterceptor()
  const userId = params["userId"]

  try {
      const response = await jwtAxios.patch(
          `${API_BASE_URL}/profile/${userId}/`,
          requestFormData,
          {
              withCredentials:true,
          }
      )
      noti
      return response.data
  } catch (error) {
      redirectToLogin(error)
      return error
  }
}

export default function UpdatePictures() {

  const userDetails = useLoaderData()

  const [userProfilePreviewUrl, setUserProfilePreviewUrl] = useState(userDetails.profile_pic)
  const [userCoverPreviewUrl, setUserCoverPreviewUrl] = useState(userDetails.cover_pic)

  const handleProfilePicChange = (event) => {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setUserProfilePreviewUrl(objectUrl)
  };

  const handleCoverPicChange = (event) => {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setUserCoverPreviewUrl(objectUrl)
  };

  
  return (
    <div className="w-3/5 h-1/2 mx-auto mb-auto mt-24 shadow-box dark:shadow-darkBox rounded-lg">
       <Form
        method="post"
        className="w-full h-full"
        encType="multipart/form-data"
    >
      <section id="profile_top_part" className="realtive h-full w-full">
        <div className="relative w-full h-full ">
          <img src={userCoverPreviewUrl} className="h-full w-full -z-10 object-fill rounded-lg" />
          <div className={`absolute w-full top-2 right-2  z-10 flex flex-row justify-end`}>
            <Button isIconOnly size="lg" variant="light" 
                    className=" text-secondary bg-primary dark:text-darkSecondary dark:bg-darkPrimary">
              <label htmlFor="coverPic">
                <FontAwesomeIcon icon={faCamera} size="lg" color="white" />
                <input
                  id="coverPic"
                  name="coverPic"
                  type="file"
                  accept="image/png image/jpeg"
                  className="hidden"
                  onChange={handleCoverPicChange}
                />
              </label>
            </Button>
            {/* <Button isIconOnly variant="light" size="lg" 
                    className=" text-secondary bg-primary">
              <label htmlFor="deleteCoverPic">
                <FontAwesomeIcon icon={faXmark} size="lg" color="white" />
                <input
                  id="deleteCoverPic"
                  name="deleteCoverPic" 
                  type="file"
                  accept="image/png image/jpeg"
                  className="hidden"
                />
              </label>
            </Button> */}
          </div>

          <div className="absolute top-[95%] left-4 -translate-y-full h-1/2 w-1/5 z-10 ">
            <img src={userProfilePreviewUrl} className="w-full h-full rounded-lg" />

            <div className="absolute w-full top-2 right-2 z-10 flex flex-row justify-end">
              <Button isIconOnly size="sm" variant="light" 
                      className=" text-secondary bg-primary dark:text-darkSecondary dark:bg-darkPrimary" >
                <label htmlFor="profilePic"  >
                  <FontAwesomeIcon icon={faCamera} size="lg" color="white" />
                  <input
                    id="profilePic"
                    name="profilePic"
                    type="file"
                    accept="image/png image/jpeg"
                    className="hidden w-full h-full"
                    onChange={handleProfilePicChange}
                  />
                </label>
              </Button>

              {/* <Button isIconOnly variant="light" size="sm"
                      className="text-secondary bg-primary">
                <label htmlFor="profilePic">
                  <FontAwesomeIcon icon={faXmark} size="sm" color="white" />
                  <input
                    id="deleteProfilePic"
                    name="deleteProfilePic"
                    type="file"
                    accept="image/png image/jpeg"
                    className="hidden"
                  />
                </label>
              </Button> */}
            </div>
          </div>
        </div>
      </section>
      <Button type="submit"
              className='w-full mt-6 h-[3rem] font-semibold text-lg shadow-button hover:shadow-button-hover
                       hover:text-quarternery hover:bg-primary font-serif text-inherit bg-quarternery
                          dark:shadow-darkButton dark:hover:shadow-darkButton-hover
                          dark:hover:text-darkQuarternery dark:hover:bg-darkPrimary
                          dark:bg-darkQuarternery'>
        Save Changes
      </Button>
    </Form>

    </div>
   
  );
}
