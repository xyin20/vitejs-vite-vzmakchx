import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL || '');
      }
    };

    fetchCreator();
  }, [id]);


  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this creator?');
    if (!confirm) return;

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      window.location.href = '/';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .update({ name, url, description, imageURL })
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div>
      <h2>Edit Creator</h2>

      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>URL</label>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Image URL (optional)</label>
      <input
        type="url"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />

      <button onClick={handleUpdate}>Save Changes</button>
      <button onClick={() => navigate('/')}>Cancel</button>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete Creator
      </button>
    </div>
  );
}

export default EditCreator;