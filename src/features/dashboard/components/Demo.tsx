import { Button } from "@nhatdev94/common-ui";
import { ButtonGroup } from "@nhatdev94/common-ui";
import { Field, FieldLabel } from "@nhatdev94/common-ui";
import { Input } from "@nhatdev94/common-ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nhatdev94/common-ui";

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