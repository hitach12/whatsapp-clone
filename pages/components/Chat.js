import { db } from '@/firebase'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'

function Chat({id , user}) {
    const [recipientSnapshot]= useCollection(db.collection('users').where("email",'==',user[1]))
    const recipient = recipientSnapshot?.docs[0]?.data()
    const router = useRouter();

    const enterChat = ()=> {
        router.push(`/chat/${id}`)
    }
    return (
    <Conatiner onClick={enterChat}>
        {recipient? 
        <UserAvatar src={recipient.photoURL} /> :
        <UserAvatar>{user[1][0].toUpperCase()}</UserAvatar>
        }
        
       <p>
       {user[1]}
        </p> 

        </Conatiner>

      )
}

export default Chat
const Conatiner = styled.div`
display: flex;
align-items:center;
cursor: pointer;
padding:15px;
word-break: break-word;


:hover {
    background-color: #e9eaeb;
}
`

const UserAvatar = styled(Avatar)`
margin : 5px;
margin-right : 35px;
`