import { auth, provider } from '@/firebase'
import { Button } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
    
    }

  return (
    <Container>
        <Head>
        <title>Login</title>
        </Head>

        <LoginContainer>
        <Logo src = 'https://cdn3.iconfinder.com/data/icons/social-media-logos-flat-colorful/2048/5302_-_Whatsapp-512.png'/>
        <Button onClick={()=> signIn()}>Sign-in with google</Button>
        </LoginContainer>
        

    </Container>   
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height:100vh;
  background-color:whitesmoke;
`

const LoginContainer = styled.div`
padding:100px;
  display: flex;
  flex-direction: column;
    align-items : center;
    background-color:white;
    border-radius:5px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);

`

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom:50px;
`