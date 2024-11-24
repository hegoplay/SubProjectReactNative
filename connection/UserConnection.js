import axios from "axios";

const SERVER_URL = "http://localhost:8880/api/users";

export const getUsersPending = async (filter = { maxDistance: 100000 }) => {
    try {
        const response = await axios.get(`${SERVER_URL}/pending`, {
            params: filter, // Pass query parameters here
        });
        console.log(response.data); // Log the response data
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching pending users:", error);
    }
};

export const getUser = async (userId) => {
    try {
        const response = (await axios.get(`${SERVER_URL}/${userId}`)).data;
        console.log(response);
        // const users = await response.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}

// export const getUsersPendingFiltered = async (filter) => {
//     try {
//         const response = (await axios.post(`${SERVER_URL}/pending/filter`, filter)).data;
//         // console.log(response);
//         // const users = await response.json();
//         return response;
//     } catch (error) {
//         console.error(error);
//     }
// }



