```markdown
# raycast Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `raycast` TypeScript codebase. It covers file organization, code style, commit practices, and testing patterns to ensure consistency and maintainability across the project.

## Coding Conventions

### File Naming
- Use **kebab-case** for all file names.
  - Example: `user-profile.ts`, `api-client.test.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './utils/fetch-data';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // In fetch-data.ts
    export function fetchData() { ... }

    // In another file
    import { fetchData } from './fetch-data';
    ```

### Commit Messages
- Follow **conventional commit** format.
- Common prefixes: `docs`, `chore`
  - Example: `docs: update README with usage instructions`
  - Example: `chore: update dependencies`

## Workflows

### Commit Changes
**Trigger:** When making any code, documentation, or configuration changes  
**Command:** `/commit-changes`

1. Make your code or documentation changes.
2. Stage your changes:  
   ```bash
   git add .
   ```
3. Commit using the conventional commit format:  
   ```bash
   git commit -m "docs: update usage section"
   ```
4. Push your changes:  
   ```bash
   git push
   ```

### Add a Test
**Trigger:** When adding or updating functionality that requires testing  
**Command:** `/add-test`

1. Create a test file using the pattern `*.test.ts` (or `.tsx` if applicable).
2. Use the appropriate (unknown) testing framework syntax.
3. Place the test file alongside the code it tests.
   - Example:  
     ```
     src/
       utils/
         fetch-data.ts
         fetch-data.test.ts
     ```
4. Run the test suite to ensure all tests pass.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `api-client.test.ts`
- The specific testing framework is not detected, but standard TypeScript test patterns apply.
- Place test files next to the files they test for clarity and maintainability.

## Commands
| Command         | Purpose                                           |
|-----------------|---------------------------------------------------|
| /commit-changes | Guide for committing code using project standards |
| /add-test       | Steps to add and organize new tests               |
```
