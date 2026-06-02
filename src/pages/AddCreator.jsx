import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function AddCreator() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('creators')
      .insert([{ name, url, description, imageURL }]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div>
      <h2>Add a New Creator</h2>

      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        URL
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        Image URL (optional)
        <input
          type="url"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </label>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button onClick={handleSubmit}>Add Creator</button>
        <button className="outline" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  );
}

export default AddCreator;