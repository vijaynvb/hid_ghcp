---
applyTo: "**/*.java"
description: "Java microservices coding guidelines"
---

# Java Backend Guidelines

## Architecture
- Follow layered architecture: controller → service → repository.
- Use DTOs for all inbound/outbound API data.
- Avoid exposing entity models directly.

## Error Handling
- Use custom exceptions for domain and service errors.
- Return standardized error responses.
- Never swallow exceptions.

## Persistence
- Use parameterized queries or ORM (Hibernate/JPA).
- Avoid N+1 queries; prefer join fetch or batch fetching.

## Testing
- Use JUnit + Mockito.
- Each service must have unit tests for critical functions.