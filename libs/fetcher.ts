import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => {
    if (!res) {
        throw new Error('Network response was not ok');
    }
    return res.data;
});

export default fetcher;
