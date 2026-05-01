# React Component Hierarchy

The frontend application (`@studysync/frontend`) follows a modular component structure, separating layout, routing, standard UI primitives, and page-specific views.

## Component Tree

```mermaid
graph TD
    App[App.tsx] --> Router[React Router]
    
    Router --> Layout[RootLayout]
    Router --> AuthLayout[AuthLayout]
    
    Layout --> Nav[Navigation / Sidebar]
    Layout --> BG[AnimatedBackground "Dream Edition"]
    Layout --> MainContent[Main Outlet]
    
    MainContent --> Landing[Landing Page]
    MainContent --> Dashboard[Dashboard Page]
    MainContent --> Profile[Profile Page]
    MainContent --> Admin[Admin Analytics]
    
    AuthLayout --> Login[Login Page]
    AuthLayout --> Signup[Signup Page]
    
    %% UI Primitives
    Dashboard --> GlassCard1[GlassCard]
    Dashboard --> GlassCard2[GlassCard]
    Dashboard --> Button1[Button]
    
    Landing --> GlassCard3[GlassCard]
    Landing --> Button2[Button]
    
    %% Hooks
    Dashboard -.-> useProfile(useProfile Hook)
    Dashboard -.-> useFeed(useFeed Hook)
    Dashboard -.-> useBookings(useBookings Hook)
    
    style App fill:#f9f,stroke:#333
    style Layout fill:#bbf,stroke:#333
    style MainContent fill:#dfd,stroke:#333
```

## Core Primitives (Dream Edition)

The visual overhaul introduced highly stylized primitives in `src/components/ui/`:

- **`AnimatedBackground.tsx`**: Renders GSAP/Framer Motion driven auroras and a static SVG film grain overlay. Provides the "cinematic" depth to all pages.
- **`GlassCard.tsx`**: A highly reusable container utilizing Tailwind's `backdrop-blur`, custom bronze borders, and hover-state opacity gradients. Used extensively on the Dashboard and Landing pages.
- **`Button.tsx`**: Follows an editorial aesthetic with wide tracking (`tracking-widest`), uppercase text, and champagne/charcoal color inversions on hover.
- **`Skeleton.tsx`**: Provides pulse-animated loading states to prevent layout shifts while React Query resolves API requests.
