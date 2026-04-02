Flow is a mobile-first personal finance companion app designed to help users track their spending, understand financial habits, and improve money management through a clean and intuitive interface.

This project focuses on product thinking, UI/UX clarity, and structured mobile development, rather than just feature implementation.
Features Implemented
Home Dashboard
Personalized greeting
Horizontal infinite carousel showing:
Total Balance
Income
Expenses
Smooth snap-based scrolling with looped experience
Recent Transactions Preview
Displays top 5 latest transactions
Compact, clean UI
Clickable card → navigates to full transaction screen
Floating Action Button (FAB) for quick transaction entry
Add Transaction Screen
Large, focused amount input with ₹ symbol
Transaction type toggle
Income / Expense (button-based, no manual input errors)
Category input field
Input validation (prevents empty submissions)
Custom styled buttons (Save / Cancel)
Clean, modern UI consistent with dashboard Navigation Architecture
Stack + Tab Navigation (Industry Standard)
Tabs:
Home
Insights
Stack Screens:
Add Transaction
Transactions

Ensures smooth flow:

Home → Add Transaction → Back → Home
Home → Transactions → Back → Home
 Key Engineering Concepts Used
Custom infinite carousel (circular buffer technique)
Snap physics using snapToInterval
React Hooks (useState, useEffect, useRef)
Clean component structure and separation
Touchable interactions for better UX
Form handling and validation
Navigation flow design (Stack + Tabs)
Product Thinking Highlights
Dashboard-first approach for quick insights
Reduced navigation friction (transactions preview inside home)
Error-proof input design (toggle instead of text input)
Focus on clarity over complexity
Designed for everyday usability Tech Stack
React Native (Expo)
TypeScript
React Navigation (Stack + Bottom Tabs)
React Native Paper (UI components)
AsyncStorage (planned for persistence)
Upcoming Features
Persistent data using AsyncStorage
Full Transactions Screen with complete history
Insights Screen (charts and spending analytics)
Filtering transactions by category
Spend limit + smart alerts
User onboarding (salary, savings goals)
Installation & Setup
# Install dependencies
npm install

# Start the app
npx expo start

Run on:

Android Emulator / Device
iOS Simulator (if available)
📌 Project Status

🚧 In Active Development

Core UI and navigation are complete.
Next phase focuses on data handling and real-time updates.

👨‍💻 Developer Notes

This project emphasizes:

Clean UI/UX design
Scalable architecture
Real-world mobile development practices

The goal is to build a practical, user-friendly finance companion, not just a feature-heavy application.

📄 License

This project is for evaluation and learning purposes.
