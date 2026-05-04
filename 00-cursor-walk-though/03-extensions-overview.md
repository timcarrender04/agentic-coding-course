# Lesson 03: Extensions Overview

**Time:** ~15 min

## What is an extension?

An **extension** is a plugin that adds features to Cursor. Cursor by itself is a general-purpose IDE. Extensions specialize it: an extension might add Python support, or a Docker sidebar, or a way to connect to a remote computer. You install only the ones you need.

Extensions are made by Microsoft, by community developers, and by companies. The big public list of all extensions is the **marketplace**.

## Demo: open the marketplace

1. Click the **Extensions** icon in the activity bar (the four squares with one floating away).
   - Or press **`Ctrl+Shift+X`**.
2. The side bar fills with a search box and a list of popular extensions.

## The buttons on an extension

Click any extension in the list. The right-hand pane shows its details: description, version, publisher, screenshots.

The button next to the extension name does one of three things depending on its state:

- **Install** — extension isn't installed yet. Click to install.
- **Uninstall** — extension is installed. Click to remove it.
- **Disable** — extension is installed and turned on. Click to turn it off without removing it. Useful when an extension is misbehaving but you'll want it back.

Always look at the **publisher** under the extension name before installing. There are sometimes multiple extensions with the same name. Trusted publishers for this course: **Microsoft**, **Anysphere** (Cursor's own publisher), and the language/tool's official organization (e.g. `dbaeumer` for ESLint, `ms-python` for Python).

## Course-recommended extensions

For this course you will install these. We'll install some now and some in later lessons of this module:

| Extension | Publisher | Lesson | Purpose |
|---|---|---|---|
| Python | Microsoft (`ms-python`) | this lesson | Language support for Python |
| Docker | Microsoft (`ms-azuretools`) | lesson 04 | Sidebar for inspecting containers |
| WSL | Microsoft (`ms-vscode-remote`) | lesson 05 (Windows only) | Connect Cursor to WSL |
| Remote - SSH | Microsoft (`ms-vscode-remote`) | lesson 06 | Connect Cursor to a remote machine |

> Don't install random extensions today. Stick to the list above. We'll revisit extensions for actual work in later modules.

## Try it yourself: install Python

1. Open the extensions side bar (`Ctrl+Shift+X`).
2. In the search box at the top, type **Python**.
3. The first result should be "Python" by Microsoft. Verify the publisher says **Microsoft** before clicking.
4. Click **Install**.
5. After a few seconds, the button changes to a gear/disable icon — that means it installed.
6. Scroll the side bar down to the **INSTALLED** section. You should see "Python" listed there.

## Disabling and uninstalling

You won't do this today, but for reference:

- To turn an extension off temporarily: open the extensions side bar, click the extension, click the **Disable** dropdown next to the gear.
- To remove it: same place, choose **Uninstall**.
- After enable/disable, Cursor sometimes asks to reload the window. Click "Reload."

## Checkpoint

You're done when:

- [ ] You opened the extensions side bar with `Ctrl+Shift+X`.
- [ ] You searched for and installed the **Python** extension by **Microsoft**.
- [ ] "Python" appears under the **INSTALLED** section in the extensions side bar.
- [ ] You know the difference between Install, Disable, and Uninstall.

If you accidentally installed a different "Python" extension (wrong publisher), uninstall it and install the Microsoft one.
