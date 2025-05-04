// ** Import Next
import { NextPage } from 'next'


// ** Import React
import { useState } from 'react'


//  ** Import Mui
import { Button, IconButton, InputAdornment } from '@mui/material'
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
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'

import Google from '/public/svgs/google.svg'
import Facebook from '/public/svgs/facebook.svg'


// ** theme 
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'

type TProps = {}
type TDefaultValue = {
    email: string,
    password: string,
    comfirmPassword: string
}

const RegisterPage: NextPage<TProps> = () => {
    // State

    const [showPassword, setShowPassword] = useState(false)
    const [showComfirmPassword, setShowConfirmPassword] = useState(false)
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
                .matches(PASSWORD_REG, 'The password is containe charactor, special character, number'),
            comfirmPassword: yup
                .string()
                .required('The field is require')
                .matches(PASSWORD_REG, 'The password is containe charactor, special character, number').oneOf([yup.ref("password"), ""], "The confirm password need map with password ")
        })


    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            comfirmPassword: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


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
                        src={theme.palette.mode === "light" ? RegisterLight : RegisterDark}
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
                            Register
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
                                            label='Comfirm password'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(errors?.comfirmPassword)}
                                            placeholder='Enter confirm password'
                                            helperText={errors?.comfirmPassword?.message}
                                            type={showComfirmPassword ? 'text' : 'password'}


                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton edge='end' onClick={() => setShowConfirmPassword(!showComfirmPassword)}>
                                                            {showComfirmPassword ? (
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
                                    name='comfirmPassword'
                                />
                            </Box>




                            <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                                Register
                            </Button>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                <Typography>
                                    {"Do you have an account?"}
                                </Typography>

                                <Link href='/login' style={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }} >
                                    {" Login "}
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
                </Box >
            </Box >
        </>
    )
}

export default RegisterPage
