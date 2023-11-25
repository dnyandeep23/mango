import axios from "axios";

const params = {
  headers: {
    Authorization: 'Bearer ' + process.env.REACT_APP_STRIPE_APP_KEY,
  },
};

export const fetchDataFromAPI = async (url) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_DEV_URL + url, params);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const makePaymentRequest =
  axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
  })

export const createEntry = async (contentType, data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_DEV_URL} +/${contentType}`, data);

    if (response.status === 201) {
      console.log('Entry created successfully');
      return response.data;
    } else {
      throw new Error('Failed to create entry');
    }
  } catch (error) {
    console.error('Error creating entry:', error);
    //   throw error;
  }
};