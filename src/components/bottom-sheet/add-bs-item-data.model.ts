import { List } from "src/list/list.model";

export interface AddItemBottomSheetData {
    type: 'add-item',
    categories: string[],
    lists: List[]
}