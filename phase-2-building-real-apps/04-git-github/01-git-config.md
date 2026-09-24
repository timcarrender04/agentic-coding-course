# Lesson 01: Configure Git

**By the end, Git knows your name, your email, and that new repos should default to a `main` branch.**

⏱ ~10 minutes of typing

> Git stamps every commit with a name and email. If you don't set them up front, your first commit fails with a confusing error. Set them once, globally, and never think about it again.

```instructor
Say: "Git stamps every commit with a name and email. We set both globally now, once, and never think about it again."
Mention: "If they skip this, the first commit fails with 'please tell me who you are.' Set name and email — even if it's a personal email, that's fine for class."
Pause: After `git config --global user.name`. Have them run `git config --global --list` and read their values out loud — that confirms they actually saved.
Say: "You're done when `git config --global --list` shows `user.name`, `user.email`, and `init.defaultBranch=main`."
```

---

**1.** Set your name (this shows up on every commit).
```bash
git config --global user.name "Your Name"
```
(Replace `Your Name` with your actual name. Quotes matter if it has a space.)

**2.** Set your email. **Use the same email you'll use for your Gitea account in lesson 07.**
```bash
git config --global user.email "you@example.com"
```

**3.** Set the default branch name to `main` (some older Gits default to `master`).
```bash
git config --global init.defaultBranch main
```

**4.** Make Git's output a bit more readable.
```bash
git config --global color.ui auto
```

**5.** Configure how merges handle pull conflicts. The safe default for beginners is "fail unless I say otherwise" — set it explicitly.
```bash
git config --global pull.rebase false
```

**6.** Read back what you set.
```bash
git config --global --list
```
You should see something like:
```
user.name=Your Name
user.email=you@example.com
init.defaultbranch=main
color.ui=auto
pull.rebase=false
```

**7.** Read just one value at a time — this pattern is useful when scripts need to know your config.
```bash
git config --global user.name
```
```
Your Name
```

**8.** See where Git stores your global config.
```bash
ls -la ~/.gitconfig
```
You should see the file. It's plain text — you could edit it by hand, but `git config` is safer.

**9.** Take a peek inside.
```bash
cat ~/.gitconfig
```
```
[user]
    name = Your Name
    email = you@example.com
[init]
    defaultBranch = main
[color]
    ui = auto
[pull]
    rebase = false
```

**10.** Log it.
```bash
echo "Git configured: $(git config --global user.name) <$(git config --global user.email)>" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Use a real email** that matches what you'll use on Gitea. Mismatched emails create commits that don't link to your Gitea profile.
- `--global` writes to `~/.gitconfig` and applies to every repo for your user. Without `--global`, the setting only applies to the current repo.
- If you typo your name or email, just re-run the command — the new value overwrites the old.

---

## Checkpoint

```bash
git config --global user.name && git config --global user.email
```
Should print your name and email on two lines.

```bash
git config --global init.defaultBranch
```
Should print `main`.

```bash
test -f ~/.gitconfig && echo "OK"
```
Should print `OK`.

---

**Next up:** [02-init-and-first-commit.md](02-init-and-first-commit.md) — Turn the FastAPI project into a Git repo
