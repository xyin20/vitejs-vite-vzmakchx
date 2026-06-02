import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*');

      if (data) {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  const element = useRoutes([
    { path: '/',          element: <ShowCreators creators={creators} /> },
    { path: '/new',       element: <AddCreator /> },
    { path: '/:id',       element: <ViewCreator /> },
    { path: '/edit/:id',  element: <EditCreator /> },
  ]);

  return (
    <div className="container">
      {element}
    </div>
  );
}

export default App;