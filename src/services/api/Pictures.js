import axios from 'axios'

export default {
    pictureUrl: "https://jsonplaceholder.typicode.com/photos",
    getPictures () {
        return axios.get(this.pictureUrl)
            .then(response => {
                return response.data
            })
    },
}