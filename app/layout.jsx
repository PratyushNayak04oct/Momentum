// app/layout.jsx
import { Inter } from 'next/font/google';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import './globals.css'; // Your global styles

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Momentum - Productivity App',
  description: 'A comprehensive productivity app with tasks, habits, mood tracking, and more',
  keywords: 'productivity, tasks, habits, mood, pomodoro, calendar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className = {inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}