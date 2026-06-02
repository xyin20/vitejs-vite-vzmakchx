import Card from '../components/Card';
import { Link } from 'react-router-dom';

function ShowCreators({ creators }) {
  return (
    <div>
      <h1>💫 Creatorverse</h1>
      <Link to="/new">
        <button>+ Add a Creator</button>
      </Link>

      {creators.length === 0 ? (
        <p>No creators yet. Add one!</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '1.5rem',
          }}
        >
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowCreators;