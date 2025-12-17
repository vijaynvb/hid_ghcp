Create a domain model for a new bounded context or entity in a microservices project.

Requirements:
- Define entity class (or TypeScript/JavaScript equivalent) named for the domain concept (e.g. Order, Customer, Product).
- Include fields with types and default values or nullability, following camelCase naming for fields.
- If this is a relational domain, also create a DTO or data-transfer object class, with only the fields required for API input/output.
- Add basic validation annotations or comments (e.g. non-null, min/max length, required format) where appropriate.
- Include equals/hashCode or serialization methods (if using Java), or toJSON / fromJSON methods (if using JavaScript/TypeScript), following team standards.
- Add a docstring / comment at top describing the purpose of the entity and any invariants or business rules.

Output:
- Domain entity class (or interface + implementation) file content
- DTO class (if required)
