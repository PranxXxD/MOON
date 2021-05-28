import axios from "axios";

export const createContact = async (contact) =>
  await axios.post(`${process.env.REACT_APP_API}/contact`, { contact });
