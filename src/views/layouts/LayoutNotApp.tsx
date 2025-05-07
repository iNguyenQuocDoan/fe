// ** react
import * as React from 'react'

// ** next
import { NextPage } from 'next'

// ** MUI

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

// ** layout
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'

type TProps = {
  children: React.ReactNode
}

const LayoutNotApp: NextPage<TProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HorizontalLayout toggleDrawer={() => {}} open={open} isHideMenu />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default LayoutNotApp
