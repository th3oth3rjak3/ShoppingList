import { ListItem } from "src/list/list-item.model";

export interface DeleteItemBottomSheetData {
    type: "delete-item",
    items: ListItem[]
}