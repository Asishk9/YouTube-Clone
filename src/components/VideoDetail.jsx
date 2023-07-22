import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Avatar } from "@mui/material";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null);
  const { id } = useParams();
  const [playerWidth, setPlayerWidth] = useState("100%");
  const [playerHeight, setPlayerHeight] = useState("0px");

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
        const channelId = data.items[0]?.snippet?.channelId;
        fetchFromAPI(`channels?part=snippet,statistics&id=${channelId}`)
          .then((channelData) => setChannelDetail(channelData.items[0]));
      });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  const resizePlayer = () => {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= 600;
    const newPlayerWidth = isMobile ? "100%" : "60vw";
    const newPlayerHeight = isMobile ? "35vh" : "70vh";
    setPlayerWidth(newPlayerWidth);
    setPlayerHeight(newPlayerHeight);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    resizePlayer();
    window.addEventListener("resize", resizePlayer);
    return () => {
      window.removeEventListener("resize", resizePlayer);
    };
  }, []);

  if (!videoDetail || !channelDetail) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  const {
    snippet: { thumbnails: { default: { url: channelProfilePicture } = {} } = {} },
    statistics: { subscriberCount },
  } = channelDetail;

  const formatNumber = (number) => {
    if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }
    return number;
  };

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: "#202020" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box px={{ md: 10, xs: 'none' }} sx={{ width: "100%", position: { xs: "relative", md: "sticky" }, top: { xs: "unset", md: "10px" } }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls width={playerWidth} height={playerHeight} />
            <Box py={1} px={1} >
              <Typography pr={{ md: 20 }} color="#fff" variant="h5" fontWeight="bold" mb={2}>
                {title}
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" px={1} >
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    Views: {formatNumber(parseInt(viewCount))}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    Likes: {formatNumber(parseInt(likeCount))}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    Uploaded on {new Date(publishedAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Stack px={2} direction="row" alignItems="center" gap={2} >
              {channelProfilePicture && <Avatar src={channelProfilePicture} alt="Channel Profile" />}
              <Link to={`/channel/${channelId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                </Typography>
              </Link>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                Subscribers: {formatNumber(parseInt(subscriberCount))}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box px={{ md: 8, xs: 2 }} py={{ md: 2, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
