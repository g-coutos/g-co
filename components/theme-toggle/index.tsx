'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains('dark'));
	}, []);

	const toggle = () => {
		const next = !isDark;
		setIsDark(next);
		document.documentElement.classList.toggle('dark', next);
		try {
			localStorage.setItem('theme', next ? 'dark' : 'light');
		} catch { }
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			className="border rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
		>
			{isDark ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}
