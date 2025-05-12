 
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./src/components/ErrorBoundary";
import Header from "./src/components/Header";
import Sidebar from "./src/components/Sidebar";
import Dashboard from "./src/pages/Dashboard";
import News from "./src/pages/News";
import SignUp from "./src/pages/SignUp";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <Header />
        {/* Sidebar */}
        <div className="base">
           <Sidebar />
        {/* Main content */}
        <main className="app-main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/news" element={<News />} />
              {/* <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/top-users-1" element={<TopUsers1 />} />
              <Route path="/top-users-2" element={<TopUsers2 />} />
              <Route path="/album-value-1" element={<AlbumValue1 />} />
              <Route path="/album-value-2" element={<AlbumValue2 />} />
              <Route path="/rating-1" element={<Rating1 />} />
              <Route path="/rating-2" element={<Rating2 />} />
              <Route path="/rzt-award-1" element={<RZTAward1 />} />
              <Route path="/rzt-award-2" element={<RZTAward2 />} />
              <Route path="/freshmen-1" element={<Freshmen1 />} />
              <Route path="/freshmen-2" element={<Freshmen2 />} />
              <Route path="/playlists-1" element={<Playlists1 />} />
              <Route path="/playlists-2" element={<Playlists2 />} />
              <Route path="/author-likes-1" element={<AuthorLikes1 />} />
              <Route path="/author-likes-2" element={<AuthorLikes2 />} />
              <Route path="/author-comments-1" element={<AuthorComments1 />} />
              <Route path="/author-comments-2" element={<AuthorComments2 />} />
              <Route path="/registered-authors-1" element={<RegisteredAuthors1 />} />
              <Route path="/registered-authors-2" element={<RegisteredAuthors2 />} />
              <Route path="/authors-1" element={<Authors1 />} />
              <Route path="/authors-2" element={<Authors2 />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/releases-1" element={<Releases1 />} />
              <Route path="/releases-2" element={<Releases2 />} /> */}
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </ErrorBoundary>
        </main>
       </div>
      </div>
    </Router>
  );
}

export default App;
 