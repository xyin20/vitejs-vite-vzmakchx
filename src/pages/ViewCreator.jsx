import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <p aria-busy="true">Loading...</p>;
  }

  return (
    <article>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      )}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit Channel
      </a>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
        <Link to={`/edit/${creator.id}`}>
          <button className="secondary">Edit</button>
        </Link>
        <button className="outline" onClick={() => navigate('/')}>Back</button>
      </div>
    </article>
  );
}

export default ViewCreator;