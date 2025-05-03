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

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
    // State

    const [showPassword, setShowPassword] = useState(false)
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
            <Container component='main' maxWidth='xs'>
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

                        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                        <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='#' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default LoginPage
