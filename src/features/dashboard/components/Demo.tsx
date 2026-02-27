import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Demo = () => {
    return <>
        <Field>
            <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
            <ButtonGroup>
                <Input id="input-button-group" placeholder="Type to search..." type="search" />
                <Button variant="outline">Search</Button>
            </ButtonGroup>
        </Field>

        <Field className="mt-6">
            <FieldLabel htmlFor="form-country">Country</FieldLabel>
            <Select defaultValue="us" >
                <SelectTrigger id="form-country">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
            </Select>
        </Field>
    </>
}

export default Demo;