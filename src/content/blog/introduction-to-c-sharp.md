---
title: "Introduzione a C#"
description: "Introduzione a C#"
pubDate: "2025-07-17"
heroImage: '../../assets/intro-csharp-cover.jpg'
---

### Qual è la differenza tra tipi valore e tipi riferimento?

**Risposta:**

In C#, i tipi sono divisi in:

* **Tipi valore** (es. `int`, `double`, `bool`, `struct`): contengono direttamente il valore. Quando vengono passati come argomenti a una funzione, il valore viene copiato.
* **Tipi riferimento** (es. `class`, `string`, `object`, `array`): contengono un riferimento alla posizione di memoria. Quando vengono passati, viene passato l’indirizzo, non una copia.

**Conseguenza pratica:** modificare un oggetto di tipo riferimento dentro un metodo cambia l’originale. Con i tipi valore, no.

---

### Qual è il ruolo di `var` rispetto ai tipi espliciti?

**Risposta:** `var` permette al compilatore di inferire automaticamente il tipo della variabile, purché venga inizializzata immediatamente.

**Esempio:**

```csharp
var name = "Manuel"; // string
var number = 42;     // int
```

Utile per scrivere codice più pulito, soprattutto con LINQ.  
Non è sinonimo di “tipizzazione debole”: il tipo viene comunque determinato a compile-time.

---

### Come funziona la gestione delle eccezioni (try, catch, finally)?

**Risposta:** 

È il meccanismo per gestire gli errori in modo controllato.

```csharp
try
{
    int x = int.Parse("abc"); // Genera eccezione
}
catch (FormatException ex)
{
    Console.WriteLine("Errore di formato.");
}
finally
{
    Console.WriteLine("Questa parte viene sempre eseguita.");
}
```

* **try:** racchiude il codice che può generare eccezioni  
* **catch:** gestisce una specifica eccezione (possono esserci più blocchi)  
* **finally:** viene sempre eseguito, utile per rilasciare risorse

---

## Programmazione Orientata agli Oggetti (OOP)

---

### Spiega ereditarietà, incapsulamento e polimorfismo

**Risposta:**

* **Ereditarietà:** una classe può ereditare membri da una base (`: BaseClass`), evitando duplicazioni  
* **Incapsulamento:** protegge i dati tramite visibilità (`private`, `protected`, `public`) e li espone tramite proprietà/metodi  
* **Polimorfismo:** lo stesso metodo si comporta diversamente a seconda dell’istanza. Si ottiene con `virtual`, `override` o interfacce

**Esempio:**

```csharp
public class Animal
{
    public virtual void Sound() => Console.WriteLine("Suono generico");
}

public class Dog : Animal
{
    public override void Sound() => Console.WriteLine("Bau");
}
```

---

### Differenza tra abstract, virtual, override, sealed

**Risposta:**

* **abstract:** obbliga le classi derivate a implementare il metodo  
* **virtual:** definisce un metodo che può essere sovrascritto  
* **override:** ridefinisce un metodo virtuale o astratto  
* **sealed:** impedisce ulteriori override o ereditarietà

**Esempio:**

```csharp
public abstract class Vehicle
{
    public abstract void Move();
}

public class Car : Vehicle
{
    public override void Move() => Console.WriteLine("L’auto si muove");
}
```

---

### Cosa sono le interfacce in C#?

**Risposta:**

Un’interfaccia (`interface`) è un contratto che definisce solo le firme dei metodi (nessuna implementazione). Una classe che la implementa deve definire tutti i membri.

```csharp
public interface IPrintable
{
    void Print();
}

public class Document : IPrintable
{
    public void Print()
    {
        Console.WriteLine("Stampato");
    }
}
```

Le interfacce sono essenziali per codice loosely coupled, testabilità e dependency injection.

---

## Delegati, LINQ e async

---

### Cos’è un delegate?

**Risposta:**

Un delegate è un tipo che rappresenta un riferimento a un metodo con una firma specifica.  
Permette di passare metodi come parametri.

```csharp
delegate int Operation(int x, int y);

public static int Add(int a, int b) => a + b;

Operation op = Add;
Console.WriteLine(op(3, 4)); // Output: 7
```

Utile per eventi, callback e programmazione funzionale.

---

### Cos’è LINQ e come si usa?

**Risposta:**

LINQ (Language Integrated Query) è un insieme di metodi per interrogare collezioni in C# usando sintassi fluente.

**Esempio:**

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
var evens = numbers.Where(n => n % 2 == 0).ToList();
```

Funziona su DB, XML, oggetti in memoria.  
Permette filtraggio (`Where`), trasformazioni (`Select`), ordinamento (`OrderBy`), aggregazioni (`Sum`, `Count`), ecc.

---

### Spiega async, await e Task

**Risposta:**

C# supporta la programmazione asincrona con `async`/`await` per operazioni non bloccanti.

```csharp
public async Task<string> GetDataAsync()
{
    await Task.Delay(1000); // Simula attesa
    return "Risposta pronta";
}
```

* **async:** indica che il metodo è asincrono  
* **await:** sospende l’esecuzione finché l’operazione non termina

Utile per I/O, chiamate HTTP, accesso DB, ecc.

---

## Accesso ai dati

---

### Differenza tra ADO.NET e Entity Framework

**Risposta:**

* **ADO.NET:** accesso manuale al DB con `SqlConnection`, `SqlCommand`, ecc.  
* **Entity Framework (EF):** ORM che mappa oggetti su tabelle, semplifica le operazioni

**Esempio ADO.NET:**

```csharp
using var conn = new SqlConnection(connString);
conn.Open();
var cmd = new SqlCommand("SELECT * FROM Clients", conn);
using var reader = cmd.ExecuteReader();
```

**Esempio EF:**

```csharp
var clients = context.Clients.Where(c => c.Active).ToList();
```

---

### Come proteggersi da SQL Injection?

**Risposta:**

Usare query parametrizzate — mai concatenare direttamente input dell’utente:

```csharp
cmd.CommandText = "SELECT * FROM Users WHERE Name = @name";
cmd.Parameters.AddWithValue("@name", userInput);
```

In EF è gestito automaticamente tramite LINQ.

---

## Best Practices

---

### Cos’è IDisposable e come si usa?

**Risposta:** `IDisposable` è un’interfaccia che definisce il metodo `Dispose()` per liberare risorse non gestite (es. file, DB)

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

Con `using`, `Dispose()` viene chiamato automaticamente.

---

### Quali sono i principi SOLID?

**Risposta:**

* **S - Single Responsibility:** ogni classe deve avere una responsabilità chiara  
* **O - Open/Closed Principle:** il codice deve essere aperto all’estensione, chiuso alla modifica  
* **L - Liskov Substitution:** le classi derivate devono poter sostituire le base senza rompere la logica  
* **I - Interface Segregation:** le interfacce devono essere specifiche, senza forzare implementazioni non necessarie  
* **D - Dependency Inversion:** le dipendenze devono essere astratte (es. tramite interfacce), non concrete

Aiutano a scrivere codice scalabile, testabile e manutenibile.

---

## Esercizi pratici

---

### Scrivere una funzione che somma solo i numeri pari in una lista

```csharp
public int SumEven(List<int> numbers)
{
    return numbers.Where(n => n % 2 == 0).Sum();
}
```
