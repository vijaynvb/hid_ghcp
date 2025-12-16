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

Frontend (Angular):

Follow the steps in `client/README.md` to scaffold an Angular app with the Angular CLI.

Next steps suggestions:

- Generate server code or controllers from `openapi.yaml` (OpenAPI Generator or Spring tooling).
- Use `openapi-generator` to create a TypeScript client in `client/src/app/api`.
- Add CI scripts to build both `server` and `client`.
