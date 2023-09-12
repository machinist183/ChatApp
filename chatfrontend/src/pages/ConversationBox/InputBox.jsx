import { Form, useActionData } from "react-router-dom"
import { Button , Input } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane , faFaceLaughSquint , faPaperclip} from "@fortawesome/free-solid-svg-icons"

export async function action({request}){
    const formData = await request.formData()
    return formData.get("message")
    
}
export default function InputBox(){

    const formData = useActionData()
    console.log(formData)
    return(
        <Form className="flex flex-row m-4 justify-around"
              method="post">
            <Input type="text"
                    className=" mx-4 "
                    name="message"
                    startContent = {
                        <Button isIconOnly variant="light">
                            <FontAwesomeIcon icon={faFaceLaughSquint} size="xl" />
                        </Button>
                    }
                    endContent={
                        <Button isIconOnly variant="light">
                            <FontAwesomeIcon icon={faPaperclip} size="xl" />
                        </Button>
                    }
                    />
            <Button type="submit" variant="bordered" 
                    startContent={<FontAwesomeIcon icon={faPaperPlane} />}>
                Send
            </Button>

        </Form>
    )
}