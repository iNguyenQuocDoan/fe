// React
import * as React from 'react'
import { useState } from 'react'

// ** Next
import { NextPage } from 'next'
import { Box, BoxProps, styled } from '@mui/material'

// ** MUI
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Collapse, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import VerticalLayout from './VerticalLayout'

// ** Component
import { VerticalItems } from 'src/configs/layout'

type TProps = {}



const ListVerticalLayout: NextPage<TProps> = ({ }) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => { setOpen(!open) }

    console.log("open", { open })

    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component='nav'
                aria-labelledby='nested-list-subheader'
            >
                {VerticalItems?.map((item) => {

                    return (
                        <React.Fragment key={item.title}>
                            <ListItemButton onClick={
                                () => {
                                    if (item.children) {
                                        handleClick()
                                    }
                                }
                            }>
                                <ListItemIcon>
                                    <IconifyIcon icon={item.icon} />
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>

                            {item.children && item.children?.length > 0 && (
                                <>
                                    {item.children?.map((child) => {
                                        return (<>
                                            <Collapse in={open} timeout='auto' unmountOnExit>
                                                <List component='div' disablePadding>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <ListItemIcon>
                                                            <IconifyIcon icon={child.icon} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={child.title} />
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        </>)

                                    })}
                                </>
                            )}
                        </React.Fragment>
                    )
                })}
            </List>
        </>
    )
}

export default ListVerticalLayout
