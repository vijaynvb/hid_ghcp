---
applyTo: "**/*.tsx,**/*.ts"
description: "Angular guidelines"
---

# Angular Coding Standards

## Component Structure
- Use Angular CLI to generate components, services, and modules.
- Follow the Angular Style Guide for file and folder organization.  

## TypeScript Practices
- Use strong typing and interfaces.
- Avoid using `any` type unless absolutely necessary. 
- Use async/await for asynchronous operations.
- Prefer RxJS Observables for handling streams of data.
## HTML & CSS
- Use Angular's built-in directives (e.g., *ngFor, *ngIf)
- Keep styles scoped to components using Angular's ViewEncapsulation.
- Use CSS variables for theming and consistent styling.
## Testing
- Write unit tests for all components and services using Jasmine and Karma.
- Achieve at least 80% code coverage.
- Use Angular's TestBed for setting up tests.
## Performance Optimization
- Use lazy loading for modules.
- Optimize change detection by using OnPush strategy where applicable.
- Minimize the use of third-party libraries; prefer Angular's built-in features.
## Accessibility
- Follow WCAG guidelines for accessibility.
- Use semantic HTML elements.
- Ensure all interactive elements are keyboard navigable.
## Documentation
- Document components, services, and modules using JSDoc comments.
- Maintain a README.md file for each module explaining its purpose and usage.
