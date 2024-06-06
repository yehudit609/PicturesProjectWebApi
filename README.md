## .NET Core Project

This project is a .NET Core REST API application.

### Description

This project is a REST API developed with .NET Core. The project was developed for an online shop that allows users to: Create an account, View inventory, Search and filter products, View the basket, Place an order.

### Technologies

* .NET Core
* REST API
* Entity Framework (Database First)
* Swagger
* AutoMapper
* zxcvbn (password strength checker)
* xUnit

### Project Structure

The project consists of three layers, adhering to the principle of separation of concerns:

1. **Presentation Layer (Controllers):** Handles incoming requests and maps them to business logic.
2. **Business Logic Layer (Services):** Contains the core application logic.
3. **Data Access Layer (Repositories):** Interacts with the database using Entity Framework.

These layers communicate with each other through Dependency Injection (DI).

### Dependency Injection

DI is used extensively throughout the project, providing several benefits:

* Improved code maintainability
* Enhanced testability
* Better separation of concerns

### Database

The project uses Entity Framework with the Database First approach. To run the project, you can use commands like `add-migration` and other EF Core CLI commands.

### Scalability

To ensure scalability, all functions are implemented using asynchronous programming (`async` and `await`) for handling long-running operations efficiently.

### Data Input

Data input is handled in a separate project. You can find more details and access it here: [[Link to ADO project on GitHub](https://github.com/yehudit609/AdoManager)] 

### Documentation

The entire project is documented using Swagger, providing an easy-to-use interface for API exploration and testing.

### DTO Layer

A lot of attention has been given to the DTO (Data Transfer Object) layer to avoid circular dependencies and encapsulation issues. Conversions between entities and DTOs are handled using AutoMapper.

### Configuration

* Configuration files include settings like connection strings.
* The connection string is temporarily stored in `appsettings.json` but should be moved to user secrets for better security.

### Error Handling

Errors are caught by the error handling middleware and handled properly. This includes:

* Sending real-time email notifications to the administrator
* Logging all errors in files for review and debugging

### Monitoring

Traffic is monitored and logged in a dedicated table for analytical purposes within the middleware.

### Security

* The project enforces HTTPS for secure communication.
* Password strength is validated using zxcvbn to ensure strong passwords.
* Product prices are always retrieved from the database to ensure accuracy and prevent inconsistencies.

### Testing

* We performed integration tests in the repository layer against a temporary database created specifically for testing and deleted at the end of the test.
* We performed unit tests in the service layer using a mocking framework like Moq to isolate and test functions with complex logic.

### Example Client

We developed a small client using HTML and JavaScript to demonstrate an online store that uses this API.
