import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  Crown,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to dashboard
    navigate("/dashboard");
  };

  const features = [
    "Unlimited decision tracking",
    "AI-powered insights",
    "Team collaboration",
    "Advanced analytics"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-violet-tint)] via-background to-background opacity-60" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'var(--violet)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--violet)' }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--violet)' }}
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Back to home */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-[var(--violet)] transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Crown className="w-5 h-5" style={{ color: 'var(--violet)' }} />
        <span className="text-sm">Project</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-10 h-10" style={{ color: 'var(--violet)' }} />
            </motion.div>
            <h1 className="text-5xl" style={{ fontFamily: 'SF Pro Rounded, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Project
            </h1>
          </div>

          <h2 className="text-3xl md:text-4xl mb-4">
            Welcome to the future of <span style={{ color: 'var(--violet)' }}>decision intelli</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Connect your company's tools and unlock autonomous decision based architecture documentation.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--violet-glow)' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--violet)' }} />
                </div>
                <span className="text-base">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Decorative element */}
          <motion.div
            className="mt-12 p-6 rounded-xl border-2 bg-card/50 backdrop-blur"
            style={{ borderColor: 'var(--violet)' }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: 'var(--violet)' }}
                  >
                    <span className="text-white">{i}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-medium">Join 100+ companies</div>
                <div className="text-xs text-muted-foreground">Already tracking yoour decisions</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-card border-2 rounded-2xl p-8 shadow-2xl"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Toggle Login/Signup */}
            <div className="flex gap-2 mb-8 p-1 bg-muted rounded-xl">
              <button
                onClick={() => setIsLogin(true)}
                className="flex-1 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                style={{
                  backgroundColor: isLogin ? 'var(--violet)' : 'transparent',
                  color: isLogin ? 'white' : 'var(--foreground)'
                }}
              >
                Log In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                style={{
                  backgroundColor: !isLogin ? 'var(--violet)' : 'transparent',
                  color: !isLogin ? 'white' : 'var(--foreground)'
                }}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-2xl mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isLogin
                ? "Enter your credentials to access your workspace"
                : "Start your free sprint today"}
            </p>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-border hover:border-[var(--violet)] transition-all"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-border hover:border-[var(--violet)] transition-all"
              >
                <Chrome className="w-5 h-5" />
                <span className="text-sm">Google</span>
              </motion.button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address
                </label>
                <motion.div
                  animate={{
                    borderColor: focusedField === 'email' ? 'var(--violet)' : 'var(--border)',
                    boxShadow: focusedField === 'email' ? '0 0 0 3px var(--violet-glow)' : 'none'
                  }}
                  className="relative rounded-xl border-2 transition-all"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-transparent outline-none"
                    required
                  />
                </motion.div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  Password
                </label>
                <motion.div
                  animate={{
                    borderColor: focusedField === 'password' ? 'var(--violet)' : 'var(--border)',
                    boxShadow: focusedField === 'password' ? '0 0 0 3px var(--violet-glow)' : 'none'
                  }}
                  className="relative rounded-xl border-2 transition-all"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-transparent outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </motion.div>
              </div>

              {/* Remember me / Forgot password */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-border accent-[var(--violet)]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="hover:underline"
                    style={{ color: 'var(--violet)' }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--violet-glow)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                style={{ backgroundColor: 'var(--violet)' }}
              >
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="font-medium hover:underline"
                    style={{ color: 'var(--violet)' }}
                  >
                    Sign up for free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="font-medium hover:underline"
                    style={{ color: 'var(--violet)' }}
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-xs text-muted-foreground"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>You Data is secure</span>
              </div>
              <span>•</span>
              <span>Enterprise Grade</span>
              <span>•</span>
              <span>Free trial</span>
              <span>•</span>
              <span>Contact for further assistance</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}