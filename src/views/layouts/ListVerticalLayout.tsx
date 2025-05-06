// React
import * as React from 'react'
import { useState } from 'react'

// ** Next
import { NextPage } from 'next'


// ** MUI
import List from '@mui/material/List'
import { Collapse, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import IconifyIcon from 'src/components/Icon'

// ** Components
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const RecursiveListItems = ({ items, level }: { items: any, level: number }) => {


    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

    const handleClick = (title: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [title]: !prev[title]
        }))

    }

    console.log("open", { openItems })

    return (
        <>
            {items?.map((item: any) => {

                return (
                    <React.Fragment key={item.title}>
                        <ListItemButton

                            sx={{
                                padding: `8px 10px 8px ${level * 10}px`,
                            }}

                            onClick={

                                () => {
                                    if (item.children) {
                                        handleClick(item.title)
                                    }
                                }
                            }>
                            <ListItemIcon>
                                <IconifyIcon icon={item.icon} />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                            {item?.children && item?.children.length > 0 && (
                                <>
                                    {openItems[item.title] ? (
                                        <IconifyIcon icon={"ooui:expand"} style={{
                                            transform: "rotate(180deg)"
                                        }} />
                                    ) : (
                                        <IconifyIcon icon={"ooui:expand"} />
                                    )}

                                </>

                            )}
                        </ListItemButton>

                        {item.children && item.children?.length > 0 && (
                            <>

                                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                                    <RecursiveListItems items={item.children} level={level + 1} />
                                </Collapse>

                            </>
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}

const ListVerticalLayout: NextPage<TProps> = ({ }) => {


    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component='nav'
                aria-labelledby='nested-list-subheader'
            >
                <RecursiveListItems items={VerticalItems} level={1} />
            </List>
        </>
    )
}

export default ListVerticalLayout
