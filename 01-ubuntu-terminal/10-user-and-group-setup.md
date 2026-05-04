# Lesson 10: User and Group Setup

**By the end, you will understand users and groups and will have practiced the command needed to join the docker group.**

⏱ ~10 minutes of typing

---

**1.** Start from home.
```bash
cd ~
```

**2.** Confirm.
```bash
pwd
```
```
/home/your-username
```

**3.** See your user ID, group ID, and all groups you belong to.
```bash
id
```
```
uid=1000(your-user) gid=1000(your-user) groups=1000(your-user),4(adm),27(sudo)
```
(Output will vary. The important part: you should see `sudo` in your groups.)

**4.** See just your groups.
```bash
groups
```
```
your-user adm sudo
```

**5.** Look at your entry in /etc/passwd.
```bash
grep $USER /etc/passwd
```
```
your-user:x:1000:1000:Your Name:/home/your-user:/bin/bash
```

**6.** Look at the group file.
```bash
cat /etc/group | grep sudo
```
```
sudo:x:27:your-user
```
(This shows that your user is in the sudo group.)

**7.** Count how many groups exist on the system.
```bash
wc -l /etc/group
```
```
65 /etc/group
```
(Number will vary.)

**8.** List all groups your user belongs to — another way.
```bash
id -nG
```
```
your-user adm sudo
```

**9.** Check if a "docker" group exists yet.
```bash
grep docker /etc/group
```
(No output — the docker group doesn't exist yet. It will be created when Docker is installed in Module 02.)

**10.** Preview the command to add yourself to the docker group — this WILL fail right now, and that's expected.
```bash
sudo usermod -aG docker $USER
```
```
usermod: group 'docker' does not exist
```
(This is expected! The docker group will exist after Module 02. You're building the muscle memory now so you can type this confidently later.)

**11.** Practice the same command pattern with a group that DOES exist — the adm group.
```bash
sudo usermod -aG adm $USER
```
(No output means success. You were likely already in this group.)

**12.** Confirm.
```bash
groups
```
```
your-user adm sudo
```
(You should see `adm` in the list.)

**13.** Look at who's in the adm group.
```bash
grep adm /etc/group
```
```
adm:x:4:syslog,your-user
```

**14.** See all groups with your user in them.
```bash
grep $USER /etc/group
```
(Shows every group line that mentions your username.)

**15.** Check your effective user ID.
```bash
id -u
```
```
1000
```
(Your UID — typically 1000 for the first non-root user.)

**16.** Check your effective group ID.
```bash
id -g
```
```
1000
```

**17.** Remember: after adding yourself to a new group, you need to either log out and back in, or use newgrp.
```bash
newgrp adm
```
(This refreshes your group membership in the current shell. You'll use this after adding yourself to the docker group in Module 02.)

**18.** Confirm the active group changed.
```bash
id -gn
```
```
adm
```

**19.** Switch back to your default group.
```bash
newgrp $USER
```

**20.** Confirm.
```bash
id -gn
```
```
your-user
```

**21.** Log it.
```bash
echo "User and group setup: done" >> ~/docker-course/notes/notes.txt
```

---

## Checkpoint

```bash
id
```
You should see your uid, gid, and groups including `sudo`.

```bash
groups
```
You should see your groups listed.

```bash
grep $USER /etc/group
```
You should see your user in multiple groups.

```bash
grep docker /etc/group
```
This should return nothing (docker group doesn't exist yet — it will after Module 02).

---

**Next up:** [11-final-checkpoint.md](11-final-checkpoint.md) — Prove you're ready for Docker
