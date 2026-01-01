---
title: "SOLID"
description: "I principi SOLID."
pubDate: "2025-07-18"
heroImage: '../../assets/solid-principles-cover.jpg'
---

È un acronimo per 5 best practice che aiutano nella programmazione orientata agli oggetti (OOP).  
Creato da Uncle Bob.

---
### **S**ingle responsibility principle (Principio di responsabilità singola)

Le classi devono fare una sola cosa e quindi avere un solo motivo per cambiare.

Ad esempio, se una classe funziona come contenitore di dati, dovrebbe cambiare solo quando cambia la struttura del database. Per esempio, una classe `Book`, che ha parametri che descrivono le varie caratteristiche di un libro, cambia solo se viene modificata la tabella `Book` nel database.

Questo è utile quando ci troviamo di fronte a conflitti di merge, poiché sappiamo immediatamente di cosa si occupa la classe.

#### Esempio di violazione e correzione di SRP

Supponiamo di avere una classe chiamata `Invoice` che, dato un libro e alcuni dati come quantità e prezzo, calcola la ricevuta. Ecco una struttura che viola SRP:

- Proprietà  
- Costruttore  

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

- **calculateTotal** è logica di business (calcola il totale)  
- **printInvoice** è logica di stampa  
- **saveToFile** è logica di persistenza (anche salvare su database o chiamare un’API è persistenza)

Per risolvere: creare tre classi separate, ciascuna con una singola responsabilità.

**Logica di business:**

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

**Logica di stampa:**

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

**Logica di persistenza:**

```java  
public class InvoicePersistence {
    Invoice invoice;

    public InvoicePersistence(Invoice invoice) {
        this.invoice = invoice;
    }

    public void saveToFile(String filename) {
        // Crea un file con il nome fornito e scrive la fattura
    }
}
```

---
### **O**pen-closed principle (Principio aperto/chiuso)

Le classi dovrebbero essere aperte all’estensione ma chiuse alla modifica.

Cioè, classi già testate e deployate non dovrebbero essere modificate. Tuttavia, dovrebbero essere estendibili per aggiungere funzionalità.

Dall’esempio precedente, se volessimo aggiungere il salvataggio su database, invece di modificare `InvoicePersistence` aggiungendo un metodo `saveToDatabase`, potremmo creare un’interfaccia ed estenderla con due classi separate:

```java  
interface InvoicePersistence {
    public void save(Invoice invoice);
}
```

```java  
public class DatabasePersistence implements InvoicePersistence {
    @Override
    public void save(Invoice invoice) {
        // Salva su DB
    }
}
```

```java  
public class FilePersistence implements InvoicePersistence {
    @Override
    public void save(Invoice invoice) {
        // Salva su file
    }
}
```

La nostra interfaccia `InvoicePersistence` funziona come tipo generico per tutte le classi che la implementano.

![[Pasted image 20250701222924.png]]

Ad esempio, se avessimo una classe con la seguente proprietà:

```java  
public class PersistenceManager {
    InvoicePersistence invoicePersistence;
```

Potremmo assegnare sia `DatabasePersistence` sia `FilePersistence` a `invoicePersistence`. È una questione di flessibilità.

---
### **L**iskov substitution principle (Principio di sostituzione di Liskov)

Questo principio prevede che le classi figlie ereditino tutto dalla classe padre e al massimo lo estendano aggiungendo funzionalità.  
Quindi, se passo un oggetto figlio a un metodo che si aspetta un oggetto padre, non dovrebbe comportarsi in modo errato.

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

In questo caso, passare un `Square` come `Rectangle` rompe la funzionalità, perché impostare altezza o larghezza cambia entrambi — cosa che non dovrebbe accadere in un `Rectangle` corretto.

---
### **I**nterface segregation principle (Principio di segregazione delle interfacce)

Mantenere le interfacce separate significa che lo sviluppatore non dovrebbe essere costretto a implementare metodi che non gli servono.  
Pertanto, le interfacce dovrebbero essere opportunamente suddivise.

---
### **D**ependency inversion principle (Principio di inversione delle dipendenze)

I moduli di alto livello non dovrebbero dipendere da quelli di basso livello. Entrambi dovrebbero dipendere da astrazioni.  
Inoltre, le astrazioni non dovrebbero dipendere dai dettagli — i dettagli dovrebbero dipendere dalle astrazioni.

Esempio errato:

```csharp  
class Database {
    public void SaveOrder(Order order) { /* ... */ }
}

class OrderManager {
    private Database db = new Database(); // Dipendenza concreta

    public void Save(Order order) {
        db.SaveOrder(order);
    }
}
```

Esempio corretto:

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
