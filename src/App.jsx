import React,{useRef} from 'react';
import { Form } from 'react-bootstrap';
import './index.css';
import axios from 'axios';
const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const fetchImages = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}?query=${
        searchInput.current.value
      }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log('data', data);
    setImages(data.results);
    setTotalPages(data.total_pages);
  } catch (error) {
    console.log(error);
  }
};
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
  };
  const handleSelection = (selection) => {
  searchInput.current.value = selection;
  fetchImages();
};

  return <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
      <Form>
          <Form.Control
            type='search'
            placeholder='Type something to search...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
<div className='filters'>
   <div onClick={() => handleSelection('nature')}>Nature</div>
   <div onClick={() => handleSelection('birds')}>Birds</div>
   <div onClick={() => handleSelection('cats')}>Cats</div>
   <div onClick={() => handleSelection('shoes')}>Shoes</div>
</div>

    </div>;
};

export default App;