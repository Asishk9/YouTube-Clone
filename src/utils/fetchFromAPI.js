import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    part: "id,snippet",
    type: "video",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": "de40c5704dmsh1d24f4e2a6c8811p149838jsne7fc3a7bf9da",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};