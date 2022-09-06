import { ListItem } from "src/list/list-item.model";
import { List } from "src/list/list.model";

export interface EditItemBottomSheetData {
    type: "edit-item",
    categories: string[],
    items: ListItem[],
    lists: List[]
  }