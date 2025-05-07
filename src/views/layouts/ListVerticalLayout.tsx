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

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: {
    [key: string]: boolean
  }
  items: any

  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  disabled: boolean
}

const RecursiveListItems: NextPage<TListItems> = ({
  items,
  level,

  openItems,
  setOpenItems,
  disabled
}) => {
  const handleClick = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  console.log('open', { openItems })

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`
              }}
              onClick={() => {
                if (item.children) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              {!disabled && <ListItemText primary={item?.title} />}
              {item?.children && item?.children.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon
                      icon={'ooui:expand'}
                      style={{
                        transform: 'rotate(180deg)'
                      }}
                    />
                  ) : (
                    <IconifyIcon icon={'ooui:expand'} />
                  )}
                </>
              )}
            </ListItemButton>

            {item.children && item.children?.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems
                    items={item.children}
                    level={level + 1}
                    openItems={openItems}
                    disabled={disabled}
                    setOpenItems={setOpenItems}
                  />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  React.useEffect(() => {
    if (!open) {
      setOpenItems({})
    }
  }, [open])

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        <RecursiveListItems
          disabled={!open}
          items={VerticalItems}
          level={1}
          openItems={openItems}
          setOpenItems={setOpenItems}
        />
      </List>
    </>
  )
}

export default ListVerticalLayout
