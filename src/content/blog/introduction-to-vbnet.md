---
title: "Introduction to VB.NET"
description: "Introduction to VB.NET"
pubDate: "2025-07-17"
heroImage: '../../assets/intro-vbnet-cover.jpg'
---

### Difference between ByVal and ByRef

**ByVal** passes a copy of the value to the procedure, so changes won’t affect the original variable.

**ByRef** passes a reference to the original variable, allowing it to be modified directly.

**Practical example:**

If you pass an object ByRef and set it to Nothing inside a Sub, it will actually be destroyed in the calling context.

---

### Strong typing and conversions (CInt(), CStr(), TryParse)

VB.NET is strongly typed, so you must explicitly convert types when needed.

* `CInt()`, `CStr()`, etc. throw exceptions if conversion fails  
* `TryParse()` avoids errors by returning `True/False` to indicate validity

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

* `With`: simplifies repeated access to object members  
* `Using`: ensures automatic disposal of resources (e.g. files, DB)  
* `Select Case`: alternative to multiple `If`  
* `Do While / Do Until`: loops with pre/post conditions

```vbnet
Using conn As New SqlConnection(connStr)
    conn.Open()
    '...
End Using
```

---

### Differences between Module, Class, Structure, Interface

* `Module`: contains shared members, cannot be instantiated  
* `Class`: dynamic reference type, supports inheritance  
* `Structure`: value type, lighter, good for small data  
* `Interface`: only defines method signatures, to be implemented by concrete classes

---

## Object-Oriented Programming in VB.NET

---

### OOP concepts: inheritance, polymorphism, encapsulation

* **Inheritance**: a class can extend another (`Inherits`)  
* **Polymorphism**: different objects respond to common calls  
* **Encapsulation**: hides internal data using properties and methods

---

### Constructors, properties, Overloading and Overriding

* The **constructor** (`Sub New`) initializes objects  
* **Properties** (`Property`) encapsulate field and access  
* `Overloads`: multiple versions of a method with different parameters  
* `Overrides`: redefines an inherited method

---

### Difference between Overrides and Overloads

* `Overrides`: used to override an inherited method  
* `Overloads`: defines multiple variants of a method with different parameters

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

Attributes allow decorating classes, methods, or properties with metadata.  
You can create a custom attribute by inheriting from `System.Attribute`.

---

## Data Access with ADO.NET

---

### How to connect to SQL Server?

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

This protects against query manipulation.

---

### Difference between DataSet, DataTable, DataReader

* `DataReader`: forward-only access, efficient  
* `DataTable`: represents an in-memory table  
* `DataSet`: container for multiple `DataTable`, useful for complex operations

---

## Debugging and Maintenance

---

### How do you handle spaghetti legacy code?

* Analyze and understand the logic  
* Gradually refactor to separate responsibilities  
* Use debugger to test isolated sections  
* Introduce simple patterns (e.g. Repository, Singleton)  
* Write tests to prevent regressions

---

### Debugging tools

* Breakpoints  
* Watch / Autos  
* Immediate Window  
* Call Stack

Essential tools in Visual Studio for effective debugging.

---

## Typical Exercises

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

### Persona class with ToString()

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

Useful for utility methods, e.g.: `Math.Sqrt()`
