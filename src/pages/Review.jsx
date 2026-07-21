import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TbTrophy,
  TbCalendar,
  TbQuoteOpen,
  TbQuote,
  TbStarFilled,
  TbArrowLeft,
  TbAdjustments,
  TbShare,
  TbCheck,
  TbEye,
  TbEyeOff,
  TbAlertCircle,
  TbRefresh
} from "react-icons/tb";
import { toPng } from 'html-to-image';
import '../styles/global.css';

function Review() {
  const { username } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [review, setReview] = useState(null);
  const [user, setUser] = useState(null);

  const [showMastered, setShowMastered] = useState(true);
  const [showDateTime, setShowDateTime] = useState(true);
  const [showGameReview, setShowGameReview] = useState(true);
  const [showBackgroundColor, setShowBackgroundColor] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [reviewRes, userRes] = await Promise.all([
        fetch(`/api/review?username=${username}`),
        fetch(`/api/user?username=${username}`)
      ]);

      const reviewData = await reviewRes.json();
      const userData = await userRes.json();

      if (!reviewRes.ok || !userRes.ok) {
        const errorMessage = reviewData?.error || userData?.error || "User or review not found.";
        throw new Error(errorMessage);
      }

      setReview(reviewData);
      setUser(userData);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message || "Failed to load review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchData();
    }
  }, [username]);

  function truncateReview(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    const finalResult = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

    return `${finalResult.trimEnd()}...`;
  }

  const handleShareCard = async () => {
    if (!cardRef.current) return;

    try {
      setIsExporting(true);

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: false,
        backgroundColor: showBackgroundColor ? 'var(--bg-card)' : 'rgba(0,0,0,0)',
        style: {
          backgroundColor: showBackgroundColor ? 'var(--bg-card)' : 'transparent',
        },
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();

      const fileName = `${username}-${review?.game?.name || 'review'}-card.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${user?.username || username}'s Review Card`,
          text: `Check out ${user?.username || username}'s review on Backloggd!`
        });
      } else {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share image', err);
      }
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="main">
        <div className="review skeleton-card">
          <div className="skeleton-cover"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-stars"></div>
          <div className="skeleton-badge"></div>
          <div className="skeleton-quote"></div>
          <div className="skeleton-user"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <div className="error-card">
          <TbAlertCircle size={48} className="error-icon" />
          <h2 className="error-title">User not found</h2>
          <p className="error-message">{error}</p>

          <div className="error-actions">
            <button className="search-button" onClick={fetchData}>
              <TbRefresh size={18} />
              Try Again
            </button>
            <button className="icon-btn" onClick={() => navigate('/')} title="Back to Home">
              <TbArrowLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const ratingPercentage = review?.rating ? (review.rating / 5) * 100 : 0;

  return (
    <div className="main">
      <div className="action-bar">
        <button
          className="icon-btn"
          onClick={() => navigate('/')}
          title="Back to Home"
          aria-label="Back to Home"
        >
          <TbArrowLeft size={20} />
        </button>

        <div className="controls-group">
          <div className="dropdown-container">
            <button
              className={`icon-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Customize Card"
            >
              <TbAdjustments size={20} />
            </button>

            {isMenuOpen && (
              <div className="menu-dropdown">
                <span className="menu-title">Card settings</span>

                <button
                  className="menu-item"
                  onClick={() => setShowMastered(!showMastered)}
                >
                  {showMastered ? <TbEye size={16} /> : <TbEyeOff size={16} />}
                  <span>Mastered badge</span>
                  {showMastered && <TbCheck size={16} className="check-icon" />}
                </button>

                <button
                  className="menu-item"
                  onClick={() => setShowDateTime(!showDateTime)}
                >
                  {showDateTime ? <TbEye size={16} /> : <TbEyeOff size={16} />}
                  <span>Date</span>
                  {showDateTime && <TbCheck size={16} className="check-icon" />}
                </button>

                <button
                  className="menu-item"
                  onClick={() => setShowGameReview(!showGameReview)}
                >
                  {showGameReview ? <TbEye size={16} /> : <TbEyeOff size={16} />}
                  <span>Review quote</span>
                  {showGameReview && <TbCheck size={16} className="check-icon" />}
                </button>

                <button
                  className="menu-item"
                  onClick={() => setShowBackgroundColor(!showBackgroundColor)}
                >
                  {showBackgroundColor ? <TbEye size={16} /> : <TbEyeOff size={16} />}
                  <span>Background</span>
                  {showBackgroundColor && <TbCheck size={16} className="check-icon" />}
                </button>
              </div>
            )}
          </div>

          <button
            className="download-btn"
            onClick={handleShareCard}
            disabled={isExporting}
          >
            <TbShare size={18} />
            {isExporting ? 'Generating...' : 'Share'}
          </button>
        </div>
      </div>

      <div
        className="review"
        ref={cardRef}
        style={{
          backgroundColor: showBackgroundColor ? 'var(--bg-card)' : 'transparent'
        }}
      >
        <div className="review-header">
          <img
            src={review?.game?.cover}
            alt={`${review?.game?.name} game cover`}
            className="game-cover"
          />

          <a href={review?.game?.url} className="link" target='_blank' rel="noreferrer">
            <p className="game-title">{review?.game?.name}</p>
          </a>
        </div>

        <div className="review-body">
          {review?.rating && (
            <div className="game-rating">
              <div className="stars-bg">
                <TbStarFilled size={20} />
                <TbStarFilled size={20} />
                <TbStarFilled size={20} />
                <TbStarFilled size={20} />
                <TbStarFilled size={20} />
              </div>

              <div className="stars-filled" style={{ width: `${ratingPercentage}%` }}>
                <div className="stars-inner">
                  <TbStarFilled size={20} />
                  <TbStarFilled size={20} />
                  <TbStarFilled size={20} />
                  <TbStarFilled size={20} />
                  <TbStarFilled size={20} />
                </div>
              </div>
            </div>
          )}

          {(showMastered && review?.mastered === true) && (
            <p className="mastered">
              <TbTrophy size={18} />
              <span>Mastered</span>
            </p>
          )}

          {showDateTime && (
            <p className="datetime">
              <TbCalendar size={18} />
              <time dateTime={review?.datetime}>
                {review?.datetime ? new Date(review.datetime).toLocaleDateString() : ''}
              </time>
            </p>
          )}

          {showGameReview && review?.review && (
            <div className="game-review-text">
              <TbQuoteOpen size={16} className="quote-icon quote-open" />
              <p className="quote-content">{truncateReview(review.review, 100)}</p>
              <TbQuote size={16} className="quote-icon quote-close" />
            </div>
          )}

          {user && (
            <div className="user-info">
              <img
                src={user?.avatarUrl}
                alt={`${user?.username}'s profile picture`}
                className="user-pfp"
              />
              <p className="user-name">{user?.username}</p>
            </div>
          )}

          <div className="card-footer-brand">
            <span>mybackloggr.vercel.app</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;