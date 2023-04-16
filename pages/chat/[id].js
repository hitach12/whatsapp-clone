import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import SideBar from '../components/SideBar'
import ChatScreen from '../components/ChatScreen'
import { auth, db } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Chat({messages , chat}) {
    const [user]=useAuthState(auth)

  return (
    <Container>
        <Head>
            <title>Chat with {chat.users[1]}</title>
        </Head>
        <SideBar/>
        <ChatContainer>
            <ChatScreen chat = {chat} messages= {messages}/>
        </ChatContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);

    const messagesRef  = await ref.collection("messages").orderBy("timestamp",'asc').get();
    const messages = messagesRef.docs.map(doc => ({ id : doc.id , ... doc.data()})).map(message => ({
        ...message,
        timestamp : message.timestamp.toDate().getTime()
    }));

    const chatRes = await ref.get();
    const chat ={
        id : chatRes.id,
        ...chatRes.data()

    } 
    console.log( chat , messages)

    return {
        props : {
            messages : JSON.stringify(messages),
            chat : chat
        }
    }
    
}
const Container = styled.div`
display: flex;
`

const ChatContainer = styled.div`
    flex : 1;
    overflow : scroll;
    height : 100vh;

    ::-webkit-scrollbar {
        display : none;
    }

    -ms-overflow-style : none ;
    scrollbar-width : none;

`
