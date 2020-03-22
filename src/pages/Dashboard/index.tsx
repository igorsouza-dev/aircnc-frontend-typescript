import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../services/api';

interface SpotType {
  company: string;
  price: number;
  thumbnail: string;
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
            <header />
            <strong>{spot.company}</strong>
            <span>{spot.price}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
