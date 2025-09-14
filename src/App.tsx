import PeopleList from './components/people-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export default function App() {
    return (
        <Router>
            {/* <div>
                <img src='header-image.jpg' alt='Stargate Command' style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
            </div> */}
            <div className="container-fluid" style={{ marginTop: 40 }}>
                <div className="row">
                    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3 min-vh-100">
                        <h4 className="mb-4">Navigation</h4>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/personnel" className="nav-link">Personnel List</Link>
                            </li>
                        </ul>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Routes>
                            <Route path="/personnel" element={<PeopleList />} />
                            <Route path="/" element={<div>Welcome! Click 'Personnel List' to view people.</div>} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}