import React, { useState, useMemo, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';

import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

const New: React.FC<RouteComponentProps> = ({ history }) => {
  const [company, setCompany] = useState<string>('');
  const [techs, setTechs] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [thumbnail, setThumbnail] = useState();

  const preview = useMemo(
    () => (thumbnail ? URL.createObjectURL(thumbnail) : null),
    [thumbnail]
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem('aircnc_token');

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    try {
      await api.post('/spots', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Spot created successfully!',
        icon: 'success',
      }).then((e) => {
        history.push('/dashboard');
      });
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: e.response.data.error,
        icon: 'error',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input
          type="file"
          onChange={(e) =>
            e && setThumbnail(e.target.files && e.target.files[0])
          }
        />
        <img src={camera} alt="Company" />
      </label>
      <label htmlFor="company">COMPANY *</label>
      <input
        id="company"
        placeholder="Your company"
        onChange={(e) => setCompany(e.target.value)}
      />
      <label htmlFor="techs">
        TECHS * <span>(comma separated)</span>
      </label>
      <input
        id="techs"
        placeholder="Which techs do you use?"
        onChange={(e) => setTechs(e.target.value)}
      />
      <label htmlFor="price">RENT PRICE *</label>
      <input
        id="price"
        placeholder="Value per day"
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn">
        Create spot
      </button>
    </form>
  );
};
export default New;
