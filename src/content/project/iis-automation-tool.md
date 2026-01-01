---
title: "IIS Automation Tool"
description: "Automatizza le tue applicazioni IIS."
techs: ["VB.NET", ".NET", "WinForms", "Windows"]
github: "https://github.com/txnello/IISAutomationTool"
pubDate: "2024-10-17"
heroImage: '../../assets/iis-automation-tool-cover.jpg'
---

---

> ⚠️ **Avviso**
> 
> Questo strumento è stato sviluppato specificamente per uso interno con due prodotti proprietari chiamati **CRM** e **HDA**. Non è pensato per un utilizzo generico e potrebbe non funzionare correttamente al di fuori di questo contesto.

---

#### **→ <a href="https://drive.google.com/file/d/15C7XP8-kj-J2JI62GUeQtEi-yHSj86QF/view?usp=sharing" target="_blank">Clicca qui per scaricare l’ultima versione!</a> ←**

---

### To-Do List

- Aprire sempre il programma con privilegi di **amministratore** (dalla versione 1.1 dovrebbe già avviarsi in modalità admin; al massimo verifica che sia effettivamente così)
- Creare 2 workspace: uno per CRM e uno per HDA
- Creare 2 applicazioni in IIS, una chiamata “PortalAuto” e l’altra “WSC4Auto”. Il sito web non è rilevante.

![image](https://github.com/user-attachments/assets/6c59461b-439b-48a5-bb6e-b66a16692eca)

### Guida (v1.0)

Scarica il pacchetto e avvia il programma.

Imposta i percorsi per CRM e HDA (in teoria dovrebbero essere ricordati anche dopo la chiusura del programma).

![image 1](https://github.com/user-attachments/assets/d83b3b8c-6035-4494-9f9a-e9368e06487e)

Aggiorna la configurazione dopo aver selezionato l’ambiente e il progetto.

![image 2](https://github.com/user-attachments/assets/bb7cdd26-ddc9-4e71-a673-0c21e5fd18c5)

Successivamente, aggiorna i pool oppure controlla i log.

![image 3](https://github.com/user-attachments/assets/210df665-f6bd-401b-a785-f14a6bd19184)

### Versione 1.1

A partire da questa versione sono stati aggiunti alcuni comandi extra (nello screenshot sono in sola lettura solo perché non avevo voglia di compilare i campi):

![image 4](https://github.com/user-attachments/assets/d284350f-37b6-4a56-a3ef-69c374c953fc)

**Open Portal Error Log Tail**: apre uno script PowerShell che mostra in tempo reale i log di errore del portale;

**Open WSC4 Error Log Tail**: apre uno script PowerShell che mostra in tempo reale i log di errore del WSC;

**Open Portal**: apre il portale del progetto nel browser predefinito (così non è necessario aprire IIS e fare tasto destro > browse);

**Open WSC4**: apre il WSC4 del progetto nel browser predefinito.

#### Notifica quando è disponibile una nuova versione

![image 5](https://github.com/user-attachments/assets/2db778e2-df78-48d0-a96a-a21794fe2d88)

#### Riduzione a icona nell’area di sistema (tray)

![image 6](https://github.com/user-attachments/assets/704df417-5e5b-4e0e-ae6e-7815e5a5d750)

![image 7](https://github.com/user-attachments/assets/3c1a7cc2-d162-4325-b8aa-7c5dea281e44)

#### Popup di errore

![image 8](https://github.com/user-attachments/assets/90e5fc5c-0659-4c5d-8c35-f3a29686ac82)

#### Popup di successo

![image 9](https://github.com/user-attachments/assets/29b3286d-f29d-431c-aba3-de28d402e782)

#### Separatore “magico”

![image 10](https://github.com/user-attachments/assets/8464f813-323c-46fd-a67b-cbe5969b0d01)

#### Rimossa la possibilità di ridimensionare la finestra

![image 11](https://github.com/user-attachments/assets/880bd4f1-0820-4f9d-853d-ae7af4a50f8b)

### Versione 1.2

Aggiunti gli script che mancavano nelle versioni precedenti 🙂
