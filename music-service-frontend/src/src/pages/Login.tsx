import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom"; // برای لینک به ثبت‌نام
import axios from "axios";
import "./Login.css";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Client-side validation
  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Пожалуйста, введите действительный адрес электронной почты";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(null);
      return;
    }

    setIsLoading(true);
    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:8080/api/login", // Replace with your backend API endpoint
        formData
      );
      setSuccess(response.data.message || "Вход выполнен успешно!");
      setErrors({});
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Произошла ошибка при входе";
      if (errorMessage.includes("email")) {
        setErrors({ email: errorMessage });
      } else if (errorMessage.includes("password")) {
        setErrors({ password: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof Errors] || errors.general) {
      setErrors({ ...errors, [e.target.name]: undefined, general: undefined });
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="login-form"
      >
        <h1 className="login-title">Вход</h1>
        <form onSubmit={handleSubmit}>
          {/* General error */}
          <AnimatePresence>
            {errors.general && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="login-error login-error-general"
              >
                {errors.general}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`login-input ${errors.email ? "error" : ""}`}
              placeholder="Введите ваш email"
              disabled={isLoading}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="login-error"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Пароль
            </label>
            <div className="login-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`login-input ${errors.password ? "error" : ""}`}
                placeholder="Введите пароль"
                disabled={isLoading}
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="login-error"
                >
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: isLoading ? 1 : 1.05, boxShadow: isLoading ? "none" : "0 0 15px rgba(75, 0, 130, 0.7)" }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </motion.button>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="login-success"
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>

          {/* لینک به ثبت‌نام */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="login-signup-link"
          >
            <p className="text-center text-gray-300 text-sm">
              Нет аккаунта?{" "}
              <Link to="/signup" className="login-signup-text">
                Зарегистрируйтесь
              </Link>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;