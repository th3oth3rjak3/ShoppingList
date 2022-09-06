import { List } from "src/list/list.model";

export interface EditListBottomSheetData {
    type: "edit-list",
    lists: List[]
}