---
applyTo: "**"
description: "Security and architectural safeguards"
---

# Security Guidelines

## Input Safety
- Always validate input.
- Never trust client-provided data.

## Secrets
- Never hardcode credentials or tokens.
- Encourage use of environment variables or secrets manager.

## API Contracts
- Follow OpenAPI standards.
- Ensure backward compatibility.

## Unsafe Patterns (Do NOT generate)
- eval()
- Inline SQL with dynamic string concatenation
- Logging sensitive data