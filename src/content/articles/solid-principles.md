---
title: "SOLID"
slug: "solid-principles"
snippet: "The SOLID principles"
category: "Programming"
pubDate: 2025-07-18
---

# SOLID

---

SOLID is an acronym for five best practices that support object-oriented programming (OOP).  
It was introduced by Robert C. Martin (Uncle Bob).

---
### **S**ingle Responsibility Principle

A class should have one, and only one, reason to change.

For example, if a class acts as a data container, it should change only when the database structure changes. A `Book` class that holds properties describing a book should be modified only if the corresponding `Book` table changes in the database.

This becomes especially useful during merge conflicts, because the responsibility of the class is immediately clear.

#### SRP violation and refactoring example

Suppose we have a class called `Invoice` that calculates a receipt based on a book, quantity, and pricing data. The following structure violates SRP:

- Properties  
- Constructor  

```java  
public double calculateTotal() {  
    ...  
}  

public void printInvoice() {  
    ...  
}  

public void saveToFile(String filename) {  
    ...  
}  
```  

- **calculateTotal** contains business logic  
- **printInvoice** handles presentation logic  
- **saveToFile** handles persistence logic (saving to a database or calling an API is also persistence)

To fix this, responsibilities should be split into separate classes.

**Business logic:**

```java  
public class Invoice {

    private Book book;
    private int quantity;
    private double discountRate;
    private double taxRate;
    private double total;

    public Invoice(Book book, int quantity, double discountRate, double taxRate) {
        this.book = book;
        this.quantity = quantity;
        this.discountRate = discountRate;
        this.taxRate = taxRate;
        this.total = this.calculateTotal();
    }

    public double calculateTotal() {
        double price = ((book.price - book.price * discountRate) * this.quantity);
        double priceWithTaxes = price * (1 + taxRate);
        return priceWithTaxes;
    }
}
```  

**Printing logic:**

```java  
public class InvoicePrinter {
    private Invoice invoice;

    public InvoicePrinter(Invoice invoice) {
        this.invoice = invoice;
    }

    public void print() {
        System.out.println(invoice.quantity + "x " + invoice.book.name + " " + invoice.book.price + " $");
        System.out.println("Discount Rate: " + invoice.discountRate);
        System.out.println("Tax Rate: " + invoice.taxRate);
        System.out.println("Total: " + invoice.total + " $");
    }
}
```  

**Persistence logic:**

```java  
public class InvoicePersistence {
    Invoice invoice;

    public InvoicePersistence(Invoice invoice) {
        this.invoice = invoice;
    }

    public void saveToFile(String filename) {
        // Creates a file and writes the invoice
    }
}
```  

---
### **O**pen–Closed Principle

Software entities should be open for extension, but closed for modification.

Classes that are already tested and deployed should not be changed. Instead, their behavior should be extended through abstraction.

Continuing the previous example, if we want to add database persistence, instead of modifying `InvoicePersistence`, we can define an interface and implement it with different strategies:

```java  
interface InvoicePersistence {
    void save(Invoice invoice);
}
```  

```java  
public class DatabasePersistence implements InvoicePersistence {
    @Override
    public void save(Invoice invoice) {
        // Save to database
    }
}
```  

```java  
public class FilePersistence implements InvoicePersistence {
    @Override
    public void save(Invoice invoice) {
        // Save to file
    }
}
```  

The `InvoicePersistence` interface acts as a generic abstraction for all persistence implementations.

For example:

```java  
public class PersistenceManager {
    InvoicePersistence invoicePersistence;
}
```  

Both `DatabasePersistence` and `FilePersistence` can be assigned to `invoicePersistence`, providing flexibility without modification.

---
### **L**iskov Substitution Principle

Subtypes must be substitutable for their base types without altering the correctness of the program.

In other words, if a method expects a base class, passing a derived class should not cause unexpected behavior.

```csharp  
class Rectangle {
    public virtual int Width { get; set; }
    public virtual int Height { get; set; }

    public int CalculateArea() => Width * Height;
}

class Square : Rectangle {
    public override int Width {
        set {
            base.Width = value;
            base.Height = value;
        }
    }
    public override int Height {
        set {
            base.Width = value;
            base.Height = value;
        }
    }
}
```  

In this case, passing a `Square` where a `Rectangle` is expected breaks correctness, because setting either width or height changes both — a behavior that should not exist in a proper rectangle.

---
### **I**nterface Segregation Principle

Clients should not be forced to depend on methods they do not use.

Interfaces should be small, focused, and split according to actual usage, so that implementations remain clean and intentional.

---
### **D**ependency Inversion Principle

High-level modules should not depend on low-level modules. Both should depend on abstractions.  
Abstractions should not depend on details; details should depend on abstractions.

Incorrect example:

```csharp  
class Database {
    public void SaveOrder(Order order) { /* ... */ }
}

class OrderManager {
    private Database db = new Database(); // Concrete dependency

    public void Save(Order order) {
        db.SaveOrder(order);
    }
}
```  

Correct example:

```csharp  
interface IOrderRepository {
    void Save(Order order);
}

class Database : IOrderRepository {
    public void Save(Order order) { /* ... */ }
}

class OrderManager {
    private readonly IOrderRepository repository;

    public OrderManager(IOrderRepository repository) {
        this.repository = repository;
    }

    public void Save(Order order) {
        repository.Save(order);
    }
}
```  
