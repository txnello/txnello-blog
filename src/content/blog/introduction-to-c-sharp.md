---
title: "Introduction to C#"
description: "Introduction to C#"
pubDate: "2025-07-17"
heroImage: '../../assets/intro-csharp-cover.jpg'
---

### What is the difference between value types and reference types?

**Answer:**

In C#, types are divided into:

* **Value types** (e.g. `int`, `double`, `bool`, `struct`): hold the actual value directly. When passed as arguments to a function, the value is copied.
* **Reference types** (e.g. `class`, `string`, `object`, `array`): hold a reference to the memory location. When passed, the address is passed, not a copy.

**Practical consequence:** Modifying a reference object inside a method will change the original. With value types, it won’t.

---

### What is the role of `var` compared to explicit types?

**Answer:** `var` is a keyword that allows the compiler to infer the variable’s type automatically, provided it’s initialized immediately.

**Example:**

```csharp
var name = "Manuel"; // string
var number = 42;     // int
```

It's useful for writing cleaner code, especially with LINQ.  
It’s not synonymous with “weak typing”: the type is still determined at compile-time.

---

### How does exception handling work (try, catch, finally)?

**Answer:**

It's the mechanism for managing errors in a controlled way.

```csharp
try
{
    int x = int.Parse("abc"); // Exception
}
catch (FormatException ex)
{
    Console.WriteLine("Format error.");
}
finally
{
    Console.WriteLine("This part always executes.");
}
```

* **try:** wraps code that might throw an exception  
* **catch:** handles a specific exception (you can have multiple blocks)  
* **finally:** always runs, useful for releasing resources

---

## Object-Oriented Programming (OOP)

---

### Explain inheritance, encapsulation, and polymorphism

**Answer:**

* **Inheritance:** a class can inherit members from a base class (`: BaseClass`), avoiding duplication  
* **Encapsulation:** protects data via visibility (`private`, `protected`, `public`) and exposes it through properties/methods  
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

An interface (`interface`) is a contract that only defines method signatures (no implementation). A class implementing it must define all members.

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

Interfaces are essential for loosely coupled programming, testability, and dependency injection.

---

## Delegates, LINQ, and async

---

### What is a delegate?

**Answer:**

A delegate is a type that represents a reference to a method with a specific signature.  
It allows passing methods as parameters.

```csharp
delegate int Operation(int x, int y);

public static int Add(int a, int b) => a + b;

Operation op = Add;
Console.WriteLine(op(3, 4)); // Output: 7
```

Useful with events, callbacks, and functional programming.

---

### What is LINQ and how is it used?

**Answer:**

LINQ (Language Integrated Query) is a set of methods for querying collections in C# using fluent syntax.

**Example:**

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
var evens = numbers.Where(n => n % 2 == 0).ToList();
```

Works on DB, XML, in-memory objects.  
Allows filtering (`Where`), transformations (`Select`), sorting (`OrderBy`), aggregations (`Sum`, `Count`, etc.)

---

### Explain async, await, and Task

**Answer:**

C# supports asynchronous programming using `async`/`await` to handle non-blocking operations.

```csharp
public async Task<string> GetDataAsync()
{
    await Task.Delay(1000); // Simulate wait
    return "Response ready";
}
```

* **async:** marks the method as asynchronous  
* **await:** suspends execution until the operation completes

Useful for I/O, HTTP calls, DB access, etc.

---

## Data Access

---

### Difference between ADO.NET and Entity Framework

**Answer:**

* **ADO.NET:** manual DB access with `SqlConnection`, `SqlCommand`, etc.  
* **Entity Framework (EF):** ORM that maps objects to tables, simplifies operations

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

### How to protect against SQL Injection?

**Answer:**

Use parameterized queries — never concatenate user input directly:

```csharp
cmd.CommandText = "SELECT * FROM Users WHERE Name = @name";
cmd.Parameters.AddWithValue("@name", userInput);
```

In EF, it’s automatically handled via LINQ.

---

## Best Practices

---

### What is IDisposable and how is it used?

**Answer:** `IDisposable` is an interface that defines the `Dispose()` method for releasing unmanaged resources (e.g. files, DB)

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

* **S - Single Responsibility:** Each class should have one clear responsibility  
* **O - Open/Closed Principle:** Code should be open to extension, closed to modification  
* **L - Liskov Substitution:** Derived classes should be substitutable for base ones without breaking logic  
* **I - Interface Segregation:** Interfaces should be specific, not force implementation of unnecessary methods  
* **D - Dependency Inversion:** Dependencies should be abstract (e.g. via interfaces), not concrete

These principles help write scalable, testable, maintainable code.

---

## Common Practice Exercises

---

### Write a function that sums only even numbers in a list

```csharp
public int SumEven(List<int> numbers)
```
