---
title: "Daily Planner"
description: "Organizza la tua giornata con un’app."
techs: ["Flutter", "Dart", "SQFLITE", "SQLITE"]
github: "https://github.com/txnello/daily-planner"
pubDate: "2024-05-05"
heroImage: '../../assets/daily-planner-cover.jpg'
---

### Introduzione
Stavo guardando un video su YouTube di un ragazzo svedese che stava sviluppando la sua app da lanciare sul mercato. A un certo punto ho notato che utilizzava **un quaderno per annotare le attività** della giornata:

![kalle-frame](https://github.com/user-attachments/assets/fb7485eb-6410-40a0-a7ac-fc20ba0ddfb3)

Mi è sembrato strano che non esistesse un’app che permettesse di prendere questo tipo di appunti, così ho iniziato a cercare.

Le app che ho provato potevano essere raggruppate in due categorie: **app che richiedono il login** (e quindi costringono l’utente a creare un account) e **app che contengono troppe funzionalità** rispetto a ciò che stavo realmente cercando: **poter salvare le attività da completare durante la giornata**.

### Panoramica
In termini di tempistiche, questo progetto è durato complessivamente **alcune settimane**, dalla realizzazione dei primi schizzi su carta fino alla pubblicazione su questo sito.

Essendo un progetto personale, non c’era un team di sviluppo, **mi sono occupato personalmente di tutte le fasi del progetto**.

### Idea implementata
Con l’app è possibile **impostare eventi** in qualsiasi data futura, ma visualizzare solo quelli da completare nella data corrente e nel giorno successivo. Questo perché alcune persone (come me) preferiscono pianificare il giorno seguente la sera prima.

**Ogni attività genera una notifica all’orario impostato**, a meno che non sia stata contrassegnata come completata.

![daily-planner2](https://github.com/user-attachments/assets/4f0fabc0-d769-4b60-8282-bf01a5b980f2)
![daily-planner1](https://github.com/user-attachments/assets/28c7f770-54eb-428b-858c-2b81f0d339e8)

### SQLite
Non volevo costringere l’utente a creare un profilo per utilizzare un’applicazione così semplice, quindi ho deciso di usare la **memoria locale** dello smartphone.

Questo implica che, se l’utente elimina l’app, tutto ciò che è stato salvato viene perso definitivamente. Non considero questo un problema bloccante, dato che **l’app è stata pensata per organizzare una singola giornata**, non come calendario personale o come storico delle attività completate.

Per questo tipo di utilizzo, solitamente si usano le **SharedPreferences**, ma non volevo dover ciclare e salvare tutti i dati ogni volta. Per questo motivo ho scelto un’alternativa che consente di **simulare un database SQLite interrogabile direttamente dal codice dell’app**.

<a href="https://pub.dev/packages/sqflite" target="_blank">SQFLITE</a>

### Notifiche
Per le notifiche ho utilizzato il package **flutter_local_notifications**, che permette di **impostare notifiche programmate** per un determinato giorno e a un determinato orario.  
Mi è quindi bastato fare in modo che, alla creazione dell’attività, venisse creato anche questo scheduling per mostrare correttamente la notifica.

<a href="https://pub.dev/packages/flutter_local_notifications" target="_blank">flutter_local_notifications</a>

### Conclusioni
Imparare a utilizzare al meglio la memoria interna di uno smartphone e a gestire le notifiche senza ricorrere a servizi esterni come Firebase o OneSignal **è stato molto formativo e lo terrò sicuramente a mente**.

<a href="https://github.com/txnello/daily-planner/raw/main/apk-daily-planner.apk" target="_blank">Scaricala da GitHub!</a>
