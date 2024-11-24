import axios from "axios";

const SERVER_URL = "http://localhost:8880/api/chatList";

export const getChatList = async () => {
    try {
        const response = (await axios.get(`${SERVER_URL}`)).data;
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getChat = async (chatId) => {
    try {
        const response = (await axios.get(`${SERVER_URL}/${chatId}`)).data;
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const appendChat = async (chatId, message) => {
    try {
        const response = (await axios.put(`${SERVER_URL}/${chatId}`, message)).data;
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const createChat = async (chatId) => {
    try {
        const response = (await axios.post(`${SERVER_URL}`, {
            _id: chatId,
            chatHistory: [],
        })).data;
        return response;
    } catch (error) {
        console.error(error);
    }
}
