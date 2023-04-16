import { Avatar, Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator'
import { auth, db } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import  {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat';
function SideBar() {

    const [user] = useAuthState(auth) 
    const userChatRef = db.collection('chats').where('users', 'array-contains' , user.email)
    const [chatSnapshot] = useCollection(userChatRef)
    const createChat = () => {
        const input = prompt("please enter the email for the usser you want to chat with")
        if(!input) return   null;
        if(EmailValidator.validate(input) && !chatAlreadyExiste(input) && input !== user.email){
            db.collection('chats').add({
                users : [user.email , input]
            })
        }
    }

    const chatAlreadyExiste = (recipientEmail) => (
        !!chatSnapshot.docs.find(chat => 
            chat.data().users.find(user => user === recipientEmail)?.length > 0
            
            )
            )

  return (

    <Containter>
        <Header>
        <UserAvatar onClick={()=> {auth.signOut()}} src={user.photoURL}/>
        <IconsContainer>
            <IconButton>
            <ChatIcon />
            </IconButton>
            <IconButton>
            <MoreVertIcon />

            </IconButton>

        </IconsContainer>
        </Header>

                <Search>
                    <SearchIcon />
                    <SearchInput placeholder="Search in chat" />    
                </Search>
                <SideBarButton onClick={()=> createChat()}>
                    Start a New Chat
                </SideBarButton>

                {chatSnapshot?.docs.map(chat => (<Chat key={chat.id} id ={chat.id} user= {chat.data().users}/>))}
    </Containter>
        )
}

export default SideBar

const Containter = styled.div`
flex :0.45;
border-right : 1px solid whitesmoke;
height:100vh;
min-width : 300px;
max-width : 350px; 
overflow-y:scroll;   
::-webkit-scrollbar {
        display : none;
    }

    -ms-overflow-style : none ;
    scrollbar-width : none;

`

const Header = styled.div`
display: flex;
position: sticky;
top:0;
background-color:white;
z-index:1;
justify-content:space-between;
align-items:center;
padding:15px;
border-bottom:1px solid whitesmoke;


`

const UserAvatar = styled(Avatar)`
cursor: pointer;

:hover{
    opacity: 0.8
}
`

const IconsContainer = styled.div``


const Search = styled.div`

display: flex;

align-items:center;
padding:5px;
border-radius:2px;
`


const SearchInput = styled.input`
outline-width:0;
border:none;
flex: 1;
background-color:transparent
`

const SideBarButton = styled(Button)`
width:100%;
color : black;
&&&{
    border-top:1px solid whitesmoke;
    border-bottom:1px solid whitesmoke;
}
`
