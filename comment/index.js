import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
import {randomBytes} from 'crypto'

app.use(express.json())
const commentsPostId = {}
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsPostId[req.params.id] || [])
})
app.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const comments = commentsPostId[req.params.id] || []
    comments.push({id:commentId,content})
    commentsPostId[req.params.id] = comments
    res.status(201).send(comments)
})

app.listen(4001,()=>{
    console.log('Listening to port 4001')
})