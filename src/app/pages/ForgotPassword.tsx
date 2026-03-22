import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  Crown,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Shield
} from "lucide-react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-violet-tint)] via-background to-background opacity-60" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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

      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--violet)' }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--violet)' }}
        animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- FLOATING UI ELEMENTS --- */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-[var(--violet)] transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Login</span>
      </motion.button>

      {/* --- MAIN CONTENT AREA --- */}
      {/* flex-1 makes this container grow to fill all space above the footer */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {!submitted ? (
            <div className="bg-card border-2 rounded-2xl p-8 shadow-2xl" style={{ borderColor: 'var(--border)' }}>
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--violet-glow)' }}>
                  <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <Shield className="w-12 h-12" style={{ color: 'var(--violet)' }} />
                  </motion.div>
                </div>
              </motion.div>

              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl mb-2">Forgot Password?</h1>
                <p className="text-sm text-muted-foreground">No worries, we'll send you reset instructions.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">Email address</label>
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

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--violet-glow)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                  style={{ backgroundColor: 'var(--violet)' }}
                >
                  {isLoading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Send className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <><span>Reset Password</span> <ArrowRight className="w-5 h-5" /></>
                  )}
                </motion.button>
              </form>
            </div>
          ) : (
            <div className="bg-card border-2 rounded-2xl p-8 shadow-2xl text-center" style={{ borderColor: 'var(--violet)' }}>
              <div className="relative flex justify-center mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--violet)' }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative p-4 rounded-2xl" style={{ backgroundColor: 'var(--violet)' }}>
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl mb-3">Check your email</h2>
              <p className="text-sm text-muted-foreground mb-6">We sent a reset link to <span style={{ color: 'var(--violet)' }}>{email}</span></p>
              <button onClick={() => navigate('/login')} className="w-full px-6 py-3 rounded-xl text-white font-medium shadow-lg" style={{ backgroundColor: 'var(--violet)' }}>
                Back to Login
              </button>
            </div>
          )}

          {/* Centered Brand/Security section below the card */}
          <div className="mt-8 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Your security is our priority</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Crown className="w-4 h-4" style={{ color: 'var(--violet)' }} />
              <span>Project</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* --- GLOBAL FOOTER --- */}
      <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-lg py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" style={{ color: "var(--violet)" }} />
              <span className="text-sm text-muted-foreground">© 2026 Project. Enterprise Workflow Automation.</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy</button>
              <button className="hover:text-foreground transition-colors">Terms</button>
              <button className="hover:text-foreground transition-colors">Documentation</button>
              <button className="hover:text-foreground transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}