import axios from "axios";

const url = 'https://viacep.com.br/ws/'

export default {
     getApi: async (unmaskedCep) => {
        let response = await axios.get(`${url}/${unmaskedCep}/json/`)
        return response.data
    }
}