import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSearch, TbArrowRight } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import '../styles/global.css';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  function submitForm(e) {
    e.preventDefault();
    if (!username.trim()) return;

    navigate(`/review/${username.trim()}`);
  }

  return (
    <div className="main home-container">
      <div className="hero">
        <h1 className="hero-title">
          {t('home.title_part1')}
          <span className="highlight">{t('home.title_highlight')}</span>
          {t('home.title_part2')}
        </h1>
        <p className="hero-subtitle">
          {t('home.subtitle')}
        </p>

        <form className="search-form" onSubmit={submitForm}>
          <div className="input-wrapper">
            <TbSearch className="search-icon" size={20} />
            <input
              name="username"
              type="text"
              className="search-input"
              placeholder={t('home.placeholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="search-button">
            {t('home.button')} <TbArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;