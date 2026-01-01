---
title: "Introduzione a VB.NET"
description: "Introduzione a VB.NET"
pubDate: "2025-07-17"
heroImage: '../../assets/intro-vbnet-cover.jpg'
---

### Differenza tra ByVal e ByRef

**ByVal** passa una copia del valore alla procedura, quindi le modifiche non influenzeranno la variabile originale.

**ByRef** passa un riferimento alla variabile originale, permettendo di modificarla direttamente.

**Esempio pratico:**

Se passi un oggetto ByRef e lo imposti a Nothing all’interno di una Sub, sarà effettivamente distrutto nel contesto chiamante.

---

### Tipizzazione forte e conversioni (CInt(), CStr(), TryParse)

VB.NET è fortemente tipizzato, quindi devi convertire esplicitamente i tipi quando necessario.

* `CInt()`, `CStr()`, ecc. generano eccezioni se la conversione fallisce  
* `TryParse()` evita errori restituendo `True/False` per indicare validità

```vbnet
Dim numero As Integer
If Integer.TryParse("123", numero) Then
    Console.WriteLine(numero)
Else
    Console.WriteLine("Conversione fallita")
End If
```

---

### Controllo del flusso (With, Using, Select Case, Do While)

* `With`: semplifica l’accesso ripetuto ai membri di un oggetto  
* `Using`: garantisce il rilascio automatico delle risorse (es. file, DB)  
* `Select Case`: alternativa a più `If`  
* `Do While / Do Until`: cicli con condizioni pre/post

```vbnet
Using conn As New SqlConnection(connStr)
    conn.Open()
    '...
End Using
```

---

### Differenze tra Module, Class, Structure, Interface

* `Module`: contiene membri condivisi, non può essere istanziato  
* `Class`: tipo riferimento dinamico, supporta l’ereditarietà  
* `Structure`: tipo valore, leggero, adatto per piccoli dati  
* `Interface`: definisce solo le firme dei metodi, da implementare nelle classi concrete

---

## Programmazione orientata agli oggetti in VB.NET

---

### Concetti OOP: ereditarietà, polimorfismo, incapsulamento

* **Ereditarietà**: una classe può estendere un’altra (`Inherits`)  
* **Polimorfismo**: diversi oggetti rispondono a chiamate comuni  
* **Incapsulamento**: nasconde i dati interni usando proprietà e metodi

---

### Costruttori, proprietà, Overloading e Overriding

* Il **costruttore** (`Sub New`) inizializza gli oggetti  
* **Proprietà** (`Property`) incapsulano i campi e l’accesso  
* `Overloads`: più versioni di un metodo con parametri diversi  
* `Overrides`: ridefinisce un metodo ereditato

---

### Differenza tra Overrides e Overloads

* `Overrides`: usato per sovrascrivere un metodo ereditato  
* `Overloads`: definisce più varianti di un metodo con parametri diversi

---

### MustInherit vs NotInheritable

* `MustInherit`: classe astratta, non può essere istanziata, può contenere metodi `MustOverride`  
* `NotInheritable`: non può essere ereditata, utile per classi finali

---

### Uso delle interfacce (Implements)

```vbnet
Public Interface IPrintable
    Sub Print()
End Interface

Public Class Document
    Implements IPrintable

    Public Sub Print() Implements IPrintable.Print
        Console.WriteLine("Documento stampato")
    End Sub
End Class
```

---

### Attributi personalizzati

Gli attributi permettono di decorare classi, metodi o proprietà con metadati.  
Puoi creare un attributo personalizzato ereditando da `System.Attribute`.

---

## Accesso ai dati con ADO.NET

---

### Come connettersi a SQL Server?

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

### Prevenire SQL Injection

```vbnet
cmd.CommandText = "SELECT * FROM Users WHERE Name = @name"
cmd.Parameters.AddWithValue("@name", txtName.Text)
```

Questo protegge dalla manipolazione delle query.

---

### Differenza tra DataSet, DataTable, DataReader

* `DataReader`: accesso forward-only, efficiente  
* `DataTable`: rappresenta una tabella in memoria  
* `DataSet`: contenitore per più `DataTable`, utile per operazioni complesse

---

## Debug e Manutenzione

---

### Come gestire codice legacy spaghetti?

* Analizzare e comprendere la logica  
* Rifattorizzare gradualmente per separare le responsabilità  
* Usare il debugger per testare sezioni isolate  
* Introdurre pattern semplici (es. Repository, Singleton)  
* Scrivere test per prevenire regressioni

---

### Strumenti di debug

* Breakpoint  
* Watch / Autos  
* Immediate Window  
* Call Stack

Strumenti essenziali in Visual Studio per un debug efficace.

---

## Esercizi tipici

---

### Funzione che conta le vocali

```vbnet
Function ContaVocali(input As String) As Integer
    Dim count As Integer = 0
    For Each c As Char In input.ToLower()
        If "aeiou".Contains(c) Then count += 1
    Next
    Return count
End Function
```

---

### Classe Persona con ToString()

```vbnet
Public Class Persona
    Public Property Nome As String
    Public Property Eta As Integer

    Public Sub New(nome As String, eta As Integer)
        Me.Nome = nome
        Me.Eta = eta
    End Sub

    Public Overrides Function ToString() As String
        Return $"{Nome} ha {Eta} anni."
    End Function
End Class
```

---

### Differenza tra Shared e Non-Shared

* `Shared`: appartiene alla classe, accessibile senza creare un’istanza  
* `Non-Shared`: ogni oggetto ha la propria copia  

Utile per metodi di utilità, es.: `Math.Sqrt()`
