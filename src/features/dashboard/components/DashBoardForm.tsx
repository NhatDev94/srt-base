'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputPhone } from "@/components/common/InputPhone"
import { Button } from "@/components/ui/button"
import InputFile from "@/components/common/InputFile"
import { toast } from "sonner"

const MAX_FILE = 3

const formSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address."),
    phone: z
        .string()
        // Thông báo lỗi sẽ tự động dùng màu --destructive của shadcn
        .min(1, "Please do not leave the phone number blank.")
        .length(10, "The phone number must consist of exactly 10 digits.")
        .regex(/^0\d{9}$/, "The phone number must start with 0 and contain only digits"),
    upload: z
        .array(z.instanceof(File))
        .min(1, "Please select at least 1 file")
        .max(MAX_FILE, `You can only select up to ${MAX_FILE} files`)
})

const DashBoardForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            phone: "",
            upload: []
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
    }
    return <form onSubmit={form.handleSubmit(onSubmit)} className="w-full" >
        <FieldGroup>
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-email">
                            Email
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-email"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your email"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-phone">
                            Phone
                        </FieldLabel>
                        <InputPhone
                            // không dùng {...field} vì onChange của react-hook-form sẽ bị ghi đè bởi onValueChange của react-number-format, nên phải map thủ công như dưới
                            // {...field} 
                            id="form-rhf-phone"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            onValueChange={(values) => {
                                field.onChange(values.value)
                            }}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="upload"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-upload">Upload File</FieldLabel>
                        <InputFile
                            ref={field.ref}
                            error={fieldState.invalid}
                            preview
                            maxFiles={MAX_FILE}
                            onChange={(file) => field.onChange(file)}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </FieldGroup>

        <Button type="submit" className="mt-8 w-full">
            Submit
        </Button>
    </form>
}

export default DashBoardForm;