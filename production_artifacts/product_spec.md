# StudySync Campus - Product Specification

## 1. Complete Product Vision
**StudySync Campus** is a cinematic, AI-enhanced collaboration platform designed to redefine the way students connect, learn, and manage their academic lives. By bridging the gap between social interaction and focused productivity, StudySync Campus provides an immersive, futuristic digital environment. Drawing inspiration from modern art and high-end consumer technology interfaces, the platform features a premium dark UI with dreamy gradients, glassmorphism, and ambient lighting to keep students engaged and inspired without feeling overwhelmed by generic academic dashboards. 

## 2. User Personas
* **The Organizer (Emily, 21):** A high-achieving student who coordinates study sessions, books rooms, and manages shared resources. She values efficiency, clear scheduling, and structured group communication.
* **The Collaborator (Marcus, 20):** A visual learner who relies heavily on peer interaction. He frequently joins study groups, shares notes, and participates in active discussions.
* **The Focused Scholar (Sarah, 22):** A final-year student who occasionally joins deep-work sessions but relies primarily on the AI-assisted smart reminders and isolated ambient study environments within the app.

## 3. User Roles
* **Student (Standard User):** Can join/create groups, schedule sessions, share materials, and utilize AI tools.
* **Group Admin:** Creator of a study group; can manage members, pin resources, and set group rules.
* **Campus Moderator (Admin):** Can manage campus-wide resources (e.g., room bookings), moderate content, and oversee the platform's health.
* **System Administrator:** Superuser with access to analytics, microservices health, and system configuration.

## 4. Features List
* **Study Group Hub:** Cinematic portals for individual study groups with customizable abstract artistic backgrounds.
* **Smart Scheduling Engine:** AI-driven scheduling that finds common free time among group members.
* **Resource Booking:** Integration with campus facilities for seamless study room reservations.
* **Shared Material Vault:** Real-time collaborative document and file sharing with version control.
* **AI Smart Reminders:** Context-aware notifications for upcoming deadlines and suggested study breaks.
* **Social Collaboration:** Real-time chat, video rooms, and ambient study streams (e.g., Lofi integration).
* **Focus Mode:** Immersive, distraction-free UI states with ambient lighting effects.

## 5. User Journeys
* **Onboarding:** User logs in via university SSO (JWT), selects aesthetic preferences (ambient lighting colors), and connects their academic calendar.
* **Creating a Session:** User taps the floating action button, selects 'New Session', AI suggests optimal times based on member availability, user confirms, and a visually stunning glassmorphic invitation card is sent to the group.
* **Collaborative Study:** User enters the 'Study Hub'. The UI transitions into a cinematic focus mode. Documents float in layered components, and active participants are displayed via subtle glowing avatars.

## 6. Information Architecture
* `/dashboard` - Personalized ambient home screen with upcoming sessions and smart reminders.
* `/groups` - Grid of study groups, represented by dynamic, generative gradient cards.
  * `/groups/:id` - Immersive view of a specific group's activity, chat, and vault.
* `/schedule` - Infinite-scroll calendar view with glowing event markers.
* `/resources` - Facility and room booking interface.
* `/settings` - Profile, preferences, and UI theme adjustments.

## 7. Technical Architecture
The platform utilizes a **Microservice Architecture** running on Docker/Kubernetes.
* **Frontend:** React.js (Vite) for high-performance cinematic rendering.
* **API Gateway:** Node.js/Express acting as the entry point and handling rate limiting.
* **Microservices:** Node.js/Express backend services communicating via REST APIs and RabbitMQ/Kafka for asynchronous events.
* **Database:** PostgreSQL for relational data (users, groups, bookings), Redis for caching and session management.
* **Authentication:** JWT-based stateless authentication passed securely via HTTP-only cookies.

## 8. Microservice Breakdown
* **Auth Service:** Handles registration, login, token generation, and SSO integration.
* **User Service:** Manages profiles, preferences, and connections.
* **Group Service:** Handles study group creation, membership, and metadata.
* **Scheduling Service:** Manages calendars, time-matching algorithms, and event creation.
* **Resource Service:** Handles room booking and campus facility availability.
* **Notification Service:** AI-driven engine for smart reminders and push notifications.
* **Material Vault Service:** Manages file metadata, sharing permissions, and external storage links (e.g., AWS S3).

## 9. API Overview
All APIs follow RESTful principles with standard JSON responses.
* `POST /api/auth/login` - Authenticate and receive JWT.
* `GET /api/users/:id` - Fetch user profile and preferences.
* `GET /api/groups` - List user's active groups.
* `POST /api/groups/:id/sessions` - Create a new study session.
* `GET /api/resources/availability` - Query available rooms for a given timeframe.
* `POST /api/materials/upload` - Securely upload a document to the vault.

## 10. Database Schema Overview (PostgreSQL)
* **Users:** `id`, `email`, `name`, `password_hash`, `preferences_json`, `created_at`
* **Groups:** `id`, `name`, `description`, `theme_config`, `created_at`
* **GroupMembers:** `group_id`, `user_id`, `role`, `joined_at`
* **Sessions:** `id`, `group_id`, `start_time`, `end_time`, `location_id`, `status`
* **Resources:** `id`, `name`, `type`, `capacity`, `location_details`
* **Materials:** `id`, `group_id`, `uploaded_by`, `file_url`, `file_type`, `created_at`

## 11. Frontend Architecture
* **Framework:** React 18+ (Functional Components & Hooks).
* **State Management:** Zustand for global state, React Query for server-state caching and synchronization.
* **Routing:** React Router v6 with code splitting and cinematic page transitions.
* **Styling:** Vanilla CSS (CSS Modules) mixed with Framer Motion for complex animations. No generic component libraries to maintain custom aesthetic control.

## 12. Component Hierarchy
* `App`
  * `ThemeProvider` (Handles ambient lighting state)
  * `AuthProvider`
  * `AppRouter`
    * `NavigationBar` (Floating glassmorphic dock)
    * `DashboardView`
      * `GreetingCard` (Dynamic typography)
      * `UpcomingSessionsList`
      * `AiRemindersWidget`
    * `GroupHubView`
      * `GroupHeader` (Abstract artistic background)
      * `ChatInterface`
      * `MaterialGrid`

## 13. UI Design System
* **Visual Language:** Apple's precision + Linear's dark mode elegance + cinematic futuristic depth.
* **Surfaces:** Layered floating components using heavy glassmorphism (backdrop-filter: blur).
* **Borders:** 1px subtle glowing borders (gradient strokes) on dark surfaces.
* **Shadows:** Deep, soft colored drop-shadows matching the underlying gradient themes to create ambient lighting.

## 14. Color Palette
* **Background:** Deep Void `#050507` to Charcoal `#0D0D12`
* **Surface Panels:** Translucent Glass `rgba(20, 20, 25, 0.6)`
* **Primary Accents (Gradients):**
  * *Dreamy Aurora:* `#FF2A85` to `#8A2387` to `#E94057`
  * *Ethereal Ocean:* `#00C9FF` to `#92FE9D`
* **Text Primary:** Pure White `#FFFFFF`
* **Text Secondary:** Muted Silver `#8A8A93`

## 15. Animation Guidelines
* **Page Transitions:** Fade and slight scale up (0.98 to 1.0) over 400ms using a spring curve.
* **Hover States:** Floating elements lift slightly (+2px Y-axis) with an intensified colored glow (box-shadow).
* **Micro-interactions:** Buttons exhibit a subtle liquid ripple or border gradient spin on click.
* **Loading States:** Avoid generic spinners; use skeleton screens that shimmer with iridescent gradients.

## 16. Typography System
* **Primary Typeface:** *Inter* or *Outfit* for ultimate modern readability.
* **Display Headings:** *Cinzel* or a refined serif for ultra-premium section headers, mixed with sans-serif body.
* **Hierarchy:**
  * `h1` (Hero): 48px, bold, tight tracking, gradient text fill.
  * `h2` (Section): 32px, medium, pure white.
  * `body`: 16px, regular, 160% line-height, muted silver.
  * `caption`: 12px, uppercase, wide tracking.

## 17. Folder Structures
### Backend
```
/backend
  /auth-service
    /src
      /controllers
      /models
      /routes
  /group-service
  /scheduling-service
  /shared-libs
```

### Frontend
```
/frontend
  /src
    /assets
    /components
      /common (Buttons, Inputs - Glassmorphic)
      /layout (Navigation, Wrappers)
    /hooks
    /pages
    /services (API clients)
    /store (Zustand)
    /styles (Global CSS, Design Tokens)
```

## 18. Deployment Plan
* **Containerization:** All services dockerized.
* **Orchestration:** Kubernetes (EKS/GKE) for managing microservice scaling.
* **CI/CD:** GitHub Actions to run tests, build Docker images, and deploy to staging/production clusters.
* **Static Assets:** Frontend bundled via Vite and served via CDN (Vercel or AWS CloudFront).
* **Database:** Managed PostgreSQL instance (e.g., AWS RDS).

## 19. Git Branching Strategy
* **Main Branch (`main`):** Production-ready code only.
* **Development Branch (`dev`):** Integration branch for ongoing features.
* **Feature Branches (`feature/ticket-name`):** Branched off `dev`. Rebased and merged via Pull Requests.
* **Hotfix Branches (`hotfix/bug-name`):** Branched off `main` for critical production patches.

## 20. MVP Roadmap
* **Phase 1 (Weeks 1-3):** Core Auth, User Profiles, and Database schema setup.
* **Phase 2 (Weeks 4-6):** Group Service, Material Vault (upload/download), and Frontend scaffolding.
* **Phase 3 (Weeks 7-9):** Scheduling Service, AI Reminders integration, and full UI/UX implementation (Glassmorphism & Animations).
* **Phase 4 (Week 10):** Beta testing, bug fixes, performance optimization of animations.

## 21. Stretch Features
* **AR Study Rooms:** Virtual 3D study spaces using WebGL/Three.js.
* **AI Note Summarization:** Automatic generation of flashcards from uploaded PDFs.
* **Gamification:** Focus-time tracking with unlocking ethereal badges and new ambient backgrounds.

## 22. Security Considerations
* **Authentication:** Short-lived JWTs with secure, HTTP-only, SameSite refresh tokens.
* **API Security:** Rate limiting via API Gateway, input validation (Zod/Joi) on all microservices.
* **Data Privacy:** Encryption at rest for the PostgreSQL database; end-to-end encryption for chat messages.
* **CORS:** Strict origin policies enforced at the Gateway level.

## 23. Responsive Design Strategy
* **Mobile-First Foundation:** The UI must be fully functional on mobile devices with bottom-sheet modals and tab-based navigation.
* **Tablet (iPad):** Split-view layouts maximizing the use of screen real estate for calendar and group hubs.
* **Desktop:** Immersive, multi-column cinematic views. Floating widgets utilize the extra peripheral space.

## 24. AI-Assisted Development Strategy
* **Code Generation:** Use GitHub Copilot or equivalent for boilerplate microservice setup and React component scaffolding.
* **UI/UX Prototyping:** Utilize Midjourney or similar tools to generate abstract background assets and validate color palettes.
* **Testing:** AI-driven unit test generation (e.g., CodiumAI) to ensure microservice endpoints have high coverage.
* **Documentation:** Automated OpenAPI (Swagger) spec generation from Node.js routes via AI analysis.
