**Task Management Microservice & Frontend**

- **Short description:** A simple task management application consisting of a Java/Spring Boot backend microservice and an Angular frontend. The backend exposes REST APIs for tasks, users, comments and authentication; the frontend is an Angular app that consumes those APIs.

**Prerequisites:**
- **Java:** JDK 17+ (or the version used in `backend/pom.xml`).
- **Maven:** Apache Maven 3.6+ for building the backend.
- **Node.js & npm:** Node 16+ and npm 8+ for the Angular frontend.
- **Angular CLI (optional):** `@angular/cli` for local development (`npm install -g @angular/cli`).
- **Environment variables / configuration:**
	- Backend: properties in `backend/src/main/resources/application.properties` (e.g., DB connection, server port, JWT secret). Prefer using environment variables or a secrets manager in production.
	- Frontend: environment files in `frontend/src/environments/` for API base URL and feature toggles.

**Quick Setup (build & run)**
- Build backend (from repo root):

```bash
# From repository root
mvn -f backend/ clean package -DskipTests
```

- Run backend JAR (after build):

```bash
java -jar backend/target/task-management-0.0.1-SNAPSHOT.jar
```

- Frontend: install and run (development):

```bash
cd frontend
npm install
# with Angular CLI
ng serve --open
# or using npm script if provided
npm start
```

**Folder structure (overview)**
- `backend/` — Java Spring Boot microservice
	- `pom.xml` — Maven configuration
	- `src/main/java/com/example/...` — application source
	- `src/main/resources/application.properties` — runtime properties
- `frontend/` — Angular single-page application
	- `src/app/` — Angular modules, components, services
	- `src/environments/` — environment-specific constants
	- `src/app/api-generated/` — generated OpenAPI client bindings
- `openapi.yaml` — OpenAPI specification (used to generate the `api-generated` client)

**API Endpoints (brief)**
Note: exact paths and payloads are defined in `openapi.yaml` and in backend controllers. Example endpoints commonly found in this project:
- `POST /api/auth/login` — authenticate user, return JWT access token.
- `POST /api/auth/register` — create a new user.
- `GET /api/tasks` — list tasks (supports pagination & filtering).
- `GET /api/tasks/{id}` — get task details.
- `POST /api/tasks` — create a task.
- `PUT /api/tasks/{id}` — update a task.
- `DELETE /api/tasks/{id}` — delete a task.
- `GET /api/users` — list users.
- `GET /api/comments` and `POST /api/comments` — manage comments on tasks.

Refer to `openapi.yaml` for complete endpoint definitions and request/response models.

**Running tests**
- Backend unit & integration tests (Maven):

```bash
# run backend tests
mvn -f backend/ test
```

- Frontend tests (if configured with Angular/Karma/Jest):

```bash
cd frontend
npm test
```

**Development tips**
- Use the OpenAPI spec (`openapi.yaml`) to regenerate the TypeScript client in `frontend/src/app/api-generated/` if API changes.
- Use environment files in `frontend/src/environments/` to point to the backend during local development.
- Keep secrets out of source control; use environment variables or a secret management solution.

**Coding standards & guidelines**
- Follow the repository's guidelines in `.github/copilot-instructions.md` and `.github/instructions/*` for language-specific rules.
- Security: validate input, do not log secrets, and avoid unsafe patterns (see `.github/instructions/security.instructions.md`).

**License & Contact**
- License: (add project license here, e.g., MIT) — include `LICENSE` file at repo root.
- Author / maintainer: Vijay (update contact email or team details here).

**Next steps**
- Verify `backend/src/main/resources/application.properties` and set required environment variables for DB and auth.
- Run `mvn -f backend/ test` and `npm test` (frontend) to confirm test-suite health.
- Consider adding a developer `Makefile` or root-level `scripts/` to simplify common tasks (build, run, test).

---

If you'd like, I can:
- Add a `LICENSE` file and commit it.
- Add example environment variable templates (`.env.example`) for backend/frontend.
- Generate a short `CONTRIBUTING.md` with contribution steps.


