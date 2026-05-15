# YouTube Traffic Funnel & Educational Platform

This document outlines the implementation plan for the YouTube-first educational web platform. The primary goal is to drive YouTube subscriptions, watch time, and daily returning users through a highly engaging, mobile-first web experience.

> [!IMPORTANT]
> **User Review Required**
> Please review the proposed architecture and feature list. Since you have requested a complex web app, we will use **Next.js** as the framework. As per guidelines, we will use **Vanilla CSS** for styling (no Tailwind CSS). Let me know if you approve this plan or if you would prefer a different framework/setup!

## Open Questions

> [!WARNING]
> 1. Do you have a specific YouTube channel URL/ID we should use for the links and embedded videos?
> 2. For the mock exam/questions, do you have specific subjects/questions we should start with, or should I create sample dummy data?
> 3. Should the "Daily Return System" (streaks, badges) be saved locally on the user's browser, or do you plan to have a backend database (like Supabase) to track users? For this initial version, local browser storage is the fastest way to demonstrate the concept.

## Proposed Architecture

- **Framework**: Next.js (React)
- **Styling**: Vanilla CSS (CSS Modules for component-level styling) to ensure maximum flexibility, rich aesthetics, and performance.
- **Animations**: CSS Keyframes and transitions for smooth, modern micro-animations (glassmorphism, hover effects).
- **State Management**: React Context & LocalStorage (for tracking daily streaks, quiz progress, and subscribe triggers).

---

## Proposed Changes & Features

### 1. Project Initialization
- Create a new Next.js project in `d:\GK LEARNING`.
- Set up the global CSS with a premium, vibrant color palette (dark mode by default for a modern sleek look) and custom fonts (e.g., Inter or Outfit).

### 2. Smart Subscribe Flow
- `SubscribeModal`: Animated popup that appears at strategic moments (not annoying).
- `StickySubscribeBar`: Mobile-only sticky bottom bar encouraging subscription.
- `SubscribeTriggers`: Logic to trigger CTAs after completing an exam, answering a question, or hitting a daily streak.

### 3. Video Unlock System
- `QuizInterface`: Clean, interactive MCQ interface.
- `UnlockExplanation`: After answering, shows a smooth transition revealing a YouTube video preview, a "Watch Full Explanation" button, and a Subscribe CTA.

### 4. Daily Return System
- `StreakTracker`: Visual representation of daily logins (fire icon, days counter).
- `DailyChallenge`: A featured "Hardest Question of the Day" on the homepage.
- `RewardsSystem`: Unlockable rank badges based on streaks and questions answered.

### 5. YouTube Growth Features
- `TrendingLessons`: Grid of YouTube-style video cards.
- `EmbeddedPlayer`: Custom-styled wrappers for YouTube embeds to make them look native to the site.
- `ChannelBranding`: Channel banner, subscriber count milestone animation, and "Join 10,000+ Students" social proof section.

### 6. Viral Share System
- `ResultCard`: A visually stunning summary of the user's quiz performance.
- `ShareButtons`: One-click share to WhatsApp, Facebook, and native mobile sharing.

## Verification Plan

### Automated/Local Testing
- Run `npm run dev` to verify the Next.js app builds and loads correctly.
- Test responsive layout using browser developer tools to ensure the mobile-first strategy is effective.

### Manual Verification
- Test the "Smart Subscribe Flow" to ensure popups trigger at the correct times and animations are smooth.
- Complete a mock quiz to verify the "Video Unlock System" logic.
- Test daily streak increments using local storage manipulation.
- Verify that all buttons correctly link to YouTube or trigger the sharing mechanisms.
