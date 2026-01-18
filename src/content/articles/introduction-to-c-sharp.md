---
title: "Introduction to C#"
slug: "intro-csharp"
snippet: "Introduction to C# with OOP, async, LINQ, and best practices"
category: "Programming"
pubDate: 2025-07-17
relatedArticles: ["intro-flutter-dart", "intro-vbnet"]
---

# Introduction to C#

---

### What is the difference between value types and reference types?

**Answer:**

In C#, types are divided into:

* **Value types** (e.g. `int`, `double`, `bool`, `struct`): they store the actual value directly. When passed to a method, the value is copied.
* **Reference types** (e.g. `class`, `string`, `object`, `array`): they store a reference to a memory location. When passed, the reference is copied, not the object itself.

**Practical consequence:** modifying a reference type inside a method affects the original object. With value types, it does not.

---

### What is the role of `var` compared to explicit types?

**Answer:** `var` allows the compiler to automatically infer the variable type, as long as it is initialized immediately.

**Example:**

```csharp
var name = "Manuel"; // string
var number = 42;     // int
```

Useful for writing cleaner code, especially with LINQ.  
It is not the same as “weak typing”: the type is still determined at compile time.

---

### How does exception handling work (try, catch, finally)?

**Answer:**

It is the mechanism used to handle errors in a controlled way.

```csharp
try
{
    int x = int.Parse("abc"); // Throws exception
}
catch (FormatException ex)
{
    Console.WriteLine("Format error.");
}
finally
{
    Console.WriteLine("This block is always executed.");
}
```

* **try:** wraps code that may throw exceptions  
* **catch:** handles a specific exception (multiple blocks are allowed)  
* **finally:** always executed, useful for releasing resources  

---

## Object-Oriented Programming (OOP)

---

### Explain inheritance, encapsulation, and polymorphism

**Answer:**

* **Inheritance:** a class can inherit members from a base class (`: BaseClass`), avoiding duplication  
* **Encapsulation:** protects data through visibility (`private`, `protected`, `public`) and exposes it via properties/methods  
* **Polymorphism:** the same method behaves differently depending on the instance. Achieved via `virtual`, `override`, or interfaces  

**Example:**

```csharp
public class Animal
{
    public virtual void Sound() => Console.WriteLine("Generic sound");
}

public class Dog : Animal
{
    public override void Sound() => Console.WriteLine("Bark");
}
```

---

### Difference between abstract, virtual, override, sealed

**Answer:**

* **abstract:** forces derived classes to implement the method  
* **virtual:** defines a method that can be overridden  
* **override:** redefines a virtual or abstract method  
* **sealed:** prevents further overriding or inheritance  

**Example:**

```csharp
public abstract class Vehicle
{
    public abstract void Move();
}

public class Car : Vehicle
{
    public override void Move() => Console.WriteLine("The car moves");
}
```

---

### What are interfaces in C#?

**Answer:**

An interface (`interface`) is a contract that defines only method signatures (no implementation). Any class that implements it must define all members.

```csharp
public interface IPrintable
{
    void Print();
}

public class Document : IPrintable
{
    public void Print()
    {
        Console.WriteLine("Printed");
    }
}
```

Interfaces are essential for loosely coupled code, testability, and dependency injection.

---

## Delegates, LINQ, and async

---

### What is a delegate?

**Answer:**

A delegate is a type that represents a reference to a method with a specific signature.  
It allows methods to be passed as parameters.

```csharp
delegate int Operation(int x, int y);

public static int Add(int a, int b) => a + b;

Operation op = Add;
Console.WriteLine(op(3, 4)); // Output: 7
```

Useful for events, callbacks, and functional-style programming.

---

### What is LINQ and how is it used?

**Answer:**

LINQ (Language Integrated Query) is a set of methods used to query collections in C# using fluent syntax.

**Example:**

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
var evens = numbers.Where(n => n % 2 == 0).ToList();
```

It works with databases, XML, and in-memory objects.  
It supports filtering (`Where`), projections (`Select`), sorting (`OrderBy`), aggregations (`Sum`, `Count`), and more.

---

### Explain async, await, and Task

**Answer:**

C# supports asynchronous programming using `async`/`await` for non-blocking operations.

```csharp
public async Task<string> GetDataAsync()
{
    await Task.Delay(1000); // Simulated delay
    return "Response ready";
}
```

* **async:** marks a method as asynchronous  
* **await:** pauses execution until the operation completes  

Commonly used for I/O, HTTP calls, database access, etc.

---

## Data access

---

### Difference between ADO.NET and Entity Framework

**Answer:**

* **ADO.NET:** manual database access using `SqlConnection`, `SqlCommand`, etc.  
* **Entity Framework (EF):** ORM that maps objects to tables and simplifies data operations  

**ADO.NET example:**

```csharp
using var conn = new SqlConnection(connString);
conn.Open();
var cmd = new SqlCommand("SELECT * FROM Clients", conn);
using var reader = cmd.ExecuteReader();
```

**EF example:**

```csharp
var clients = context.Clients.Where(c => c.Active).ToList();
```

---

### How can you protect against SQL Injection?

**Answer:**

Use parameterized queries — never concatenate user input directly:

```csharp
cmd.CommandText = "SELECT * FROM Users WHERE Name = @name";
cmd.Parameters.AddWithValue("@name", userInput);
```

In Entity Framework, this is handled automatically through LINQ.

---

## Best Practices

---

### What is IDisposable and how is it used?

**Answer:** `IDisposable` is an interface that defines the `Dispose()` method for releasing unmanaged resources (e.g. files, database connections).

```csharp
public class FileHandler : IDisposable
{
    private StreamReader reader;

    public FileHandler(string path)
    {
        reader = new StreamReader(path);
    }

    public void Dispose()
    {
        reader?.Dispose();
    }
}
```

With `using`, `Dispose()` is called automatically.

---

### What are the SOLID principles?

**Answer:**

* **S - Single Responsibility:** each class should have a single, well-defined responsibility  
* **O - Open/Closed Principle:** code should be open for extension but closed for modification  
* **L - Liskov Substitution:** derived classes must be substitutable for their base classes  
* **I - Interface Segregation:** interfaces should be specific and not force unused members  
* **D - Dependency Inversion:** depend on abstractions, not concrete implementations  

They help produce scalable, testable, and maintainable code.

---

## Practical exercises

---

### Write a function that sums only even numbers in a list

```csharp
public int SumEven(List<int> numbers)
{
    return numbers.Where(n => n % 2 == 0).Sum();
}
```
