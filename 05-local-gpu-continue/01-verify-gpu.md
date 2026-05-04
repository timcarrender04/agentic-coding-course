# Lesson 01: Verify Your GPU

**By the end, you will have run `nvidia-smi` from inside your dev environment and seen your GPU listed with VRAM and driver version.**

⏱ ~15 minutes of typing

> Local LLMs need a GPU. Today we just confirm the GPU is visible to the OS and that you have a CUDA-capable driver. We don't install CUDA toolkits — Ollama bundles what it needs.

```instructor
Say: "Local LLMs need a GPU. Today we confirm the GPU is visible to the OS and the driver is current. We are NOT installing CUDA toolkits — Ollama bundles what it needs."
Mention: "WSL students: a missing or empty `nvidia-smi` usually means the WINDOWS-side NVIDIA driver is old. `wsl --update` from PowerShell plus a current driver fixes 90% of cases."
Pause: After they run `nvidia-smi`. Walk through the output together — driver version, CUDA version, free VRAM. They'll need to recognize VRAM in lesson 03 when picking a model.
Say: "You're done when `nvidia-smi` lists their GPU AND prints free VRAM. If a student has no GPU, pair them with someone who does."
```

---

## Three paths

Pick the one matching your setup:

- **Path A — Native Ubuntu** (your laptop runs Linux directly)
- **Path B — WSL2** (Windows + Ubuntu through WSL)
- **Path C — SSH to a course-provided GPU host**

Steps below are labelled — only run the ones for your path.

---

**1.** **All paths.** Try it first.
```bash
nvidia-smi
```

If you see a table starting with `+---...---+` and listing your GPU (e.g. `NVIDIA GeForce RTX 4070`), VRAM, and driver version — **skip to step 9 (the checkpoint).** You're done with this lesson.

If you see `nvidia-smi: command not found` or the command hangs, continue with your path.

---

## Path A — Native Ubuntu

**2A.** Check whether the kernel sees an NVIDIA card.
```bash
lspci | grep -i nvidia
```
You should see something like `NVIDIA Corporation GA106 [GeForce RTX 3060]`. If you see nothing, the card isn't detected by the OS — stop and ask the instructor.

**3A.** List recommended drivers.
```bash
ubuntu-drivers devices
```
You'll see a list with one marked `recommended`.

**4A.** Auto-install the recommended driver.
```bash
sudo ubuntu-drivers autoinstall
```
(Takes a few minutes.)

**5A.** Reboot.
```bash
sudo reboot
```
Reconnect after reboot.

**6A.** Verify.
```bash
nvidia-smi
```

**Skip to step 9.**

---

## Path B — WSL2

**2B.** From inside your WSL terminal, try `nvidia-smi` again. If it works now, skip to step 9.

**3B.** If it still fails, the issue is on the **Windows** side, not Linux.
   - Open Windows PowerShell (not WSL).
   - Run:
     ```powershell
     wsl --update
     ```
     to make sure WSL itself is current.
   - Make sure you have the **latest NVIDIA driver for Windows** — go to https://www.nvidia.com/Download/index.aspx and install the Game Ready or Studio driver for your card. (CUDA-on-WSL is built into the driver since 2022.)

**4B.** Restart WSL completely from PowerShell:
```powershell
wsl --shutdown
```
Then re-open your WSL terminal.

**5B.** Verify inside WSL.
```bash
nvidia-smi
```

**Skip to step 9.**

---

## Path C — SSH to a GPU host

**2C.** Confirm you're connected to the GPU host. Cursor's bottom-left should show `SSH: <hostname>`.

**3C.** Run on the remote.
```bash
nvidia-smi
```

**4C.** If it fails, the host doesn't have a GPU or driver. **Ask the instructor** — they own the host.

---

## All paths

**9.** Read your `nvidia-smi` output. Specifically note:
   - **GPU name** (e.g. `GeForce RTX 4070`)
   - **Driver Version** (top-right of the output, e.g. `535.183.01`)
   - **CUDA Version** the driver supports (e.g. `12.4`)
   - **Memory-Usage** column — total VRAM (e.g. `12288MiB`)

**10.** Save your VRAM number — you'll use it in lesson 03 to pick a model size.
```bash
nvidia-smi --query-gpu=memory.total --format=csv,noheader
```
```
12288 MiB
```

**11.** Sanity-check that the driver can run a tiny CUDA workload.
```bash
nvidia-smi -L
```
```
GPU 0: NVIDIA GeForce RTX 4070 (UUID: GPU-...)
```

**12.** Log it.
```bash
echo "GPU verified: $(nvidia-smi --query-gpu=name --format=csv,noheader), $(nvidia-smi --query-gpu=memory.total --format=csv,noheader)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Don't install `nvidia-cuda-toolkit` from apt.** Lesson 02 runs Ollama in Docker; the image bundles what it needs. Installing the apt CUDA toolkit can downgrade your driver and break things.
- **Docker needs GPU access too.** For lesson 02, the Docker daemon must pass your NVIDIA GPU into containers (NVIDIA Container Toolkit). Host `nvidia-smi` alone is not enough.
- **WSL: never install Linux NVIDIA drivers inside WSL.** The driver lives on the Windows side. Inside WSL you only need the userspace tooling, which CUDA-on-WSL provides automatically.
- **Multiple GPUs:** if you have more than one, `nvidia-smi` shows them all. Ollama will use GPU 0 by default.

---

## Checkpoint

```bash
nvidia-smi --query-gpu=name,memory.total --format=csv
```
Should print one row with your GPU's name and VRAM in MiB.

```bash
nvidia-smi 2>&1 | grep -q "Driver Version" && echo "OK"
```
Should print `OK`.

---

**Next up:** [02-install-ollama.md](02-install-ollama.md) — Run Ollama with Docker Compose
