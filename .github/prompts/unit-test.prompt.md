Generate a unit test skeleton for a service or controller method.

Requirements:
- Target a given class or method (you can specify name after invoking prompt).
- For each public method, create a corresponding test method covering at least:
   - Happy path (valid input -> expected output)
   - Error path(s) (e.g. invalid input, exceptions, boundary cases)
- Use the standard testing framework of the project (e.g. JUnit + Mockito for Java; Jest / Mocha for JS/TS).
- Include setup and teardown or necessary mock/stub configuration.
- Use descriptive test method names following pattern: should_<behavior>_when_<condition>.
- Add comments or assertions for expected behavior and edge-cases.
- For create/update methods: include test for validation failures (e.g. missing required fields).
- For fetch/delete: include test for non-existing entity / invalid ID handling.

Output:
- Unit test skeleton file(s) covering given methods
