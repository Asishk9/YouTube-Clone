import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import YouTubeIcon from '@mui/icons-material/YouTube';

import { SearchBar } from "./";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={1}
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        backgroundColor: "#202020",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <YouTubeIcon style={{ height: 40, width: 40, color: "red" }} />
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "10px",
            color: "white",
          }}
        >
          YouTube
        </Typography>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
