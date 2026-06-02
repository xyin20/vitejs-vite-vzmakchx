import { Link } from 'react-router-dom';

function Card({ id, name, url, description, imageURL }) {
  return (
    <article style={{ padding: '1rem' }}>
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Visit Channel
      </a>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <Link to={`/${id}`}>
          <button className="outline">View</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button className="outline secondary">Edit</button>
        </Link>
      </div>
    </article>
  );
}

export default Card;