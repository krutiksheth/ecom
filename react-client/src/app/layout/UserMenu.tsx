import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {User} from "../models/user.ts";
import {Divider, ListItemIcon, ListItemText} from '@mui/material';
import {History, Logout, Person} from '@mui/icons-material';
import {useLogoutMutation} from "../../features/account/accountApi.ts";

type Props = {
    user: User;
}
export default function UserMenu({user}: Props) {
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {user.email}
            </Button>
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText>
                        My Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <History/>
                    </ListItemIcon>
                    <ListItemText>
                        Orders
                    </ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout/>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText></MenuItem>
            </Menu>
        </div>
    );
}