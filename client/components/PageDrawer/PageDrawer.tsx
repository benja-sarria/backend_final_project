import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SyntheticEvent, useState } from "react";
import Link from "next/link";
export const PageDrawer = () => {
    const [state, setState] = useState<{ [property: string]: boolean }>({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: any, open: any) => (event: any) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: any) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[
                    "Agregar Productos",
                    "Modificar Productos",
                    "Eliminar Productos",
                ].map((text, index) => (
                    <ListItem button key={text}>
                        <Link href={`/database-manager/manager?type=${text}`}>
                            <a>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText primary={text} />
                            </a>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            {["left"].map((anchor: any) => (
                <>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        Administrar DB
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </>
            ))}
        </div>
    );
};
