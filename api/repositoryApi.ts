import axios from "axios";

const repositoryApi = axios.create({
    baseURL: "/api",
})

export default repositoryApi;