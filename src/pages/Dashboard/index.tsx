import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../services/api';
import './styles.css';

interface SpotType {
  company: string;
  price?: number;
  thumbnail: string;
  thumbnail_url: string;
  techs: string;
  id: number;
}

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const [spots, setSpots] = useState<Array<SpotType>>([]);
  useEffect(() => {
    const token = localStorage.getItem('aircnc_token');
    if (!token) {
      history.push('/');
    }
    async function loadSpots() {
      try {
        const response = await api.get('/spots', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setSpots(response.data);
      } catch (e) {
        Swal.fire({
          title: 'Error!',
          text: e.response.data.error,
          icon: 'error',
        });
      }
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot.id}>
            <header
              style={{
                backgroundImage: `url(${spot.thumbnail_url})`,
                backgroundColor: '#ddd',
              }}
            />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `$${spot.price}/day` : 'FREE'}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Create another spot</button>
      </Link>
    </>
  );
};

export default Dashboard;
