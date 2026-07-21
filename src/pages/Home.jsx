import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSearch, TbArrowRight } from 'react-icons/tb';
import '../styles/global.css';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();
    if (!username.trim()) return;

    navigate(`/review/${username.trim()}`);
  }

  return (
    <div className="main home-container">
      <div className="hero">
        <h1 className="hero-title">
          Generate <span className="highlight">cards</span> from your latest reviews on Backloggd.
        </h1>
        <p className="hero-subtitle">
          Enter your Backloggd username to create a share-ready card.
        </p>

        <form className="search-form" onSubmit={submitForm}>
          <div className="input-wrapper">
            <TbSearch className="search-icon" size={20} />
            <input
              name="username"
              type="text"
              className="search-input"
              placeholder="Type your @username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="search-button">
            Generate <TbArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;