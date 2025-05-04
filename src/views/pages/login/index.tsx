// ** Import Next
import { NextPage } from 'next'



// ** Import React
import { useState } from 'react'


//  ** Import Mui
import { Button, Checkbox, IconButton, InputAdornment } from '@mui/material'
import { Box, CssBaseline, FormControlLabel, Typography } from '@mui/material'

// ** Import form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// import Components
import CustomTextField from 'src/components/text-field'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import Icon from 'src/components/Icon'
import Image from 'next/image'

// **  Images
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import Google from '/public/svgs/google.svg'
import Facebook from '/public/svgs/facebook.svg'


// ** theme 
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
    // State

    const [showPassword, setShowPassword] = useState(false)
    const [isRemember, setIsRemember] = useState(true)

    // ** context

    const { login } = useAuth()



    //** theme from MUI-core
    const theme = useTheme()
    const schema = yup
        .object()
        .shape({
            email: yup.string().required('The field is require').matches(EMAIL_REG, 'The field is must email type'),
            password: yup
                .string()
                .required('The field is require')
                .matches(PASSWORD_REG, 'Password is contain charactor, special character, number')
        })
        .required()

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    console.log('erorr', { errors })
    const onSubmit = (data: { email: string; password: string }) => {
        if (!Object.keys(errors)?.length) {
            login({ ...data, rememberMe: isRemember })
        }

        console.log('data', { data, errors })
    }

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    // gap: "15%"

                    padding: '30px'
                }}
            >
                <Box
                    display={{
                        md: "flex",
                        sm: "flex",
                        xs: "none"

                    }}
                    sx={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '20px',
                        backgroundColor: theme.palette.customColors.bodyBg,
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Image
                        src={theme.palette.mode === "light" ? LoginLight : LoginDark}
                        alt='login image'
                        style={{
                            height: '70% ',
                            width: '70%',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            objectFit: "contain"

                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                            <Box sx={{ mt: 2, width: "350px" }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label='Email'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(errors?.email)}
                                            placeholder='Please input email'
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    name='email'
                                />
                            </Box>

                            <Box sx={{
                                mt: 2,
                                width: "350px"
                            }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label='Password'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(errors?.password)}
                                            placeholder='Please input password'
                                            helperText={errors?.password?.message}
                                            type={showPassword ? 'text' : 'password'}

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? (
                                                                <Icon icon='material-symbols:visibility-outline' />
                                                            ) : (
                                                                <Icon icon='material-symbols:visibility-off-outline' />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    // Edge / IE
                                                    '& input::-ms-reveal, & input::-ms-clear': {
                                                        display: 'none',
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                    name='password'
                                />
                            </Box>
                            <Box sx={{ mt: '5px', display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                {' '}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value='remember'
                                            color='primary'
                                            checked={isRemember}
                                            onChange={e => setIsRemember(e.target.checked)}
                                        />
                                    }
                                    label='Remember me'
                                />
                                <Typography >
                                    Forgot password?
                                </Typography>
                            </Box>

                            <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                <Typography>
                                    {"Don't have an account?"}
                                </Typography>

                                <Link style={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }} href='register' >
                                    {" Resgiter"}
                                </Link>

                            </Box>
                            <Typography sx={{ textAlign: "center", mt: 2, mb: 2 }}>OR</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                <IconButton sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Image src={Google} style={{ height: "40px", width: "40px" }} alt="Google" />
                                </IconButton>
                                <IconButton>
                                    <Image src={Facebook} style={{ height: "40px", width: "40px" }} alt="Google" />
                                </IconButton>

                            </Box>

                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LoginPage
