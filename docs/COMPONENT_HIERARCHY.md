# Frontend Component Hierarchy

The frontend of the School Equipment Lending Portal is built with React and structured into reusable, modular components.

## Application Root
```
App (Router Provider & Context Providers)
 ├── AuthProvider (Manages global user session)
 ├── QueryClientProvider (Manages server-state caching)
 └── AppRouter (Handles Route Navigation)
```

## Route Structure & Layouts
```
AppRouter
 ├── Route: "/" 
 │   └── Landing (Public marketing page)
 │       ├── Navbar (Public version)
 │       └── AnimatedBackground (Global cinematic background)
 │
 ├── Route: "/login" 
 │   └── Login (Auth form)
 │       └── GlassCard (Reusable UI wrapper)
 │
 ├── Route: "/signup" 
 │   └── Signup (Auth form)
 │       └── GlassCard (Reusable UI wrapper)
 │
 └── Route: "/dashboard" (Protected Route)
     └── DashboardLayout (Main wrapper for authenticated users)
         ├── Navbar (Authenticated version with user profile)
         └── Outlet (Renders sub-routes based on navigation)
             │
             ├── Route: "" (Default)
             │   └── Dashboard (Equipment Catalog)
             │       ├── GreetingCard (Displays personalized greeting)
             │       └── EquipmentList (Grid of available items)
             │           └── EquipmentItem (Individual item card with 'Request' button)
             │
             ├── Route: "requests"
             │   └── Requests (Lending requests view)
             │       ├── StudentView (Shows user's personal requests)
             │       └── StaffView (Shows all system requests with Approve/Reject actions)
             │
             ├── Route: "profile"
             │   └── Profile (User settings)
             │       └── ProfileEditForm (Form to update display name and bio)
             │
             └── Route: "admin" (Protected: Staff/Admin only)
                 └── Admin (Inventory Management)
                     ├── InventoryTable (List of all equipment)
                     └── AddEquipmentForm (Form to add new items to the DB)
```

## Reusable UI Components
These components are heavily styled using Tailwind CSS and Framer Motion to achieve the "Dream Edition" glassmorphic aesthetic.
- `<GlassCard>`: A foundational wrapper component applying `backdrop-blur`, semi-transparent backgrounds, and glowing borders.
- `<AnimatedBackground>`: A global component rendering the floating abstract shapes and gradients in the background.
- `<Navbar>`: Context-aware navigation bar that changes its links based on the user's current authentication state and role.
