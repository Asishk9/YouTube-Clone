import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: '250px' }, boxShadow: 'none', borderRadius: 0 }}>
     <Link to={`/video/${videoId}`}>
      <CardMedia
        component="img"
        image={snippet?.thumbnails?.high?.url }
        alt={snippet?.title}
        sx={{ width: { xs: '100%', sm: '358px', md: '250px'}, height: 'auto'} }
      />
    </Link>
    <CardContent sx={{ backgroundColor: '#1E1E1E', height: 'auto' }}>
      <Link to={`/video/${videoId}`}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF" sx={{ mb: '8px', fontSize: { xs: '12px', sm: '14px' } }}>
          {snippet?.title?.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={`/channel/${snippet?.channelId}`}>
        <Typography variant="subtitle2" color="gray" sx={{ fontSize: { xs: '10px', sm: '12px' } }}>
          {snippet?.channelTitle }
          <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard;
