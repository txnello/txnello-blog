---
title: "Introduction to Flutter & Dart"
description: "Introduction to Flutter & Dart"
pubDate: "2025-07-17"
heroImage: '../../assets/intro-flutter-dart-cover.jpg'
---

## What is Dart and what are its main features?

**Answer:**

Dart is a programming language developed by Google, primarily designed for cross-platform application development with Flutter. Its main features include:

* **Object-oriented:** based on classes and objects, supporting inheritance and polymorphism  
* **Null safety:** prevents errors from uninitialized variables (`int?` is nullable, `int` is not)  
* **Strong and static typing:** every variable has a well-defined type  
* **Clean and modern syntax:** similar to JavaScript and C#  
* **Asynchronous support** with Future and Stream

---

## What’s the difference between var, final, and const?

**Answer:**

* **var:** declares a variable with inferred type, can be reassigned  
* **final:** can be assigned only once, but its value may be a mutable object  
* **const:** compile-time constant, immutable and cannot reference non-constant objects

```dart
var name = "Manuel";          // can change
final today = DateTime.now(); // one assignment only
const pi = 3.14;              // pure constant
```

---

## How do you define a function with optional and default parameters?

**Answer:**

```dart
String greet({String name = "guest"}) {
  return "Hello, $name!";
}
```

Parameters inside `{}` are named and optional.  
You can assign default values. Dart also supports optional positional parameters: `[String name]`.

---

## What’s the difference between classes and mixins?

**Answer:**

A **class** is the basic structure that can be extended (`extends`) or implemented (`implements`).  
A **mixin** is a way to add functionality to a class without multiple inheritance.

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

Mixins are great for reusing logic without complex hierarchies.

---

## What are Future, async/await, and Stream?

**Answer:**

* **Future<T>** represents data that will be available in the future (e.g. HTTP call)  
* **async** makes a function asynchronous  
* **await** pauses execution until the Future completes  
* **Stream** represents a sequence of async events (e.g. timers, user input)

```dart
Future<String> greetLater() async {
  await Future.delayed(Duration(seconds: 1));
  return "Hello after a second!";
}
```

---

# Flutter Concepts

---

## What’s the difference between StatelessWidget and StatefulWidget?

**Answer:**

* **StatelessWidget:** immutable UI, doesn’t change over time — ideal for static UI  
* **StatefulWidget:** UI that can change state (e.g. counter, input).  
  Has an associated `State` object that handles dynamic behavior.

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

## What is the lifecycle of a StatefulWidget?

**Answer:**

Key lifecycle stages:

* `createState()`: creates associated state  
* `initState()`: called once at start  
* `build()`: called whenever state changes  
* `dispose()`: called when widget is removed

Used to manage resources (e.g. controllers, listeners)

---

## How do you navigate between screens?

**Answer:**

Basic navigation:

```dart
Navigator.push(context, MaterialPageRoute(
  builder: (context) => SecondPage()));
```

Go back:

```dart
Navigator.pop(context);
```

Named routes:

```dart
Navigator.pushNamed(context, "/profile");
```

Routes must be configured in `MaterialApp` → `routes`

---

## How is state managed in Flutter?

**Answer:**

Flutter offers various approaches:

* `setState()` → basic, for small local state  
* **Provider** → simple and reactive  
* **Riverpod** → advanced, based on Provider  
* **Bloc** → Stream-based pattern, verbose but scalable

Companies often use Provider or Riverpod for simplicity and testability.

---

# Practical Questions

---

## How do you create a dynamic scrollable list?

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

Ideal when list length is dynamic or large.

---

## How do you display an image from the network?

```dart
Image.network("https://example.com/img.jpg");
```

You can also use `Image.asset()` for local images.

---

## How do you add padding and margin?

**Answer:**

* **Padding:** wraps a widget and adds internal space  
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

## How do you implement a login screen with validation?

**Answer:**

Use `TextFormField`, `Form`, and `GlobalKey<FormState>()`.  
Validate with `validator` and `formKey.currentState.validate()`

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
            print("Login valid!");
          }
        },
        child: Text("Login"),
      ),
    ],
  ),
);
```

---

## How do you make HTTP requests?

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

Use `try`/`catch` and handle errors properly.

---

# Package Management

---

## What is pubspec.yaml?

**Answer:**

It’s the app’s configuration file for packages and resources.  
Includes:

* Project name  
* Flutter/Dart versions  
* Dependencies (`http`, `provider`, etc.)  
* Assets (images, fonts)

yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.0.0
flutter:
  assets:
    - images/

After modifying it, run `flutter pub get`
