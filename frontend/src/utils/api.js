import axios from "axios"

const sendFiles = async(filesFormData) => {
    try {
     
        const response = await axios.post("http://localhost:3000/api/upload/upload", filesFormData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const sendQuery = async(query) => {
    try {
        const response = await axios.post("http://localhost:3000/api/chat/sendAndReceiveQuery", {query});
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { sendFiles, sendQuery }