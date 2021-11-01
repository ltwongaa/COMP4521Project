// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import client from "./client";

const endpoint = "/works";

const getworks = () => client.get(endpoint);

const addwork = (work) => {
  const data = new FormData();
  data.append("title", work.title);
  data.append("description", work.description);
  data.append("image", { uri: image });
  data.append("likes", 0);
  data.append("likedUsers", {});
};

export default {
  getworks,
};
