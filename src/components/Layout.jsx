import { Outlet, Link } from 'react-router-dom';
import { TbBrandGithub, TbDeviceGamepad2 } from 'react-icons/tb';
import '../styles/global.css';

function Layout() {
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="brand">
                        <TbDeviceGamepad2 size={24} className="brand-icon" />
                        <span>Backlogg<span className="brand-accent">R</span></span>
                    </Link>

                    <nav className="nav-links">
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
            </main>
        </>
    );
}

export default Layout;