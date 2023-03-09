import axios from "axios";


const url = "https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json";

export const getApiData = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log(e);
    return "Error has occured";
  }
};