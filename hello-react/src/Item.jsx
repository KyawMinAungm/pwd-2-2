import { ListItem, ListItemText, IconButton } from "@mui/material";

import {
    SquareOutlined as CheckIcon,
    Check as UndoIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";

export default function Item({ item, del, toggle }) {
    return <ListItem>
        <IconButton onClick={() => toggle(item.id)}>
            {item.done ? <UndoIcon color="success" /> : <CheckIcon />}
        </IconButton>
        <ListItemText primary={item.name} />
        <IconButton onClick={() => del(item.id)}>
            <DeleteIcon />
        </IconButton>
    </ListItem>;
}
