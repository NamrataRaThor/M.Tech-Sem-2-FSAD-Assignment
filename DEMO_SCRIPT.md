# StudySync Campus: Video Demo Script

**Estimated Duration**: 4-5 Minutes
**Objective**: To highlight the microservices architecture, the "Dream Edition" visual overhaul, and the robust error handling/accessibility implemented during the final audit.

---

## 1. Introduction (0:00 - 0:30)
**[Visual: Show the Landing Page (`/`)]**
- **Speaker**: "Hello, and welcome to the demo of StudySync Campus. This platform was built to revolutionize how students collaborate, form groups, and book study resources."
- **Action**: Slowly scroll down the landing page.
- **Speaker**: "As you can see, the UI has undergone a major visual overhaul we call the 'Dream Edition.' We transitioned from a standard tech dashboard to a cinematic, editorial aesthetic. Notice the ambient bronze auroras animating in the background, the subtle film grain texture, and the elegant 'Josefin Sans' typography."

## 2. Authentication & Accessibility (0:30 - 1:15)
**[Visual: Click 'Enter the Dream' to navigate to `/login`]**
- **Speaker**: "Let's log in. During our final accessibility audit, we ensured these custom input fields are fully compliant with screen readers using ARIA labels and `htmlFor` bindings."
- **Action**: Leave fields blank and click "Sign In".
- **Speaker**: "We also implemented robust client-side validation. Notice the accessible error state appearing without a page refresh."
- **Action**: Enter mock credentials and click "Sign In".
- **Speaker**: "When we authenticate, the button disables to prevent race conditions, showing an 'Authenticating...' state. The Auth Service securely verifies our credentials and issues an HttpOnly JWT cookie via our API Gateway."

## 3. Dashboard & Microservices (1:15 - 2:30)
**[Visual: The Dashboard loads with Skeleton loaders, then fades in data]**
- **Speaker**: "Welcome to the Dashboard. You'll notice the Skeleton loaders that pulse while our React Query hooks fetch data. This prevents layout shift."
- **Action**: Hover over the GlassCards to show the subtle border gradients.
- **Speaker**: "Behind the scenes, the frontend is talking to our Express.js API Gateway running on port 3000. The Gateway validates our JWT and proxies requests to 5 independent microservices."
- **Action**: Point to the "Upcoming Session" card.
- **Speaker**: "This data comes from the Booking Service. It manages physical resources using PostgreSQL."
- **Action**: Point to the "Activity Feed".
- **Speaker**: "And this feed is powered by the User Service. Despite coming from different isolated services, the UI presents a unified, seamless experience."

## 4. Resilience & Error Handling (2:30 - 3:30)
**[Visual: Stop the backend server in the terminal, or explain the error boundary]**
- **Speaker**: "A beautiful UI is nothing without stability. We conducted a comprehensive static audit to harden the application against failures."
- **Action**: (If possible, simulate an API failure to show the 'Connection Lost' screen).
- **Speaker**: "If a microservice goes down, React Query catches the failure. Instead of crashing the app, we implemented Error Boundaries that gracefully display a 'Connection Lost' UI, prompting the user to refresh."

## 5. Documentation & Conclusion (3:30 - 4:15)
**[Visual: Open VS Code to show the `docs/` folder and `docker-compose.yml`]**
- **Speaker**: "To ensure this project is maintainable, we've generated comprehensive documentation located in the `docs` folder. This includes Mermaid ER Diagrams, Component Hierarchies, API Specs via Swagger, and Postman collections."
- **Action**: Open the `docker-compose.yml`.
- **Speaker**: "The entire infrastructure is ready for containerized deployment via Docker Compose. Thank you for watching the StudySync Campus demo."
