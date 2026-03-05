'use client'

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@nhatdev94/common-ui"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@nhatdev94/common-ui"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@nhatdev94/common-ui"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@nhatdev94/common-ui"
import { Input } from "@nhatdev94/common-ui"
import InputFile from "@/components/common/InputFile"

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
    upload: z.instanceof(File)
})

const DialogCreate = () => {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            upload: undefined
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Click Me</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Bug Title
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Login button not working on mobile"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Description
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="form-rhf-demo-description"
                                                placeholder="I'm having an issue with the login button on mobile."
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/100 characters
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FieldDescription>
                                            Include steps to reproduce, expected behavior, and what
                                            actually happened.
                                        </FieldDescription>
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
                                            onChange={(file) => field.onChange(file)}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <DialogFooter className="mt-12">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogCreate