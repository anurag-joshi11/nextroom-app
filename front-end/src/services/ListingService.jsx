import axios from "axios";
import { IP_ADDRS } from "./BaseAddress";

export const getListings = async (listingId = null) => {
  try {
    let url = `${IP_ADDRS}/listings`;
    if (listingId) {
      url = `${IP_ADDRS}/listings/${listingId}`;
    }
    console.log("Fetching URL:", url);
    const response = await axios.get(url);
    return response.data; // Return listings or a specific listing
  } catch (error) {
    throw error;
  }
};

export const createListing = async (listingData) => {
  try {
    const response = await axios.post(
      `${IP_ADDRS}/listings/create`,
      listingData,
      { withCredentials: true }
    );
    return response.data; // Return created listing
  } catch (error) {
    throw error;
  }
};

export const getLandlordListings = async (email) => {
  try {
    const response = await axios.get(`${IP_ADDRS}/listings/landlord/${email}`, {
      withCredentials: true,
    });
    return response.data; // Return landlord’s listings
  } catch (error) {
    throw error;
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await axios.post(`${IP_ADDRS}/inquiries`, inquiryData, {
      withCredentials: true,
    });
    return response.data; // Return inquiry submission result
  } catch (error) {
    throw error;
  }
};
