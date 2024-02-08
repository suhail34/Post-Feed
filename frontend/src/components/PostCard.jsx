import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import PostContext from './PostContext';

export default function PostCard({key, props}) {
  const {post, setPost} = React.useContext(PostContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("username", JSON.parse(localStorage.getItem("userProfile")));
    const commentData = Object.fromEntries(formData.entries());
    const payload = {};
    const posts = document.getElementsByClassName(props._id) 
    console.log(posts[0].innerHTML);
    payload["username"] = posts[0].innerHTML;
    payload["content"] = posts[1].innerHTML;
    payload["comment"] = commentData;
    console.log(payload);
    try {
      const resp = await axios.post('http://localhost:8080/api/post/create', payload, {withCredentials:true});
      console.log(resp);
    } catch(err) {
      console.error(err);
    }
  }
  return (
    <Card variant='outlined' sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography className={props._id} variant="h5" component="div">
          {props.username}
        </Typography>
        <Typography className={props._id} variant="body2">
          {props.content}
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>Comments</AccordionSummary>
          <form onSubmit={handleSubmit}>
            <TextField style={{margin:"0 1rem 1rem 1rem"}} id="standard-basic" name='comment' label="Standard" variant='standard' />
            <Button type='submit' style={{margin:"0 1rem 1rem 1rem"}} variant='outlined'>Comment</Button>
          </form>
            {props.comments.length>0 ? (props.comments.map((item, idx)=>{
                return (
                  <AccordionDetails key={idx+1}>
<Typography variant='body1' component={"div"}>
                      {item.username}
                    </Typography>
                    <Typography variant='body2' component={"div"}>
                      {item.comment}
                    </Typography>
                  </AccordionDetails>
                )
            })): <div style={{margin:"1rem"}}>No Comments</div>}
        </Accordion>
      </CardContent>
</Card>
  );
}
