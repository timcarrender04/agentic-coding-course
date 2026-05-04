# Lesson 06: Extend with Continue.dev

**By the end, you will have used Continue.dev's agent mode to add a Delete button to each item Card, with a confirmation step — both frontend and backend changes.**

⏱ ~20 minutes

> Module 05 drilled the agentic loop on the FastAPI backend. Today: same loop on the frontend, plus a small backend tweak. Two repos in play, same model, same workflow.

---

**1.** Make sure both stacks are up.
```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml ps
```
Both `api` and `db` should be Up.

```bash
ps aux | grep -v grep | grep "next dev" | head -n 1
```
Should show your `next dev` process.

If either is down, bring it up.

---

## Step 1: branch the frontend

**2.** Create a feature branch in the frontend repo.
```bash
cd ~/docker-course/fastapi-frontend
git switch -c add-delete-button
```

---

## Step 2: ask Continue.dev for the change

**3.** Open the Continue side bar. Switch to **Agent** mode.

**4.** In Cursor, open `app/page.tsx` so it's the visible file.

**5.** In Continue, type:
```
@file:app/page.tsx

I want to add a Delete button to each item Card. When clicked, it should:
1. Show a HeroUI confirmation Modal asking "Delete <item name>?"
2. On confirm, DELETE http://localhost:8000/items/<id>
3. On success, reload the items list
4. On error, show an inline error message

Show me the changes before applying.
```

Send.

**6.** The agent should propose changes — likely involving:
   - Adding HeroUI's `Modal`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter` to imports.
   - Adding a `useDisclosure` for the modal.
   - Adding state for the item being deleted.
   - Adding a delete handler.
   - Adding the Button to each Card with an `onPress`.

**7.** **Read every diff.** Confirm the approach before approving.

**8.** Approve the proposed changes one at a time.

---

## Step 3: verify it works

**9.** Save (the agent should have already saved). Refresh the browser.

**10.** Each item Card should now have a Delete button.

**11.** Click Delete on an item. A modal should appear asking for confirmation.

**12.** Click Confirm. The modal closes; the list reloads; the item is gone.

**13.** Confirm in the database:
```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml exec db \
  psql -U postgres -d appdb -c "SELECT count(*) FROM items;"
```
Count went down by 1.

---

## Step 4: feel a real failure mode

**14.** Now ask the agent for a tricky thing. In Continue (still in agent mode), type:
```
Add an "Undo" button that appears for 5 seconds after a delete, allowing the user to restore the deleted item. Use a Toast pattern.
```

**15.** This is harder. The model might:
   - Try to use a `Toast` component that doesn't exist in HeroUI's exports.
   - Try to call a backend route that doesn't exist (we don't have an "undelete" endpoint).
   - Loop trying to make it work.

**16.** **Watch carefully.** If the agent goes off the rails:
   - **Reject** the broken proposal.
   - In the chat, push back: `HeroUI doesn't have a Toast component. Use a Snackbar or an inline-alert pattern instead. And there's no undelete endpoint — for now, re-POST the item using the data we have on the client.`
   - Let it try again.

**17.** If it gets stuck in a loop, abandon the approach: stop the agent, revert any half-made changes (`git checkout app/page.tsx`), and move on. **Knowing when to give up on the agent is a skill.**

---

## Step 5: commit

**18.** If the Delete button works (skip the Undo bit if it didn't pan out), commit.
```bash
git add app/page.tsx
git commit -m "Add Delete button with confirmation modal"
```

**19.** Push the branch.
```bash
# Assumes you set up a frontend repo on Gitea earlier; if not, skip the push for now
git remote -v
```

If you have an `origin` set, `git push -u origin add-delete-button` and open a PR on Gitea (Module 04 lesson 10 workflow). If not, just merge locally:
```bash
git switch main
git merge add-delete-button
git branch -d add-delete-button
```

**20.** Log it.
```bash
echo "Continue.dev agent: added Delete button + confirmation modal" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Read every diff.** The 7B model is good but not infallible — especially on a UI library it may not have seen extensively in training. It will sometimes import components that don't exist or use props that aren't in the current HeroUI version.
- **Both stacks must be running.** If the agent calls a backend endpoint and gets a connection-refused, it might "fix" the wrong thing. Make sure FastAPI is up before agent mode.
- **Branch first, agent second.** Always `git switch -c agent-<task>` before letting the agent loose. Easy revert if the result is junk.
- **Knowing when to abort.** A small model in a loop is a small model in a loop. Three failed attempts on the same task → abort, simplify the request, or do it manually with `Ctrl+I`.

---

## Checkpoint

In the browser:
- Each item Card has a Delete button.
- Clicking Delete opens a confirmation modal.
- Confirming actually removes the item from the list and the database.

```bash
grep -E "Delete|onPress.*delete" app/page.tsx | head -n 3
```
Should show a Delete button or handler.

```bash
git log --oneline -1
```
Should show your "Add Delete button" commit.

---

**Next up:** [07-final-checkpoint.md](07-final-checkpoint.md) — Ship a feature end-to-end
