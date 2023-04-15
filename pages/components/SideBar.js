import { Avatar, Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
function SideBar() {
  return (

    <Containter>
        <Header>
        <UserAvatar/>
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
                <SideBarButton>
                    Start a New Chat
                </SideBarButton>
    </Containter>
        )
}

export default SideBar

const Containter = styled.div`

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