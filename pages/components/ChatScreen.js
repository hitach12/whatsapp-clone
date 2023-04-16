import { auth, db } from '@/firebase'
import { Avatar, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Message from './Message'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import TimeAgo from 'timeago-react'

function ChatScreen({chat , messages}) {
    const [user] = useAuthState(auth) 
    const router = useRouter()
    const [messagesSnapShot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'))
    const [input ,setInput] = useState("")

    const [recipientSnapShot] = useCollection(db.collection('users').where("email", '==' ,chat.users[1]))

    const bottomRef = useRef()

    const showMessages = () => {
        if(messagesSnapShot){
        return messagesSnapShot.docs.map(message => (
            <Message key={message.id} user ={message.data().user} message = {{...message.data() , timestamp : message.data().timestamp?.toDate().getTime()}}/>
        ))
        }else {
            console.log('rendering server messages')
            return JSON.parse(messages).map(message =>(
                <Message key={message.id} user ={message.user} message = {message}/>
            ))
        }
    } 

    const scrollToBottom = ()=> {
        bottomRef.current.scrollIntoView({ 
            behavior :'smooth' , 
            block : 'start' })
    }
    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('users').doc(user.uid).set({
            lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        } , {merge : true}
        ) 

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            message : input,
            user : user.email,
            photoURl : user.photoURL
        })

        setInput("")
        scrollToBottom()
    }

    const recipient = recipientSnapShot?.docs?.[0]?.data()
    
    return (
    <Container>
        <Header>
            {recipient ? 
                        <Avatar src={recipient.photoURL}/>
:
<Avatar>
{chat.users[1][0].toUpperCase()}
</Avatar>

        }


            <HeaderInformations>
                <h3>{chat.users[1]}</h3>
                {recipient ? 
                
            <p>Last active ... {' '} {
                recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                ) : "Loading ... "
            }</p>  : 
            <p>Unavailable</p>
            
            }
            </HeaderInformations>
            <HeaderIcons>
            <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>

            </HeaderIcons>
        </Header>

        <MessageContainer>
            {showMessages()}
            <EndOfMessage ref={bottomRef}/>

        </MessageContainer>

        <InputContainer>
         <InsertEmoticonIcon/>
         <Input value={input}  onChange={(e)=> setInput(e.target.value)}/>
        
         <button hidden disabled={input===""} type='submit' onClick = {(e)=> sendMessage(e)}>send Message</button>
         <MicIcon/>

        </InputContainer>
        
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`

`

const Header = styled.div`
    position : sticky;
    background-color:white;
    z-index:100;
    top:0;
    display:flex;
    padding : 11px ;
    height : 80px;
    align-items: center;
    border-bottom : 1px solid whitesmoke;

`

const HeaderInformations = styled.div`
    flex :1;
    margin-left : 15px;

    > h3 {
        margin-bottom: 3px
    }
    > p{
        font-size : 15px;
        color : gray
    }
    `

const HeaderIcons = styled.div`
    display: flex;
    `

const MessageContainer = styled.div`
padding : 30px;
background-color : #e5ded8;
min-height:80vh
`

const EndOfMessage = styled.div`
margin-bottom:50px;

`

const InputContainer = styled.form`
display : flex;
align-items : center;
padding : 10px;
position : sticky;
bottom : 0;
background-color:white;
z-index:100;

`

const Input = styled.input`
    flex : 1;
    outline : none;
    border : none;
    border-radius :10px;
    padding : 20px;
    background-color:white;
    margin-left:15px;
    margin-right:15px;
    `