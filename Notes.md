### **Backend**
The backend is built using **.NET** (ASP.NET Core) and follows the **Clean Architecture** principles. Here's a detailed explanation:

#### **Key Files and Folders**
1. **`Program.cs`**:
   - The entry point of the application.
   - Configures the web server, middleware, and services.
   - Registers dependencies for use cases and repositories.

2. **`Controllers/StudentsController.cs`**:
   - A controller that handles HTTP requests related to students.
   - Uses use cases for CRUD operations (Create, Read, Update, Delete) on student data.

3. **`Core/Entities/Student.cs`**:
   - Defines the `Student` entity, which represents a student in the system.
   - Includes properties like `Id`, `FullName`, `Address`, `DateOfBirth`, etc.

4. **`Core/Interfaces/IStudentRepository.cs`**:
   - Defines the contract for the `StudentRepository`.
   - Includes methods like `AddStudentAsync`, `GetStudentsAsync`, etc.

5. **`Application/UseCases/`**:
   - Contains use cases like `RegisterStudent`, `GetAllStudents`, `UpdateStudent`, etc.
   - Encapsulates application-specific business logic.

6. **`Infrastructure/Persistence/StudentDbContext.cs`**:
   - Represents the database context using **Entity Framework Core**.
   - Manages the connection to the database and provides access to the `Students` table.

7. **`Infrastructure/Persistence/StudentRepository.cs`**:
   - Implements the `IStudentRepository` interface.
   - Handles database operations for the `Student` entity.

8. **`appsettings.json` and `appsettings.Development.json`**:
   - Configuration files for the application.
   - Contain settings like database connection strings, logging, and other environment-specific configurations.

9. **`Properties/launchSettings.json`**:
   - Configures how the application is launched during development (e.g., environment variables, ports).

#### **Build and Output**
- The `bin/` and `obj/` folders contain compiled binaries and intermediate build files.
- The backend is compiled into a `.dll` file (`backend.dll`) and can be run using the `dotnet` command.

#### **Dependencies**
- Includes libraries like **Entity Framework Core**, **Swashbuckle** (for Swagger/OpenAPI), and others for logging, dependency injection, and caching.

---

### **Frontend**
The frontend is built using **React** with **TypeScript** and uses **Vite** as the build tool. Here's a detailed explanation:

#### **Key Files and Folders**
1. **`src/`**:
   - Contains the main application code.
   - **`App.tsx`**: The root component of the application.
   - **`Registration.tsx`**: A form for registering students.
   - **`StudentList.tsx`**: Displays a list of registered students.
   - **`main.tsx`**: The entry point for the React application.

2. **`public/`**:
   - Contains static assets like images and icons (e.g., `vite.svg`).

3. **`config/constants.ts`**:
   - Contains configuration constants (e.g., API URLs).

4. **`vite.config.ts`**:
   - Configuration file for Vite, specifying build settings, plugins, etc.

5. **`package.json`**:
   - Lists the dependencies and scripts for the frontend.
   - Includes libraries like **React**, **Axios** (for HTTP requests), and others.

6. **`tsconfig.json`**:
   - TypeScript configuration file, defining compiler options.

#### **Styling**
- **`App.css`** and **`index.css`**: Define the styles for the application.

---

### **How It Works**
1. **Frontend-Backend Communication**:
   - The frontend communicates with the backend via HTTP requests (using Axios).
   - The backend exposes RESTful APIs for managing student data.

2. **Database**:
   - The backend uses **Entity Framework Core** to interact with the database.
   - The `StudentDbContext` manages the `Students` table.

3. **Development Workflow**:
   - The backend is run using `dotnet run`.
   - The frontend is run using `npm start` (or a similar Vite command).

4. **Deployment**:
   - The backend and frontend can be deployed separately.
   - The backend serves as the API, while the frontend is likely hosted on a static file server or a cloud platform.

---

### **Learning Path**
To understand this project fully, you can focus on the following areas:

1. **Backend**:
   - Learn **ASP.NET Core** for building APIs.
   - Understand **Entity Framework Core** for database interactions.
   - Explore **Swagger/OpenAPI** for API documentation.

2. **Frontend**:
   - Learn **React** and **TypeScript** for building user interfaces.
   - Understand how **Axios** is used for making API calls.
   - Explore **Vite** for fast builds and development.

3. **Full-Stack Integration**:
   - Study how the frontend and backend communicate via HTTP.
   - Understand the role of environment-specific configurations (e.g., `appsettings.json`).

4. **Deployment**:
   - Learn how to deploy .NET applications and React apps to production.