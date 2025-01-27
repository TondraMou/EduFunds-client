import axios from 'axios';

const axiosPublic=axios.create({
    baseURL:'https://edu-server-one.vercel.app/'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;