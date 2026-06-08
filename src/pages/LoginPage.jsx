import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

function LoginPage() {
  const { login, register, user } = useApp();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return (
      <Layout showSearch={false}>
        <div className="auth-card auth-card--centered">
          <h2>Welcome, {user.username}!</h2>
          <p className="auth-hint">You are signed in.</p>
          <button type="button" className="btn-primary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let success;
    if (isRegister) {
      success = register(username, email, password);
    } else {
      success = await login(username, password);
    }
    setLoading(false);
    if (success) navigate("/");
  };

  return (
    <Layout showSearch={false}>
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>{isRegister ? "Create Account" : "Sign In"}</h2>
          <p className="auth-hint">
            {isRegister
              ? "Join us for exclusive offers"
              : "Use: johnd / mordor (demo account)"}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="johnd"
              />
            </label>
            {isRegister && (
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@email.com"
                />
              </label>
            )}
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </label>
            <button type="submit" className="btn-primary btn-primary--full" disabled={loading}>
              {loading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
            </button>
          </form>

          <button
            type="button"
            className="auth-toggle"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
