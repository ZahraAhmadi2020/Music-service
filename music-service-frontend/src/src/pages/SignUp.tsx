 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./SignUp.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Client-side validation
  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Пожалуйста, введите имя (минимум 2 символа)";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Пожалуйста, введите действительный адрес электронной почты";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
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
        "jdbc:postgresql://localhost:5432/*****", // Replace with your backend API endpoint
        formData
      );
      setSuccess(response.data.message || "Регистрация прошла успешно!");
      setErrors({});
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Произошла ошибка при регистрации";
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
    <div className="signup-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="signup-form"
      >
        <h1 className="signup-title">Регистрация</h1>
        <form onSubmit={handleSubmit}>
          {/* General error */}
          <AnimatePresence>
            {errors.general && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="signup-error signup-error-general"
              >
                {errors.general}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Name */}
          <div className="signup-field">
            <label htmlFor="name" className="signup-label">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`signup-input ${errors.name ? "error" : ""}`}
              placeholder="Введите ваше имя"
              disabled={isLoading}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="signup-error"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div className="signup-field">
            <label htmlFor="email" className="signup-label">
              Почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`signup-input ${errors.email ? "error" : ""}`}
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
                  className="signup-error"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div className="signup-field">
            <label htmlFor="password" className="signup-label">
              Пароль
            </label>
            <div className="signup-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`signup-input ${errors.password ? "error" : ""}`}
                placeholder="Введите пароль"
                disabled={isLoading}
              />
              <button
                type="button"
                className="signup-eye"
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
                  className="signup-error"
                >
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Confirm Password */}
          <div className="signup-field">
            <label htmlFor="confirmPassword" className="signup-label">
              Подтверждение пароля
            </label>
            <div className="signup-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`signup-input ${errors.confirmPassword ? "error" : ""}`}
                placeholder="Повторите пароль"
                disabled={isLoading}
              />
              <button
                type="button"
                className="signup-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="signup-error"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="signup-button"
            whileHover={{ scale: isLoading ? 1 : 1.05, boxShadow: isLoading ? "none" : "0 0 15px rgba(75, 0, 130, 0.7)" }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </motion.button>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="signup-success"
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}

export default SignUp;
 