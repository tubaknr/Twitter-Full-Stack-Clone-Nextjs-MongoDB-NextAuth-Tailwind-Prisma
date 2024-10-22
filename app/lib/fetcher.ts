import axios from "axios";

const fetcher = async (url: string) => {
    try{
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error: FETCHER.TS: ", error.message);
    console.log("Error response data: ", error.response?.data);
    console.log("Error response status: ", error.response?.status);
        }else{
            console.log("UNexpected error: FETCHER.TS: ", error);
        }
        throw error;
    }
};

export default fetcher;
