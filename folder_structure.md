# API Folder Structure and Directory Tree (Excluding Corebase)

This document outlines the organization and responsibilities of the `/api/src/` and `/api/public/` directories of the project, focusing on product-specific and shared components.

---

## Directory Tree View

```text
/api/
├── public/                           # Static assets, templates, and publicly served files
└── src/                              # Main application source code
    ├── config/                       # Application configurations (port, DB options, local configs)
    ├── constant/                     # Shared static constants and enum definitions
    ├── controllers/                  # Express request/response controllers and parameter parses
    ├── externals/                    # Integrations with databases (Mongoose/Prisma) and external services
    ├── jobs/                         # Scheduled/cron background jobs
    ├── middleware/                   # Authentication, upload, logging, and error-handling middlewares
    ├── models/                       # Domain data types, shared types, and API DTO contracts
    ├── repositories/                 # DB communication and record mapping layer (Repository Pattern)
    │   └── product/                  # Product-specific database queries and data mappers
    ├── routers/                      # Express routers mapping URLs to controllers/middlewares
    ├── services/                     # Core business logic and database transaction logic
    ├── types/                        # Global and module-specific TypeScript declarations
    └── utility/                      # Reusable helper functions, encoders, and formatters
```

---

## Directory Descriptions

### Public Folder (`/api/public`)
* **`/api/public`** = Static assets, templates, and publicly served files.

### Source Folder (`/api/src`)
* **`src/config`** = Core configurations (server setups, local settings, setting JSON templates, and default constants).
* **`src/constant`** = Shared product constants, system enums, and static code identifiers (e.g., status flags, car maintenance types).
* **`src/controllers`** = HTTP request handlers; responsible for receiving requests, validating input parameters, and invoking services.
* **`src/externals`** = Database and external service connectors, including Mongoose schemas/models, the Prisma client instance, Redis connections, S3 storage interfaces, and SMTP email services.
* **`src/jobs`** = Scheduled tasks and background cron jobs (e.g., recurring syncs or cleanups) imported by the main entry point.
* **`src/middleware`** = Express middleware functions (JWT authentication validation, file upload handling, logging, request parsers, and global error handling).
* **`src/models`** = Structural schemas and models (Data Transfer Objects defining request/response contracts for the API, shared types, etc.).
* **`src/repositories/product`** = Data access layer implementing the Repository Pattern (Mongoose and Prisma queries) specific to the car/fleet product features.
* **`src/routers`** = Express routes mapping path endpoints to middlewares and controllers.
* **`src/services`** = Core business logic, workflows, decision calculations, and orchestrations of data.
* **`src/types`** = Shared TypeScript types, utility types, and module overrides.
* **`src/utility`** = General purpose helpers, helper functions, formatters, and reusable system utilities (e.g., error formatters, ID encoders).
