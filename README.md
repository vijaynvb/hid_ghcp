# HID - Internal Task Management (Monorepo)

Repository scaffold for the Internal Task Management application (MVP).

Structure:

- `openapi.yaml` - OpenAPI specification (provided)
- `server/` - Spring Boot backend (minimal skeleton)
- `client/` - Angular frontend placeholder + instructions

Quick start

Backend (Spring Boot):

```bash
cd server
mvn -U clean package
mvn spring-boot:run
```

## Swagger / OpenAPI (Backend)

- **Start backend**: `mvn -f backend spring-boot:run` or build and run the jar from `backend/target`.
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`
- **Swagger UI**: `http://localhost:8080/swagger-ui/index.html` (also available at `/swagger-ui.html` on some setups)

Notes:

- The backend uses `springdoc-openapi-ui` to generate OpenAPI docs and provide the Swagger UI.
- If your backend runs on a different port or context path, replace `http://localhost:8080` accordingly.

Frontend (Angular):

Follow the steps in `client/README.md` to scaffold an Angular app with the Angular CLI.

Next steps suggestions:

- Generate server code or controllers from `openapi.yaml` (OpenAPI Generator or Spring tooling).
- Use `openapi-generator` to create a TypeScript client in `client/src/app/api`.
- Add CI scripts to build both `server` and `client`.
