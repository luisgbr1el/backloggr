import { Outlet, Link } from 'react-router-dom';
import { TbBrandGithub, TbDeviceGamepad2, TbWorld } from 'react-icons/tb';
import { Analytics } from "@vercel/analytics/react";
import { useTranslation } from 'react-i18next';
import '../styles/global.css';

function Layout() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    const currentLang = i18n.language ? i18n.language.split('-')[0] : 'en';
    const activeLang = ['en', 'pt', 'es'].includes(currentLang) ? currentLang : 'en';

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="brand">
                        <TbDeviceGamepad2 size={24} className="brand-icon" />
                        <span>Backlogg<span className="brand-accent">R</span></span>
                    </Link>

                    <nav className="nav-links">
                        <div className="lang-select-wrapper">
                            <TbWorld size={18} className="lang-icon" />
                            <select
                                className="lang-select"
                                value={activeLang}
                                onChange={handleLanguageChange}
                                aria-label="Select language"
                            >
                                <option value="en">EN</option>
                                <option value="pt">PT</option>
                                <option value="es">ES</option>
                            </select>
                        </div>

                        <a
                            href="https://github.com/luisgbr1el/backloggr"
                            className="nav-item"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TbBrandGithub size={20} />
                            <span>GitHub</span>
                        </a>
                    </nav>
                </div>
            </header>

            <main>
                <Outlet />
                <Analytics />
            </main>
        </>
    );
}

export default Layout;