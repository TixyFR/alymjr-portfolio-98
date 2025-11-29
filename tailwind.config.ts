import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					magenta: 'hsl(var(--neon-magenta))',
					purple: 'hsl(var(--neon-purple))',
					blue: 'hsl(var(--neon-blue))'
				}
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'neon': 'var(--shadow-neon)',
				'glow-cyan': 'var(--glow-cyan)',
				'glow-magenta': 'var(--glow-magenta)'
			},
			transitionTimingFunction: {
				'dramatic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float-dramatic': {
					'0%, 100%': {
						transform: 'translateY(0) rotate(0deg)'
					},
					'25%': {
						transform: 'translateY(-30px) rotate(5deg)'
					},
					'50%': {
						transform: 'translateY(-50px) rotate(-5deg)'
					},
					'75%': {
						transform: 'translateY(-30px) rotate(5deg)'
					}
				},
				'pulse-neon': {
					'0%, 100%': {
						opacity: '1',
						filter: 'drop-shadow(0 0 5px currentColor)'
					},
					'50%': {
						opacity: '0.8',
						filter: 'drop-shadow(0 0 20px currentColor)'
					}
				},
				'slide-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(100px) scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-dramatic': 'float-dramatic 6s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'slide-in-up': 'slide-in-up 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
