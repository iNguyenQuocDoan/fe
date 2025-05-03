// ** Import Next
import { NextPage } from 'next'


// ** Import React
import { useState } from 'react'


//  ** Import Mui
import { Button, Checkbox, Grid, IconButton, InputAdornment, Link } from '@mui/material'
import { Box, Container, CssBaseline, FormControlLabel, Typography } from '@mui/material'

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

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
    // State

    const [showPassword, setShowPassword] = useState(false)
    const [isRemember, setIsRemember] = useState(true)

    //** theme from MUI-core
    const theme = useTheme()
    const schema = yup
        .object()
        .shape({
            email: yup.string().required('The field is require').matches(EMAIL_REG, 'The field is must email type'),
            password: yup
                .string()
                .required('The field is require')
                .matches(PASSWORD_REG, 'The password is containe charactor, special character, number')
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
                        src={LoginLight}
                        alt='login image'
                        style={{
                            height: 'auto',
                            width: 'auto'
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
                            <Box sx={{ mt: 2 }}>
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

                            <Box sx={{ mt: 2 }}>
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

                                        // InputProps={{
                                        //     endAdornment: (
                                        //         // <InputAdornment position='end'>
                                        //         //     <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                        //         //         {showPassword ? (
                                        //         //             <Icon icon='material-symbols:visibility-outline' />
                                        //         //         ) : (
                                        //         //             <Icon icon='material-symbols:visibility-off-outline' />
                                        //         //         )}
                                        //         //     </IconButton>
                                        //         // </InputAdornment>
                                        //     )
                                        // }}
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
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Box>

                            <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                <Typography>
                                    {"Don't have an account?"}
                                </Typography>

                                <Link href='#' variant='body2'>
                                    {" Sign Up"}
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
