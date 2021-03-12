import axios from "axios";

//list
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

//read
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

//delete
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

//update
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

//create
export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
