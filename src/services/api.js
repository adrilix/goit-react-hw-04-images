
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
    key: '29627858-41c1c6901e5456b7eb4365fd8',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
};

async function getImagePixabay (pageNumber, input) {
    try {
        const { data } = await axios.get(``, {
            params: {
                page: pageNumber,
                q: input,
            },
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default getImagePixabay;   
