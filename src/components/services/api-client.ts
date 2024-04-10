import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "8fb9eeb2af394ae3b3f0644520e762c7",
  },
});
