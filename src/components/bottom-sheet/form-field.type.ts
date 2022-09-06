import { FormControl } from "@angular/forms"
import { Item } from "src/items/item.model"

export type FormField = {
    field: FormControl,
    name: string,
    value: string,
    errorText: string,
    type: string,
    placeholder: string
    options?: Item[]
}