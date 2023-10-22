import { Form, useActionData } from "react-router-dom"
import { Button , Input } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane , faFaceLaughSquint , faPaperclip} from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"

export async function action({request}){
    const formData = await request.formData()
    return formData.get("message")
}

export default function InputBox({onSend}){

    const [message, setMessage] = useState("");
    const inputRef = useRef(null)
    
    const handleChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (message.length === 0) {
        return
      }
      const message_obj = {
        "message":{
            "content":message
        }
      }
      onSend(message_obj);
      setMessage("");
      inputRef.current.focus()
    };
  

    return(
        <Form className="flex flex-row m-4 justify-around p-2"
              method="post"
              onSubmit={handleSubmit}>
            <Input type="text"
                    className="m-1"
                    classNames={{
                        input:['text-large'],
                        inputWrapper:[
                            "outline outline-1 outline-offset-1 outline-tertiary dark:outline-darkTertiary",
                            "text-primary dark:text-darkPrimary bg-secondary dark:bg-darkSecondary text-2xl",
                            "group-data-[focus-within=true]:outline-2",
                            "group-data-[focus-within=true]:bg-secondary",
                            "dark:group-data-[focus-within=true]:bg-darkSecondary",
                            "group-data-[hover=true]:bg-secondary",
                            "dark:group-data-[hover=true]:bg-darkSecondary",
                            "group-data-[hover=true]:outline-2",
                            "group-data-[focus-within=true]:shadow-button",
                            "dark:group-data-[focus-within=true]:shadow-darkButton",
                            "group-data-[hover=true]:shadow-button",
                            "dark:group-data-[hover=true]:shadow-darkButton",
                    
                        ],
                    }}
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
                    onChange={handleChange}
                    value={message}
                    ref={inputRef}
                    />
            <Button type="submit" variant="bordered" 
                    startContent={<FontAwesomeIcon icon={faPaperPlane} />}
                    className=' font-semibold text-lg p-2 ml-2 min-w-[10%] h-full
                                shadow-button hover:shadow-button-hover
                              hover:text-quarternery hover:bg-primary/80
                                font-serif text-inherit bg-quarternery
                                dark:shadow-darkButton dark:hover:shadow-darkButton-hover dark:hover:text-darkQuarternery
                                dark:hover:bg-darkPrimary dark:bg-darkQuarternery '>
                Send
            </Button>

        </Form>
    )
}