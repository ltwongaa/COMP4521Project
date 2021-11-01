// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import { create } from "apisauce";

const apiClient = create({
  baseURL:
    "https://comp4521-e2cd9-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export default apiClient;
