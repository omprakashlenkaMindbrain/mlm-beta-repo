import { ArrowRight, Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../assets/bmpl.jpg";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

  const PRIMARY_COLOR = "#004aad";
  const SECONDARY_COLOR = "#fdbb2d";
  const BG_LIGHT = "#f0f4f8";

  const { login, isLoggedIn, loading, error } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    mobno: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobno || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in both phone number and password.",
        confirmButtonColor: PRIMARY_COLOR,
      });
      return;
    }

    if (!/^\d{10}$/.test(formData.mobno)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
        confirmButtonColor: PRIMARY_COLOR,
      });
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Something went wrong. Please try again.",
        confirmButtonColor: PRIMARY_COLOR,
      });
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm outline-none placeholder-gray-400 bg-transparent";

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden" 
      style={{ backgroundColor: BG_LIGHT }}
    >
      <div className="absolute inset-0 -z-10 animate-gradient-bg"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-md overflow-hidden border-2"
              style={{ borderColor: PRIMARY_COLOR }} 
            >
              <img
                src={Logo}
                alt="BM2 Mall Logo"
                className="w-full h-full object-cover"
              />
            </Link>
            <h1 className="text-3xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">Sign in to continue to BMPL Mall</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div 
              className="flex items-center gap-2 border-b border-gray-300 relative"
              style={{
                  borderBottomColor: 'rgb(209, 213, 219)',
                  boxShadow: `0 1px 0 0 transparent`,
              }}
              onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = PRIMARY_COLOR;
                  e.currentTarget.style.boxShadow = `0 1px 0 0 ${PRIMARY_COLOR}`;
              }}
              onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = `0 1px 0 0 transparent`;
              }}
            >
              <Phone size={18} className="text-gray-400" />
              <input
                type="tel"
                name="mobno"
                placeholder="Phone Number"
                value={formData.mobno}
                onChange={handleChange}
                maxLength="10"
                className={inputClass}
              />
            </div>

            <div 
              className="flex items-center gap-2 border-b border-gray-300 relative"
              style={{
                  borderBottomColor: 'rgb(209, 213, 219)',
                  boxShadow: `0 1px 0 0 transparent`,
              }}
              onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = PRIMARY_COLOR;
                  e.currentTarget.style.boxShadow = `0 1px 0 0 ${PRIMARY_COLOR}`;
              }}
              onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = `0 1px 0 0 transparent`;
              }}
            >
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 text-sm outline-none placeholder-gray-400 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-gray-600 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-gray-300"
                  style={{ accentColor: PRIMARY_COLOR }}
                />
                Remember me
              </label>
              <a href="#" className="hover:underline font-medium" style={{ color: PRIMARY_COLOR }}>
                Forgot password?
              </a>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center text-black py-3 rounded-lg font-bold mt-4 transition-all duration-300 hover:text-white hover:shadow-lg"
              style={{ 
                backgroundColor: SECONDARY_COLOR,
                boxShadow: `0 4px 6px -1px rgba(0, 74, 173, 0.1), 0 2px 4px -2px rgba(0, 74, 173, 0.06)`,
                cursor:"pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = SECONDARY_COLOR;
                e.currentTarget.style.color = 'black';
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="hover:underline font-medium"
              style={{ color: PRIMARY_COLOR }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientBG {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .animate-gradient-bg {
          background: linear-gradient(270deg, ${BG_LIGHT}, #dce6fb, ${BG_LIGHT});
          background-size: 600% 600%;
          animation: gradientBG 15s ease infinite;
          position: absolute;
          inset: 0;
          z-index: -1;
        }
      `}</style>
    </div>
  );
}