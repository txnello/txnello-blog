---
title: "Introduction to Flutter & Dart"
slug: "intro-flutter-dart"
snippet: "An introduction to Flutter & Dart"
category: "Programming"
pubDate: 2025-07-17
relatedArticles: ["intro-csharp", "intro-vbnet"]
---

# Introduction to Flutter & Dart

---

### What is Dart and what are its main features?

**Answer:**

Dart is a programming language developed by Google, primarily designed for cross-platform application development with Flutter. Its main features include:

* **Object-oriented:** based on classes and objects, supports inheritance and polymorphism  
* **Null safety:** prevents errors caused by uninitialized variables (`int?` is nullable, `int` is not)  
* **Strong, static typing:** every variable has a well-defined type  
* **Modern, clean syntax:** similar to JavaScript and C#  
* **Asynchronous support** with Future and Stream

---

### What is the difference between var, final, and const?

**Answer:**

* **var:** declares a variable with inferred type, can be reassigned  
* **final:** can be assigned only once, but may reference a mutable object  
* **const:** compile-time constant, immutable and cannot reference non-constant objects  

```dart  
var name = "Manuel";           // can change  
final today = DateTime.now();  // assigned once  
const pi = 3.14;               // pure constant  
```  

---

### How do you define a function with optional parameters and default values?

**Answer:**

```dart  
String greet({String name = "guest"}) {
  return "Hello, $name!";
}
```  

Parameters inside `{}` are **named and optional**.  
Default values can be assigned. Dart also supports optional positional parameters: `[String name]`.

---

### What is the difference between classes and mixins?

**Answer:**

A **class** is the base structure that can be extended (`extends`) or implemented (`implements`).  
A **mixin** allows you to add functionality to a class without using multiple inheritance.

```dart  
mixin Logger {
  void log(String msg) => print("LOG: $msg");
}

class Service with Logger {
  void run() {
    log("Service executed.");
  }
}
```  

Mixins are ideal for reusing logic without creating complex hierarchies.

---

### What are Future, async/await, and Stream?

**Answer:**

* **Future<T>** represents data that will be available in the future (e.g. an HTTP request)  
* **async** marks a function as asynchronous  
* **await** pauses execution until the Future completes  
* **Stream** represents a sequence of asynchronous events (e.g. timers, user input)

```dart  
Future<String> greetLater() async {
  await Future.delayed(Duration(seconds: 1));
  return "Hello after one second!";
}
```  

---

## Flutter concepts

---

### What is the difference between StatelessWidget and StatefulWidget?

**Answer:**

* **StatelessWidget:** immutable UI, does not change over time — ideal for static interfaces  
* **StatefulWidget:** UI that can change state (e.g. counters, user input).  
  It has an associated `State` object that manages dynamic behavior.

```dart  
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text("Immutable");
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
        ElevatedButton(onPressed: increment, child: Text("Increment")),
      ],
    );
  }
}
```  

---

### What is the lifecycle of a StatefulWidget?

**Answer:**

Main lifecycle phases:

* `createState()`: creates the associated state  
* `initState()`: called once at initialization  
* `build()`: called every time the state changes  
* `dispose()`: called when the widget is removed  

It is used to manage resources such as controllers and listeners.

---

### How do you navigate between screens?

**Answer:**

Basic navigation:

```dart  
Navigator.push(context, MaterialPageRoute(
  builder: (context) => SecondPage()));
```  

To go back:

```dart  
Navigator.pop(context);
```  

Named routes:

```dart  
Navigator.pushNamed(context, "/profile");
```  

Routes must be configured in `MaterialApp` → `routes`.

---

### How is state managed in Flutter?

**Answer:**

Flutter offers several approaches:

* `setState()` → basic, for simple local state  
* **Provider** → simple and reactive  
* **Riverpod** → advanced, Provider-based  
* **Bloc** → Stream-based pattern, verbose but scalable  

Companies often choose Provider or Riverpod for simplicity and testability.

---

## Practical questions

---

### How do you create a dynamic scrollable list?

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

Ideal when the list length is dynamic or large.

---

### How do you display an image from the internet?

```dart  
Image.network("https://example.com/img.jpg");
```  

You can also use `Image.asset()` for local images.

---

### How do you add padding and margin?

**Answer:**

* **Padding:** wraps a widget adding internal spacing  
* **Container:** can have `margin`, `padding`, and `decoration`

```dart  
Padding(
  padding: EdgeInsets.all(8.0),
  child: Text("Text"),
)
```  

```dart  
Container(
  margin: EdgeInsets.symmetric(horizontal: 10),
  child: Text("Text with margin"),
)
```  

---

### How do you implement a login screen with validation?

**Answer:**

Use `TextFormField`, `Form`, and `GlobalKey<FormState>()`.  
Validate with `validator` and `formKey.currentState!.validate()`.

```dart  
final _formKey = GlobalKey<FormState>();
String email = "";

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        onChanged: (val) => email = val,
        validator: (val) => val!.contains("@") ? null : "Invalid email",
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            print("Valid login!");
          }
        },
        child: Text("Login"),
      ),
    ],
  ),
);
```  

---

### How do you make HTTP requests?

**Answer:**

Using the `http` or `dio` package.

```dart  
import 'package:http/http.dart' as http;

Future<void> getData() async {
  final response = await http.get(Uri.parse("https://api.example.com/data"));

  if (response.statusCode == 200) {
    print(response.body);
  } else {
    throw Exception("HTTP error");
  }
}
```  

Use `try` / `catch` and handle errors properly.

---

## Package management

---

### What is pubspec.yaml?

**Answer:**

It is the app configuration file for packages and resources.  
It includes:

* Project name  
* Flutter/Dart versions  
* Dependencies (`http`, `provider`, etc.)  
* Assets (images, fonts)

```yaml  
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.0.0
flutter:
  assets:
    - images/
```  

After each change, run `flutter pub get`.
