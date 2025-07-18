---
title: "SOLID"
description: "The SOLID principles."
pubDate: "2025-07-18"
heroImage: '../../assets/solid-principles-cover.jpg'
---

It's an acronym for 5 best practices that help in OOP.  
Created by Uncle Bob.

---
### **S**ingle responsibility principle

Classes must do only one thing and therefore have only one reason to change.

For example, if a class functions as a data container, it should only change when the database structure changes. For instance, a `Book` class, which has parameters describing the various characteristics of a book, changes only if the `Book` table in the database is changed.

This is useful when we encounter merge conflicts, as we immediately know what the class is responsible for.

#### Example of SRP violation and correction

Suppose we have a class called `Invoice`, which, given a book and some data like quantity and price, calculates the receipt. Here's a structure that violates SRP:

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

- **calculateTotal** is Business Logic (calculates the total)  
- **printInvoice** is Printing Logic  
- **saveToFile** is Persistence Logic (also saving to database or calling an API is persistence)

To fix this: create three separate classes each containing a single responsibility.

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

**Print logic:**

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
        // Creates a file with given name and writes the invoice
    }
}
```

---
### **O**pen-closed principle

Classes should be open to extension but closed to modification.

That is, tested and deployed classes should not be modified. However, they should be extendable to add features.

From the previous example, if we wanted to add database saving, instead of modifying `InvoicePersistence` by adding a method `saveToDatabase`, we could create an interface and extend it with two separate classes:

```java  
interface InvoicePersistence {
    public void save(Invoice invoice);
}
```

```java  
public class DatabasePersistence implements InvoicePersistence {
    @Override
    public void save(Invoice invoice) {
        // Save to DB
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

Our `InvoicePersistence` interface works as a generic type for all classes implementing it.

![[Pasted image 20250701222924.png]]

For example, if we had a class with the following property:

```java  
public class PersistenceManager {
    InvoicePersistence invoicePersistence;
```

We could assign both `DatabasePersistence` and `FilePersistence` to `invoicePersistence`. It’s a matter of flexibility.

---
### **L**iskov substitution principle

This principle expects child classes to inherit everything from the parent and at most extend it by adding features. So if I pass a child object to a method that expects a parent object, it shouldn't behave incorrectly.

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

In this case, passing a `Square` as a `Rectangle` breaks functionality, because setting either Height or Width changes both — which shouldn't happen in a proper `Rectangle`.

---
### **I**nterface segregation principle

Keeping interfaces separate means the developer shouldn’t be forced to implement a method they don’t need. Therefore, interfaces should be properly divided.

---
### **D**ependency inversion principle

High-level modules shouldn’t depend on low-level ones. Both should depend on abstractions.  
Moreover, abstractions shouldn’t depend on details — details should depend on abstractions.

Incorrect:

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

Correct:

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