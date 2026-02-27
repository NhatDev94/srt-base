import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"
import { Eye, EyeOff } from "lucide-react"
const InputPassword = ({
    ...props
}: React.ComponentProps<typeof Input>) => {
    const [show, setShow] = useState(false)

    return (
        <div className="relative">
            <Input
                {...props}
                type={show ? "text" : "password"}
                className="pr-10"
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShow(!show)}
            >
                {show ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}

export default InputPassword