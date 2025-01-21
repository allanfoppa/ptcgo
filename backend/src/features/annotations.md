# ANNOTATIONS

What we will try to implement here is that each file must have a unique responsibility, and cannot have a __create__ and __findOne__ method in the same file, for example.

Argument: This way, each file will only be responsible for one process, avoiding bloat and having too many lines of code.

Pros:

- Few lines of code in each file
- Unique unit tests

Cons:

- Attention to the creation of each feature
- The number of files can become a maintenance problem

Example:

```markdown
├── src/
│   ├── users/
│   |   ├── registration/
│   │   |   ├── registration.controller.spec.ts
│   │   |   ├── registration.controller.ts
│   │   |   ├── registration.module.spec.ts
│   │   |   ├── registration.module.ts
│   │   |   ├── registration.service.spec.ts
│   │   |   ├── registration.service.ts
│   │   |   └── registration.entity.ts
│   |   ├── create/
│   │   |   ├── create.controller.spec.ts
│   │   |   ├── create.controller.ts
│   │   |   ├── create.module.spec.ts
│   │   |   ├── create.module.ts
│   │   |   ├── create.service.spec.ts
│   │   |   ├── create.service.ts
│   │   |   └── create.entity.ts
│   |   ├── findOne/
│   │   |   ├── findOne.controller.spec.ts
│   │   |   ├── findOne.controller.ts
│   │   |   ├── findOne.module.spec.ts
│   │   |   ├── findOne.module.ts
│   │   |   ├── findOne.service.spec.ts
│   │   |   ├── findOne.service.ts
│   │   |   └── findOne.entity.ts
```

And try to expose the endpoints in such a way that they follow the folder hierarchy.

## USERS REGISTRATION

{{base_ul}}/users/registration

## USERS CREATE

{{base_ul}}/users/create

## USERS FIND ONE

{{base_ul}}/users/find-one
