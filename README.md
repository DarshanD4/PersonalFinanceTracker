FlowMoney is a premium mobile application designed to eliminate the friction of daily expense tracking.
It combines smooth UI physics, structured state management, and meaningful data visualization to transform raw financial data into actionable insights.

---

## Demo and Source

Video Demo:
https://drive.google.com/file/d/1MO1gBZDc_1FvPEaRIuyEHIpJuwypH2PB/view?usp=sharing

Source Code:
https://github.com/DarshanD4/PersonalFinanceTracker.git

---

## Core Philosophy

“Tracking money should feel effortless, not like a chore.”

FlowMoney focuses on:

* Speed with minimal input friction
* Clarity through insight-driven UI
* Consistency through habit-oriented design

---

## Tech Stack

* React Native (Expo)
* TypeScript
* React Navigation (Stack, Tabs, Drawer)
* Context API (State Management)
* AsyncStorage (Persistence)
* Reanimated v2 (Animations and Gestures)

---

## Development Roadmap

### Phase 1: Foundation and Architecture

* Designed a clean architecture using TypeScript
* Implemented React Navigation flow: Home → Add Transaction → Insights
* Built FinanceContext using the Provider Pattern
* Established a single source of truth for financial data

---

### Phase 2: Navigation and Persistence

* Implemented a custom drawer for settings and goal tracking
* Integrated AsyncStorage with hydration logic
* Built onboarding gatekeeper system for first-time users

  * Captures name, salary, and savings goal

---

### Phase 3: Insights and Performance Engineering

* Built a custom data grouping engine for financial analytics
* Implemented bar charts for category-based spending
* Implemented donut charts for percentage breakdown
* Solved Y-axis scaling using dynamic normalization
* Built swipe-based gesture system for transaction actions
* Maintained smooth performance using UI-thread animations

---

## App Workflow

### Onboarding

User enters name, monthly salary, and savings goal

### Dashboard

Displays total balance, income and expense carousel, and recent transactions

### Add or Edit Transactions

Quick entry system with minimal interaction and instant updates

### Insights

Displays category-based spending and percentage breakdown of expenses

### Drawer

Allows goal adjustments and tracks user consistency

---

## Engineering Highlights

### Gesture Engine

* Bi-directional swipe actions for transactions
* Swipe right for edit
* Swipe left for delete
* Implemented using Reanimated for smooth performance

---

### Dynamic Axis Normalization

* Detects maximum grouped value
* Rounds to nearest logical unit (e.g., 5000)
* Formats labels into readable units such as ₹5k, ₹10k

---

## Project Structure

```
src
├── context
├── components
├── screens
│   ├── OnboardingScreen.tsx
│   ├── InsightsScreen.tsx
│   ├── TransactionsScreen.tsx
│   └── AddTransactionScreen.tsx
└── types
```

---

## Installation and Setup

```bash
git clone https://github.com/DarshanD4/PersonalFinanceTracker.git
cd PersonalFinanceTracker
npm install
npx expo start
```

---

## Future Enhancements

* AI-based spending predictions
* Advanced analytics dashboard
* Gamified savings system
* Cloud sync support

---

## Author

Darshan
Focused on building high-performance, real-world mobile applications

Phase 2: Navigation Deep-Dive & Drawer Integration
Drawer Navigator: Implemented a custom side-drawer for deep-level settings and high-level goal tracking.
Persistence: Integrated AsyncStorage with a hydration hook to ensure user data, theme preferences, and goals survive app restarts.
Onboarding: Developed the "Gatekeeper" logic to prevent the "Cold Start" problem, forcing a setup for new users (Name, Salary, Savings Goal).

Phase 3: Insights & Gesture Engineering (Final Polish)
Data Visualization: Built a custom grouping engine for Bar Charts and Donut Charts. Solved the Y-Axis decimal scaling issue using a dynamic normalization algorithm.
Gesture Physics: Replaced standard lists with Reanimated v2 Swipeable rows. Implemented a useRef<Map> strategy for 60fps performance on Edit/Delete actions.
Calendar Sync: Integrated a dark-mode optimized activity calendar to track daily engagement.

App Workflow (User Journey)
To ensure a seamless experience, the app follows a strictly logical flow:
Onboarding (First Launch): User enters their name, monthly salary (initial income), and savings goal.
Dashboard (The Hub): View real-time balance, scroll through the "Income/Expense/Balance" carousel, and see recent activity.
Add/Edit (Quick Action): A polymorphic form allows for instant entry or modification of expenses.
Insights (Analytics): Grouped bar charts show "Total Spending per Category" while the Donut chart shows percentage breakdown.
Drawer (Management): Adjust the monthly savings goal on the fly and track consistency via the Activity Calendar.

Engineering "Show-Off" Features

1. The "60fps" Gesture Engine
Implemented Bi-Directional Swipes in the transaction history:
Swipe Right (Indigo): Instant Edit workflow.
Swipe Left (Red): Destructive Delete.
Tech: Offloaded all animation logic to the Native UI Thread using Reanimated, ensuring zero lag during list scrolling.

2. Dynamic Axis Normalization
To avoid irregular decimals in financial charts (e.g., ₹3.75k), I built an algorithm that:
Finds the maximum grouped value.
Rounds the Y-Axis ceiling to the nearest 5,000 unit.
Formats labels into clean "k" units (₹5k, ₹10k, ₹15k).

File Structure
Plaintext
├── src
│   ├── context      # State Management (FinanceContext.tsx)
│   ├── components   # CustomDrawer.tsx, CustomButtons
│   ├── screens
│   │   ├── OnboardingScreen.tsx # User initialization
│   │   ├── InsightsScreen.tsx   # Grouped Data Charts
│   │   ├── TransactionsScreen.tsx # Performance List (Swipeable)
│   │   └── AddTransactionScreen.tsx # Polymorphic CRUD Form
│   └── types        # Navigation & Data Type Safety

Installation & Setup

Clone the repo: git clone <>
Install dependencies: npm install
Run: npx expo start

👨‍💻 Final Developer Notes
This project is more than a tracker—it's a study in Product Thinking. Every choice, from the "Income" auto-injection during onboarding to the "Bi-directional swipes," was made to reduce user cognitive load and maximize app retentio
