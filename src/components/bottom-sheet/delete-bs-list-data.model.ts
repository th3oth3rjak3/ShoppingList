import { List } from "src/list/list.model";

export interface DeleteListBottomSheetData {
    type: "delete-list",
    lists: List[]
}