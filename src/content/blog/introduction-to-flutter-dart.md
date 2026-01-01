---
title: "Introduzione a Flutter & Dart"
description: "Introduzione a Flutter & Dart"
pubDate: "2025-07-17"
heroImage: '../../assets/intro-flutter-dart-cover.jpg'
---

### Cos’è Dart e quali sono le sue principali caratteristiche?

**Risposta:**

Dart è un linguaggio di programmazione sviluppato da Google, progettato principalmente per lo sviluppo di applicazioni cross-platform con Flutter. Le sue caratteristiche principali includono:

* **Orientato agli oggetti:** basato su classi e oggetti, supporta ereditarietà e polimorfismo  
* **Null safety:** previene errori da variabili non inizializzate (`int?` è nullable, `int` no)  
* **Tipizzazione forte e statica:** ogni variabile ha un tipo ben definito  
* **Sintassi moderna e pulita:** simile a JavaScript e C#  
* **Supporto asincrono** con Future e Stream

---

### Qual è la differenza tra var, final e const?

**Risposta:**

* **var:** dichiara una variabile con tipo inferito, può essere riassegnata  
* **final:** può essere assegnata solo una volta, ma il suo valore può essere un oggetto mutabile  
* **const:** costante a compile-time, immutabile e non può fare riferimento a oggetti non costanti

```dart
var name = "Manuel";          // può cambiare
final today = DateTime.now(); // assegnazione unica
const pi = 3.14;              // costante pura
```

---

### Come definire una funzione con parametri opzionali e valori di default?

**Risposta:**

```dart
String greet({String name = "guest"}) {
  return "Ciao, $name!";
}
```

I parametri all’interno di `{}` sono **nominali e opzionali**.  
È possibile assegnare valori di default. Dart supporta anche parametri posizionali opzionali: `[String name]`.

---

### Qual è la differenza tra classi e mixin?

**Risposta:**

Una **classe** è la struttura base che può essere estesa (`extends`) o implementata (`implements`).  
Un **mixin** permette di aggiungere funzionalità a una classe senza usare l’ereditarietà multipla.

```dart
mixin Logger {
  void log(String msg) => print("LOG: $msg");
}

class Service with Logger {
  void run() {
    log("Servizio eseguito.");
  }
}
```

I mixin sono ottimi per riutilizzare logica senza creare gerarchie complesse.

---

### Cos’è Future, async/await e Stream?

**Risposta:**

* **Future<T>** rappresenta dati che saranno disponibili in futuro (es. chiamata HTTP)  
* **async** rende una funzione asincrona  
* **await** sospende l’esecuzione finché il Future non è completato  
* **Stream** rappresenta una sequenza di eventi asincroni (es. timer, input utente)

```dart
Future<String> greetLater() async {
  await Future.delayed(Duration(seconds: 1));
  return "Ciao dopo un secondo!";
}
```

---

## Concetti Flutter

---

### Qual è la differenza tra StatelessWidget e StatefulWidget?

**Risposta:**

* **StatelessWidget:** UI immutabile, non cambia nel tempo — ideale per interfacce statiche  
* **StatefulWidget:** UI che può cambiare stato (es. contatore, input).  
  Ha un oggetto `State` associato che gestisce il comportamento dinamico.

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text("Immutabile");
  }
}

class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int value = 0;

  void increment() {
    setState(() {
      value++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("$value"),
        ElevatedButton(onPressed: increment, child: Text("Incrementa")),
      ],
    );
  }
}
```

---

### Qual è il ciclo di vita di un StatefulWidget?

**Risposta:**

Principali fasi del ciclo di vita:

* `createState()`: crea lo stato associato  
* `initState()`: chiamato una volta all’inizio  
* `build()`: chiamato ogni volta che lo stato cambia  
* `dispose()`: chiamato quando il widget viene rimosso

Serve per gestire risorse (es. controller, listener)

---

### Come si naviga tra schermate?

**Risposta:**

Navigazione base:

```dart
Navigator.push(context, MaterialPageRoute(
  builder: (context) => SecondPage()));
```

Per tornare indietro:

```dart
Navigator.pop(context);
```

Rotte nominate:

```dart
Navigator.pushNamed(context, "/profile");
```

Le rotte devono essere configurate in `MaterialApp` → `routes`.

---

### Come si gestisce lo stato in Flutter?

**Risposta:**

Flutter offre vari approcci:

* `setState()` → base, per stato locale semplice  
* **Provider** → semplice e reattivo  
* **Riverpod** → avanzato, basato su Provider  
* **Bloc** → pattern basato su Stream, verboso ma scalabile

Le aziende spesso scelgono Provider o Riverpod per semplicità e testabilità.

---

## Domande pratiche

---

### Come creare una lista dinamica scrollabile?

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index]),
    );
  },
);
```

Ideale quando la lunghezza della lista è dinamica o grande.

---

### Come mostrare un’immagine da Internet?

```dart
Image.network("https://example.com/img.jpg");
```

Si può anche usare `Image.asset()` per immagini locali.

---

### Come aggiungere padding e margin?

**Risposta:**

* **Padding:** avvolge un widget aggiungendo spazio interno  
* **Container:** può avere `margin`, `padding` e `decoration`

```dart
Padding(
  padding: EdgeInsets.all(8.0),
  child: Text("Testo"),
)
```

```dart
Container(
  margin: EdgeInsets.symmetric(horizontal: 10),
  child: Text("Testo con margin"),
)
```

---

### Come implementare una schermata di login con validazione?

**Risposta:**

Usare `TextFormField`, `Form` e `GlobalKey<FormState>()`.  
Validare con `validator` e `formKey.currentState!.validate()`.

```dart
final _formKey = GlobalKey<FormState>();
String email = "";
Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        onChanged: (val) => email = val,
        validator: (val) => val!.contains("@") ? null : "Email non valida",
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            print("Login valido!");
          }
        },
        child: Text("Login"),
      ),
    ],
  ),
);
```

---

### Come effettuare richieste HTTP?

**Risposta:**

Usando il pacchetto `http` o `dio`.

```dart
import 'package:http/http.dart' as http;

Future<void> getData() async {
  final response = await http.get(Uri.parse("https://api.example.com/data"));

  if (response.statusCode == 200) {
    print(response.body);
  } else {
    throw Exception("Errore HTTP");
  }
}
```

Usare `try`/`catch` e gestire correttamente gli errori.

---

## Gestione dei pacchetti

---

### Cos’è pubspec.yaml?

**Risposta:**

È il file di configurazione dell’app per pacchetti e risorse.  
Include:

* Nome progetto  
* Versioni Flutter/Dart  
* Dipendenze (`http`, `provider`, ecc.)  
* Risorse (immagini, font)

yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.0.0
flutter:
  assets:
    - images/

Dopo ogni modifica, eseguire `flutter pub get`
