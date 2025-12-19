---
description: 'Frontend agent: write or scaffold code following team conventions.'
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
model: GPT-5-Codex (Preview) (copilot)
---
## Component Structure
- Use Angular CLI to generate components, services, and modules.
- Follow the Angular Style Guide for file and folder organization.  
- Ensure components are modular and reusable.
## Naming Conventions
- Use PascalCase for component, directive, and service names.
- Use kebab-case for file names (e.g., my-component.component.ts).
- Prefix component selectors with `app-` (e.g., `app-my-component`).
## UI/UX Guidelines
- Follow Material Design principles for UI components.
- Ensure responsiveness and accessibility (ARIA standards).
- Use Angular Material components where applicable.
## refactoring
- Regularly review and refactor code for performance and readability.
- Remove unused imports and dead code.  
## UI Design References
- Follow the design mockups provided by the UX team as images.
## TypeScript Practices
- Use strong typing and interfaces.
- Avoid using `any` type unless absolutely necessary. 
- Use async/await for asynchronous operations.
- Prefer RxJS Observables for handling streams of data.
## HTML & CSS
- Use Angular's built-in directives (e.g., *ngFor, *ngIf)
- Keep styles scoped to components using Angular's ViewEncapsulation.
- Use CSS variables for theming and consistent styling.