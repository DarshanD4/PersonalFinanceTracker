FlowMoney 
Its A High-Performance, Professional Finance Companion for React Native.
FlowMoney is a premium mobile application designed to solve the "friction" of daily expense tracking. By combining Reanimated v2 physics, Contextual State Management, and Data Visualization, it transforms raw numbers into actionable financial insights.
Project Links
Video Demo: Watch the DEMO ON MY Phone 
LINK ---  https://drive.google.com/file/d/1MO1gBZDc_1FvPEaRIuyEHIpJuwypH2PB/view?usp=sharing 
Source Code: 

Development Roadmap (Evolution of FlowMoney)
Phase 1: Foundation & Wire-Flow Setup
Architecture: Established a Clean Architecture using TypeScript and React Navigation.
Navigation: Designed a "Mobile-First" flow: Home → Add Transaction with minimum friction.
State: Built the FinanceContext using the Provider Pattern to manage a single source of truth across all screens.

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
