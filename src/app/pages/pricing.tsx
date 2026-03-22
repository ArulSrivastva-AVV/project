import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import {
    Crown,
    Check,
    Zap,
    ArrowLeft,
    Users,
    Building2,
    Rocket
} from "lucide-react";
import { useState } from "react";

export function Pricing() {
    const navigate = useNavigate();
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

    const plans = [
        {
            id: "starter",
            name: "Starter",
            icon: Rocket,
            description: "Perfect for small teams getting started",
            monthlyPrice: 29,
            annualPrice: 290,
            features: [
                "Up to 5 team members",
                "1,000 decisions tracked/month",
                "Slack + GitHub integration",
                "Basic decision flow visualization",
                "7-day history retention",
                "Email support"
            ],
            cta: "Start Free Trial",
            popular: false
        },
        {
            id: "team",
            name: "Team",
            icon: Users,
            description: "For growing teams that need more power",
            monthlyPrice: 99,
            annualPrice: 990,
            features: [
                "Up to 20 team members",
                "Unlimited decisions tracked",
                "Slack + GitHub + Jira integration",
                "Advanced decision flow canvas",
                "Automated post-mortems",
                "Shadow decision detection",
                "90-day history retention",
                "Priority support"
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            id: "enterprise",
            name: "Enterprise",
            icon: Building2,
            description: "For organizations with advanced needs",
            monthlyPrice: null,
            annualPrice: null,
            features: [
                "Unlimited team members",
                "Unlimited decisions tracked",
                "All integrations included",
                "Custom integrations available",
                "Advanced analytics & reporting",
                "AI-powered insights",
                "Unlimited history retention",
                "Dedicated account manager",
                "SLA & custom contracts",
                "SSO & advanced security"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* bg gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-violet-tint)] via-background to-background opacity-60" />

            {/* particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            background: 'var(--violet)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* nav */}
            <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <Crown className="w-6 h-6" style={{ color: 'var(--violet)' }} />
                    <span className="text-lg font-medium">Project</span>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-lg border-2 text-sm transition-all flex items-center gap-2"
                        style={{
                            borderColor: 'var(--violet)',
                            color: 'var(--violet)',
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </motion.button>
                    <ThemeToggle />
                </div>
            </div>

            {/* content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl mb-4">
                        Simple, <span style={{ color: 'var(--violet)' }}>Transparent</span> Pricing
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Choose the perfect plan for your team. All plans include a 1-week free trial.
                    </p>
                </motion.div>

                {/* billing toggle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 mb-12 p-2 rounded-xl bg-card border-2"
                    style={{ borderColor: 'var(--border)' }}
                >
                    <button
                        onClick={() => setBillingCycle("monthly")}
                        className="px-6 py-2 rounded-lg transition-all text-sm"
                        style={{
                            backgroundColor: billingCycle === "monthly" ? 'var(--violet)' : 'transparent',
                            color: billingCycle === "monthly" ? 'white' : 'var(--foreground)',
                        }}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle("annual")}
                        className="px-6 py-2 rounded-lg transition-all text-sm flex items-center gap-2"
                        style={{
                            backgroundColor: billingCycle === "annual" ? 'var(--violet)' : 'transparent',
                            color: billingCycle === "annual" ? 'white' : 'var(--foreground)',
                        }}
                    >
                        Annual
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white">
                            Save 17%
                        </span>
                    </button>
                </motion.div>

                {/* pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full mb-12">
                    {plans.map((plan, idx) => {
                        const Icon = plan.icon;
                        const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative p-8 rounded-2xl bg-card border-2 transition-all duration-300"
                                style={{
                                    borderColor: hoveredPlan === plan.id || plan.popular ? 'var(--violet)' : 'var(--border)',
                                    boxShadow: hoveredPlan === plan.id || plan.popular ? '0 0 40px var(--violet-glow)' : 'none',
                                }}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs text-white flex items-center gap-1"
                                        style={{ backgroundColor: 'var(--violet)' }}
                                    >
                                        <Zap className="w-3 h-3" />
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--violet-glow)' }}>
                                        <Icon className="w-6 h-6" style={{ color: 'var(--violet)' }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    {price !== null ? (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold" style={{ color: 'var(--violet)' }}>
                                                ${price}
                                            </span>
                                            <span className="text-muted-foreground">
                                                /{billingCycle === "monthly" ? "mo" : "yr"}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="text-3xl font-bold" style={{ color: 'var(--violet)' }}>
                                            Custom
                                        </div>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => plan.id === 'enterprise' ? navigate('/login') : navigate('/dashboard')}
                                    className="w-full py-3 rounded-lg text-sm font-medium mb-6 transition-all"
                                    style={{
                                        backgroundColor: plan.popular ? 'var(--violet)' : 'transparent',
                                        color: plan.popular ? 'white' : 'var(--violet)',
                                        border: plan.popular ? 'none' : '2px solid var(--violet)',
                                    }}
                                >
                                    {plan.cta}
                                </motion.button>

                                <div className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + idx * 0.1 + i * 0.05 }}
                                            className="flex items-start gap-2 text-sm"
                                        >
                                            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--violet)' }} />
                                            <span>{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* faq or guarantee section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-3xl text-center"
                >
                    <div className="p-6 rounded-2xl bg-card border-2" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Crown className="w-5 h-5" style={{ color: 'var(--violet)' }} />
                            <h3 className="text-lg font-semibold">1-Week Money-Back Guarantee</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Try Project risk-free. If you're not completely satisfied within the first week,
                            we'll refund your purchase, no questions asked.
                        </p>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
