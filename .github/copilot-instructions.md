# Global Coding & Architecture Rules
- Use meaningful names (camelCase for variables, PascalCase for classes).
- Keep functions short and single-purpose.
- Avoid deeply nested conditionals.
- Follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`).

## Logging & Documentation
- Use structured logs and propagate correlation/trace IDs on every API boundary.
- Never log secrets or PII; validate and sanitize all client-provided data.
- Every public function needs a short English doc comment explaining purpose/contract.

## Project Overview
- Monorepo contains `backend/` (Spring Boot 2.7 on Java 11), `frontend/` (Angular 16), shared `openapi.yaml`, and a sample MCP module under `custom-mcp-spring-boot-mcp/` (rarely touched).
- Backend REST endpoints live under `/tasks`, `/users`, `/auth` (see `backend/src/main/java/com/example/taskmgmt/controller`). Controllers delegate to services in `service/impl` and persist via Spring Data repositories.
- Angular client consumes the backend through generated code in `frontend/src/app/api-generated`; avoid hand-editing this folder and wrap calls via `GeneratedApiService`.
- Dockerfiles in `backend/` and `frontend/` perform multi-stage builds; prefer container workflows for deployment consistency.

## Backend Practices
- Follow layered structure: controller → service interface → service impl → repository (`backend/src/main/java/com/example/taskmgmt`). Keep business logic in services.
- Domain JPA entities sit in `domain/` (e.g., `Task`) while request/response DTOs live in `dto/`; avoid exposing entities directly outside the service layer.
- Repositories extend Spring Data interfaces; derive queries instead of hand-written SQL. Inject repositories through constructors only.
- Default profile uses in-memory H2; override datasource and secrets via environment variables rather than editing `application.properties`.
- Replace placeholder `RuntimeException` throws with project-specific exceptions under `exception/` and propagate standardized responses.

## Frontend Practices
- Angular workspace root is `frontend/`; entry module bootstraps `AppComponent` from `src/app/app.module.ts`. Feature flows reside in `src/app/pages/**`, shared widgets in `src/app/components/**`.
- `GeneratedApiService` builds an `ApiClient` with `environment.apiBase`; change backend endpoints by adjusting environment files, not inline strings.
- Prefer Observable wrappers (e.g., `listUsers$`) when exposing generated client calls to components/services.
- Styling uses component-scoped CSS; keep global overrides confined to `src/styles.css`.
- Build with `npm ci` followed by `npm run build`; production-specific Angular configuration is not defined, so the default build target is the source of truth.

## Workflows & Tooling
- Backend build/tests: `mvn -f backend/ clean package -DskipTests`, `mvn -f backend/ test` for unit tests.
- Frontend install/tests: `npm ci` then `npm test`; invoke CLI commands with `npx ng ...` to avoid global version drift.
- Regenerate TypeScript client only from `openapi.yaml` using `openapi-typescript-codegen`; commit generated diffs together with backend contract changes.
- Dockerized runs: `docker build -t task-backend backend`, `docker build -t task-frontend frontend`, then run both on a shared network as documented in repo scripts.

## Security Expectations
- Enforce validation annotations (`@Valid`, `@NotNull`) on controller inputs and re-check invariants within services.
- Never introduce `eval`/reflection-based execution or inline SQL string concatenation; rely on framework abstractions.
- Redact tokens, passwords, and personal data from logs and API error messages.