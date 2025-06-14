import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Feed, Login, Header } from "./components";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/" element={<Navigate to="/feed" replace />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
