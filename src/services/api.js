
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

// const BASE_URL = 'https://pixabay.com';
// const API_KEY = '32639885-f1e4dacd717d4e1c1fb5816a4';

// export const fetchImages = async (query, page) => {
//   const response = await axios.get(
//     `${BASE_URL}/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   const images = response.data.hits.map(
//     ({ id, webformatURL, largeImageURL, tags }) => {
//       return {
//         id,
//         webformatURL,
//         largeImageURL,
//         tags,
//       };
//     }
//   );
//   return { images, totalImages: response.data.totalHits };
// };