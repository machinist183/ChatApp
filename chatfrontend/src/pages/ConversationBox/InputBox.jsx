import { Form } from "react-router-dom"
import { Button , Input } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane , faFaceLaughSquint , faPaperclip} from "@fortawesome/free-solid-svg-icons"
export default function InputBox(){
    return(
        <Form className="flex flex-row m-4 justify-around" method="post">
            <Input type="text"
                    className=" mx-4 "
                    startContent ={
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
            <Button variant="bordered" 
                    startContent={<FontAwesomeIcon icon={faPaperPlane} />}>
                Send
            </Button>

        </Form>
    )
}