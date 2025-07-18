---
title: "IIS Automation Tool"
description: "Automate your IIS apps."
techs: ["VB.NET", ".NET", "WinForms", "Windows"]
github: "https://github.com/txnello/IISAutomationTool"
pubDate: "2024-10-17"
heroImage: '../../assets/iis-automation-tool-cover.jpg'
---

---

> ⚠️ **Warning**
> 
> This tool has been specifically developed for internal use with two proprietary products named **CRM** and **HDA**. It is not intended for general-purpose use and may not function correctly outside of this context.

---

### **→ <a href="https://drive.google.com/file/d/15C7XP8-kj-J2JI62GUeQtEi-yHSj86QF/view?usp=sharing" target="_blank">Click here to download the latest version!</a> ←**

---

## To-Do List

- Always open the program with **administrator** privileges (from version 1.1 it should already open in admin mode, at most just make sure that’s actually the case)
- Create 2 workspaces: one for CRM and one for HDA
- Create 2 applications in IIS, one called “PortalAuto” and the other “WSC4Auto”. The website is not relevant.

![image](https://github.com/user-attachments/assets/6c59461b-439b-48a5-bb6e-b66a16692eca)

## Guide (v1.0)

Download the package and launch the program.

Set the paths for CRM and HDA (in theory, it should remember them if the program is closed).

![image 1](https://github.com/user-attachments/assets/d83b3b8c-6035-4494-9f9a-e9368e06487e)

Update the configuration after selecting the environment and the project.

![image 2](https://github.com/user-attachments/assets/bb7cdd26-ddc9-4e71-a673-0c21e5fd18c5)

Then, refresh the pools or check the logs.

![image 3](https://github.com/user-attachments/assets/210df665-f6bd-401b-a785-f14a6bd19184)

## Version 1.1

Starting from this version, some extra commands have been added (in the screenshot they are read-only just because I didn’t feel like filling in the fields):

![image 4](https://github.com/user-attachments/assets/d284350f-37b6-4a56-a3ef-69c374c953fc)

**Open Portal Error Log Tail**: opens a PowerShell script that tails the error logs of the portal;

**Open WSC4 Error Log Tail**: opens a PowerShell script that tails the error logs of the WSC;

**Open Portal**: opens the project portal in the default browser (so you don’t have to open IIS and right-click > browse);

**Open WSC4**: opens the WSC4 of the project in the default browser.

### Notification when a new version is available

![image 5](https://github.com/user-attachments/assets/2db778e2-df78-48d0-a96a-a21794fe2d88)

### Minimize to tray area

![image 6](https://github.com/user-attachments/assets/704df417-5e5b-4e0e-ae6e-7815e5a5d750)

![image 7](https://github.com/user-attachments/assets/3c1a7cc2-d162-4325-b8aa-7c5dea281e44)

### Error popups

![image 8](https://github.com/user-attachments/assets/90e5fc5c-0659-4c5d-8c35-f3a29686ac82)

### Success popups

![image 9](https://github.com/user-attachments/assets/29b3286d-f29d-431c-aba3-de28d402e782)

### Magic separator

![image 10](https://github.com/user-attachments/assets/8464f813-323c-46fd-a67b-cbe5969b0d01)

### Removed the ability to resize the window

![image 11](https://github.com/user-attachments/assets/880bd4f1-0820-4f9d-853d-ae7af4a50f8b)

## Version 1.2

Added scripts that were missing in previous versions 🙂
