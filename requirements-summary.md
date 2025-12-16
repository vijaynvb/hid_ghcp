# Task Management App — One-Page Summary

Version: 1.0 • Date: 16 December 2025

**Purpose:** Centralize internal task tracking to improve visibility, accountability, and productivity for employees and managers.

**Problem Statement:** Dispersed spreadsheets and ad-hoc notes cause missed deadlines, low visibility, and duplicated effort. Build an internal web app (Spring Boot + Angular) to centralize task lifecycle and reporting.

**MVP Scope:**
- Authentication (SSO OIDC + optional internal login)
- Task CRUD (title, description, priority, status, due date, assignee, tags, comments)
- Assignment & manager reassignment (direct reports)
- Email notifications (assignment, reminders, overdue)
- Personal, team, and executive dashboards
- Basic reporting: on-demand CSV export
- H2 embedded (file-mode) for MVP persistence

**Primary Actors:**
- Employee: create/manage own tasks
- Manager: view/manage team tasks, reassign for direct reports
- Admin: system config, SMTP, retention, audit
- Executive/Compliance: read-only reports

**Top Workflows (high level):**
1. Create task → (optional) assign → assignee notified → work/update status → complete.
2. Task passes due date → auto-flag overdue → manager notified/escalation.
3. Manager views team dashboard → filter/reassign tasks → export report.

**Key Functional Requirements (selected):**
- Login via OIDC; internal fallback
- Task fields: title (req), desc, priority, due date, assignee, tags
- Statuses: Open, In Progress, Blocked, Completed, Cancelled
- Auto-flag overdue tasks and surface in dashboards
- Email reminders and configurable escalation
- CSV export for reports; optional PDF summaries
- REST API for integrations (token-based)

**Non-Functional Requirements (selected):**
- TLS for all traffic; RBAC enforced
- UI median page load < 2s; API read median < 200ms
- Availability target: 99.9%
- Daily backups; RTO < 4 hours, RPO < 24 hours
- Baseline scale: 1,000 users, 100 concurrent; design to scale horizontally

**Assumptions & Constraints:**
- Single-tenant internal app; English-only MVP
- H2 embedded (file-mode) for MVP; recommend Postgres for production
- No attachments in MVP; Slack & calendar sync deferred
- Manager scope: direct reports by default; Admin override allowed

**Acceptance Criteria (MVP):**
- Users authenticate and view personal dashboard
- Tasks can be created, assigned, updated, completed
- Assignment triggers email notification
- Overdue tasks auto-flag and appear on manager dashboard
- Admin can configure SMTP and export CSV reports

**Risks & Recommendations (short):**
- H2 file-mode limits durability and scaling — plan Postgres migration early
- Decide SSO provider early (affects provisioning/SCIM)
- Rate-limit notifications to avoid spam

**Next Steps:**
- Approve this summary and `requirements.md` (detailed) stored in workspace
- Optionally scaffold project skeleton (Spring Boot + Angular) with Clean Architecture and H2 file-mode seed data
- Create initial backlog of user stories for sprint 1

Files created:
- `requirements.md` — Full requirements
- `requirements-summary.md` — This one-page summary

Would you like me to scaffold the project skeleton now (Spring Boot backend + Angular frontend, Clean Architecture, H2 file-mode), or generate sprint user stories from these requirements?