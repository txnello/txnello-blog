---
title: "Introduction to VB.NET"
slug: "intro-vbnet"
snippet: "An introduction to VB.NET"
category: "Programming"
pubDate: 2025-07-17
relatedArticles: ["intro-flutter-dart", "intro-csharp"]
---

# Introduction to VB.NET

---

### Difference between ByVal and ByRef

**ByVal** passes a copy of the value to the procedure, so any changes will not affect the original variable.

**ByRef** passes a reference to the original variable, allowing it to be modified directly.

**Practical example:**

If you pass an object ByRef and set it to Nothing inside a Sub, it will effectively be destroyed in the calling context.

---

### Strong typing and conversions (CInt(), CStr(), TryParse)

VB.NET is strongly typed, so types must be explicitly converted when required.

* `CInt()`, `CStr()`, etc. throw exceptions if the conversion fails  
* `TryParse()` avoids runtime errors by returning `True` or `False` to indicate validity  

```vbnet  
Dim numero As Integer
If Integer.TryParse("123", numero) Then
    Console.WriteLine(numero)
Else
    Console.WriteLine("Conversion failed")
End If
```  

---

### Flow control (With, Using, Select Case, Do While)

* `With`: simplifies repeated access to an object's members  
* `Using`: guarantees automatic resource disposal (e.g. files, databases)  
* `Select Case`: alternative to multiple `If` statements  
* `Do While / Do Until`: loops with pre/post conditions  

```vbnet  
Using conn As New SqlConnection(connStr)
    conn.Open()
    '...
End Using
```  

---

### Differences between Module, Class, Structure, and Interface

* `Module`: contains shared members, cannot be instantiated  
* `Class`: reference type, dynamic, supports inheritance  
* `Structure`: value type, lightweight, suitable for small data objects  
* `Interface`: defines method signatures only, to be implemented by concrete classes  

---

## Object-oriented programming in VB.NET

---

### OOP concepts: inheritance, polymorphism, encapsulation

* **Inheritance**: a class can extend another (`Inherits`)  
* **Polymorphism**: different objects respond to the same method calls  
* **Encapsulation**: hides internal data using properties and methods  

---

### Constructors, properties, overloading, and overriding

* The **constructor** (`Sub New`) initializes objects  
* **Properties** (`Property`) encapsulate fields and access logic  
* `Overloads`: multiple versions of a method with different parameters  
* `Overrides`: redefines an inherited method  

---

### Difference between Overrides and Overloads

* `Overrides`: used to replace an inherited method  
* `Overloads`: defines multiple method variants with different parameters  

---

### MustInherit vs NotInheritable

* `MustInherit`: abstract class, cannot be instantiated, may contain `MustOverride` methods  
* `NotInheritable`: cannot be inherited, useful for final classes  

---

### Using interfaces (Implements)

```vbnet  
Public Interface IPrintable
    Sub Print()
End Interface

Public Class Document
    Implements IPrintable

    Public Sub Print() Implements IPrintable.Print
        Console.WriteLine("Document printed")
    End Sub
End Class
```  

---

### Custom attributes

Attributes allow you to decorate classes, methods, or properties with metadata.  
You can create a custom attribute by inheriting from `System.Attribute`.

---

## Data access with ADO.NET

---

### How do you connect to SQL Server?

```vbnet  
Using conn As New SqlConnection("your_conn_string")
    conn.Open()
    Dim cmd As New SqlCommand("SELECT * FROM Users", conn)
    Using reader = cmd.ExecuteReader()
        While reader.Read()
            Console.WriteLine(reader("Name"))
        End While
    End Using
End Using
```  

---

### Preventing SQL Injection

```vbnet  
cmd.CommandText = "SELECT * FROM Users WHERE Name = @name"
cmd.Parameters.AddWithValue("@name", txtName.Text)
```  

This protects queries from manipulation.

---

### Difference between DataSet, DataTable, and DataReader

* `DataReader`: forward-only access, highly efficient  
* `DataTable`: represents an in-memory table  
* `DataSet`: container for multiple `DataTable` objects, useful for complex operations  

---

## Debugging and maintenance

---

### How do you deal with legacy spaghetti code?

* Analyze and understand the existing logic  
* Gradually refactor to separate responsibilities  
* Use the debugger to test isolated sections  
* Introduce simple patterns (e.g. Repository, Singleton)  
* Write tests to prevent regressions  

---

### Debugging tools

* Breakpoints  
* Watch / Autos  
* Immediate Window  
* Call Stack  

Essential Visual Studio tools for effective debugging.

---

## Typical exercises

---

### Function that counts vowels

```vbnet  
Function CountVowels(input As String) As Integer
    Dim count As Integer = 0
    For Each c As Char In input.ToLower()
        If "aeiou".Contains(c) Then count += 1
    Next
    Return count
End Function
```  

---

### Person class with ToString()

```vbnet  
Public Class Person
    Public Property Name As String
    Public Property Age As Integer

    Public Sub New(name As String, age As Integer)
        Me.Name = name
        Me.Age = age
    End Sub

    Public Overrides Function ToString() As String
        Return $"{Name} is {Age} years old."
    End Function
End Class
```  

---

### Difference between Shared and Non-Shared

* `Shared`: belongs to the class, accessible without creating an instance  
* `Non-Shared`: each object has its own copy  

Useful for utility methods, e.g. `Math.Sqrt()`.
