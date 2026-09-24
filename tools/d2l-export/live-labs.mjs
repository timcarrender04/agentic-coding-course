/**
 * Cohort-1 live labs that sit alongside the per-lesson D2L topics.
 * Wired into export.mjs by week + "after this lesson" insertion point.
 */

export const LIVE_LABS = [
  {
    id: "you-are-here",
    week: 2,
    after: { mod: "00", num: 7 },
    tocTitle: "Live lab — You Are Here",
    pageRel: "pages/live-you-are-here.html",
    files: [
      {
        src: "class-materials/you-are-here/setup.sh",
        dest: "files/you-are-here/setup.sh",
      },
    ],
  },
  {
    id: "escape",
    week: 3,
    after: { mod: "01", num: 6 },
    tocTitle: "Live lab — Terminal Escape Night",
    pageRel: "pages/live-escape-night.html",
    files: [
      {
        src: "class-materials/terminal-escape-room/setup.sh",
        dest: "files/escape-night/setup.sh",
      },
    ],
  },
  {
    id: "uplink",
    week: 4,
    after: { mod: "01", num: 10 },
    tocTitle: "Live lab — Operation Uplink",
    pageRel: "pages/live-uplink-hunt.html",
    files: [
      {
        src: "class-materials/uplink-hunt/setup.sh",
        dest: "files/uplink-hunt/setup.sh",
      },
    ],
  },
  {
    id: "roster",
    week: 6,
    after: { mod: "02", num: 6 },
    tocTitle: "Live lab — Docker signup roster",
    pageRel: "pages/live-docker-roster.html",
    files: [
      {
        src: "labs/docker-roster-lab.zip",
        dest: "files/docker-roster-lab.zip",
      },
    ],
  },
];

export function liveLabBody(id) {
  switch (id) {
    case "you-are-here":
      return youAreHerePage();
    case "escape":
      return escapeNightPage();
    case "uplink":
      return uplinkHuntPage();
    case "roster":
      return dockerRosterPage();
    default:
      throw new Error(`Unknown live lab: ${id}`);
  }
}

function youAreHerePage() {
  return `
<h1>Live lab — You Are Here</h1>
<p class="meta">Wednesday activity · 6:00–8:00 PM · crews of 3 · WSL or Mac · reviews where you are: pwd, ls, cd</p>
<div class="callout objective"><span class="label">🎯 Learning objective:</span>
Prove which machine you are on, get home with a bare <code>cd</code>, hop back with <code>cd -</code>, find a hidden file, and walk a path with <code>pwd</code> after every stop — together, on your own keyboard.</div>

<p><strong>The story:</strong> the directory signs fell off the ChiefOS lab building. Security will not open the lab until your whole crew can prove where they are. Six floors, then you predict what the machine will print, then a banner. <strong>Every floor is solvable with <code>pwd</code>, <code>ls</code>, <code>ls -la</code>, <code>cd</code>, and <code>cd -</code>.</strong> WSL and Mac both work. SSH is not part of this lab. No sudo.</p>

<h2>Do this before 6:00 PM — required</h2>
<ol>
<li>Download <a href="../files/you-are-here/setup.sh"><code>setup.sh</code></a> from this topic.</li>
<li>Open <strong>Ubuntu (WSL)</strong> or <strong>Mac Terminal</strong>. Not Windows Command Prompt.</li>
<li>Run <code>bash setup.sh</code> as yourself. Never with sudo. It never asks for a password.</li>
<li>Verify: <code>ls ~/you-are-here</code> shows the floors.</li>
<li><strong>Stop there.</strong> <code>cat README.txt</code> waits until class says go.</li>
</ol>
<pre><code class="language-bash">bash setup.sh
ls ~/you-are-here</code></pre>

<h2>How the crew works</h2>
<table>
<thead><tr><th>Piece</th><th>What it means</th></tr></thead>
<tbody>
<tr><td><strong>Crews of 3</strong></td><td>Everyone types on their <strong>own machine</strong>. A floor counts only when <strong>all three</strong> have that fragment.</td></tr>
<tr><td><strong>Roles (rotate every floor)</strong></td><td><strong>Driver</strong> shares screen and types. <strong>Navigator</strong> reads the floor aloud and calls the next command. <strong>Scribe</strong> tracks fragments and posts clears in main chat.</td></tr>
<tr><td><strong>Rule #1</strong></td><td>Coach with words only. Never type on a teammate's keyboard. <code>join.sh</code> will not lock a floor for one machine — it checks the other two seats' hostname, whoami, and badge.</td></tr>
<tr><td><strong>Hints</strong></td><td>Three hint tokens for the crew. The free hint is always: read the floor again. It tells you the next command.</td></tr>
</tbody>
</table>

<h2>Tonight's clock</h2>
<table>
<thead><tr><th>Clock</th><th>Block</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>6:00</td><td>Build</td><td>✓ in chat when <code>ls ~/you-are-here</code> works. Setup rescue. Crews assigned.</td></tr>
<tr><td>6:15</td><td>Launch</td><td>Say WSL or Mac. Close the terminal and get back to the README in under 2 minutes. Then <code>cat ~/you-are-here/README.txt</code>.</td></tr>
<tr><td>6:25</td><td>The walk</td><td>About 60 minutes. Six floors. The building tells you what to type.</td></tr>
<tr><td>7:25</td><td>Debrief</td><td>Banners in chat. Crews teach one floor back.</td></tr>
<tr><td>7:45</td><td>Close</td><td>Module 00 gate screenshot still due in D2L by Sunday. Week 3 is sudo and permissions — not tonight.</td></tr>
</tbody>
</table>

<h2>Rules of the building</h2>
<ul>
<li>Don't <code>cat ~/you-are-here/README.txt</code> before the walk starts.</li>
<li>WSL or Mac only. If setup says this shell is not WSL or Mac, open Ubuntu or Mac Terminal and run it there.</li>
<li>No sudo. No SSH. No web searches — the floor tells you.</li>
<li>Wrecked a floor? <code>bash setup.sh --reset</code> using the same file you downloaded.</li>
</ul>

<div class="callout lab"><span class="label">🧪 Submit.</span>
Screenshot the banner from <code>bash ~/you-are-here/banner.sh</code> and post it in Zoom chat — all three machines. The Module 00 gate (green badge + <code>whoami</code> + <code>pwd</code>) is still a separate D2L submission, due Sunday.</div>
`;
}

function escapeNightPage() {
  return `
<h1>Live lab — Terminal Escape Night</h1>
<p class="meta">Wednesday live lab · 6:00–8:00 PM · replaces the Week 3 clinic · reviews labs 01:02–06</p>
<div class="callout objective"><span class="label">🎯 Learning objective:</span>
Re-run navigation, <code>mkdir</code>/<code>cp</code>/<code>mv</code>/<code>rm -r</code>, <code>less</code>/<code>tail -f</code>/nano, and permissions (<code>ls -l</code>/<code>chmod</code>/<code>chown</code>) under a story — without new commands.</div>

<p><strong>The story:</strong> a bad update has locked every door in the ChiefOS server building at 23:47 — and you're inside. Mouse dead. GUI dead. Terminal only. Fight through <strong>four escape rooms</strong>, each guarding one code word. Collect all four, write the escape plan, and get out. <strong>Every room is solvable with commands you already used in labs 01:02–06.</strong> The answer to every puzzle is written down inside the game. Read the room. It always tells you.</p>

<h2>Do this before 6:00 PM — required</h2>
<ol>
<li>Download <a href="../files/escape-night/setup.sh"><code>setup.sh</code></a> from this topic (also attached to the D2L item).</li>
<li>In your WSL/Ubuntu terminal, run <code>bash setup.sh</code> — as yourself, <strong>never</strong> <code>sudo bash setup.sh</code>.</li>
<li>It asks for your password <strong>once</strong>, near the end. The prompt types invisibly — keep typing, press Enter.</li>
<li>Verify: <code>ls ~/escape-night</code> shows <strong>four room folders</strong> plus a README.</li>
<li><strong>Don't go in yet.</strong> Exploring early is cheating yourself out of the race.</li>
</ol>
<pre><code class="language-bash">bash setup.sh
ls ~/escape-night</code></pre>
<p>Mac note: if you hit <code>chown: root: illegal group name</code>, run <code>sed -i '' 's/chown root:root/chown root/' setup.sh</code> then <code>bash setup.sh --reset</code>.</p>

<h2>How the race works</h2>
<table>
<thead><tr><th>Piece</th><th>What it means</th></tr></thead>
<tbody>
<tr><td><strong>Teams</strong></td><td>Team SUDO, Team NANO, Team CHMOD. Everyone types on their <strong>own machine</strong>. A team clears a room only when <strong>every member</strong> has that room's code word.</td></tr>
<tr><td><strong>Roles (rotate every room)</strong></td><td><strong>Driver</strong> shares screen and types while narrating. <strong>Reader</strong> reads the room's files aloud. <strong>Scribe</strong> tracks code words and posts clears in main chat.</td></tr>
<tr><td><strong>Rule #1</strong></td><td>Nobody rides along. Finished early? Coach with <strong>words only</strong> — never touch a teammate's keyboard.</td></tr>
<tr><td><strong>Hints</strong></td><td>One hint token for the night (Zoom “Ask for Help”). Unlimited free hint: <strong>read the room's files again</strong>.</td></tr>
</tbody>
</table>

<h2>Tonight's clock</h2>
<table>
<thead><tr><th>Clock</th><th>Block</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>6:00</td><td>Check-in</td><td>Post a ✓ in chat when <code>ls ~/escape-night</code> shows four rooms. Setup rescue for anyone stuck.</td></tr>
<tr><td>6:20</td><td>Launch</td><td>The story, team assignments, rules, breakouts.</td></tr>
<tr><td>6:30</td><td>The escape</td><td>50:00 on the clock.</td></tr>
<tr><td>7:20</td><td>Debrief</td><td>Each team teaches one room. Exit ticket: read <code>ls -l ~/escape-night/escape</code> out loud.</td></tr>
<tr><td>7:40</td><td>Close</td><td>Confirm labs 01:02–06 submitted. Week 4 phase-gate preview.</td></tr>
</tbody>
</table>

<h2>Train before tonight — seven escape skills</h2>
<p>If you can do these, you can escape. Rusty on any? Re-run that lab this afternoon.</p>
<table>
<thead><tr><th>#</th><th>Can you…</th><th>Practice</th><th>From lab</th></tr></thead>
<tbody>
<tr><td>1</td><td>Move around and look inside things without a mouse</td><td><code>pwd</code> · <code>ls</code> · <code>cd</code> · <code>cd ..</code> · <code>cat</code></td><td>01:01–02</td></tr>
<tr><td>2</td><td>Build, copy, rename, and carefully destroy</td><td><code>mkdir</code> · <code>cp</code> · <code>mv</code> · <code>rm -r</code></td><td>01:02</td></tr>
<tr><td>3</td><td>Page through a long file — and get back out</td><td><code>less file</code> (space = next, q = quit)</td><td>01:03</td></tr>
<tr><td>4</td><td>Watch a file update live in a second terminal</td><td><code>tail -f file</code> (Ctrl+C to stop)</td><td>01:03</td></tr>
<tr><td>5</td><td>Edit, save, and exit in nano — no panic</td><td><code>nano file</code> · Ctrl+O, Enter · Ctrl+X</td><td>01:03</td></tr>
<tr><td>6</td><td>Use sudo when the system says you can't</td><td><code>sudo whoami</code> · <code>sudo chown</code></td><td>01:04, 01:06</td></tr>
<tr><td>7</td><td>Read an <code>ls -l</code> permission string and change it</td><td><code>ls -l</code> · <code>chmod</code> · <code>chmod +x</code></td><td>01:06</td></tr>
</tbody>
</table>
<p>Skill 7 is the boss fight — and the exact skill next week's Module 01 phase-gate tests.</p>

<h2>Rules of the building</h2>
<ul>
<li>Don't enter <code>~/escape-night</code> before the race starts.</li>
<li>Coach with words only. No web searches — everything is in the rooms.</li>
<li>Notes, this page, and your lab files are legal.</li>
<li>Everything happens inside <code>~/escape-night/</code>. The game contains exactly one <code>rm -r</code> — read the path twice, then read it again.</li>
<li>Wrecked a room? <code>bash setup.sh --reset</code> rebuilds it in seconds.</li>
</ul>

<div class="callout lab"><span class="label">🧪 Submit.</span>
Screenshot the victory banner in your terminal and post it in Zoom chat — that's tonight's participation artifact. Still owe labs 01:02–06? Tonight <em>is</em> the review. Finish and submit those in D2L by Sunday.</div>
`;
}

function uplinkHuntPage() {
  return `
<h1>Live lab — Operation Uplink (“Signal Lost”)</h1>
<p class="meta">Wednesday live lab · 6:00–8:00 PM · opens the night; Module 01 phase-gate (01:11) runs in the back half · reviews labs 01:07–10</p>
<div class="callout objective"><span class="label">🎯 Learning objective:</span>
Re-run networking (<code>ip a</code>/<code>ss -tuln</code>/<code>curl</code>/<code>dig</code>), processes, pipes, and users/groups under a story, then sit the Module 01 phase-gate from memory.</div>

<p><strong>The mission:</strong> saboteurs hit Relay Station 4 overnight and cut its uplink. Four subsystems — Antenna Array, Relay Rack, Log Archive, Crew Deck — each hold <strong>one fragment</strong> of the console's restart sequence. Recover all four, arm the console, and fire three test packets at the beacon. <strong>Every station is solvable with commands from labs 01:07–10.</strong> Some clues sit in files; some are <em>running</em>, hiding in the machine itself.</p>

<h2>Do this before 6:00 PM — required</h2>
<ol>
<li>Download <a href="../files/uplink-hunt/setup.sh"><code>setup.sh</code></a> from this topic.</li>
<li>Run <code>bash setup.sh</code> as yourself, <strong>never</strong> with sudo (this game never asks for a password).</li>
<li>Verify: <code>ls ~/uplink-hunt</code> shows <strong>four station folders</strong>.</li>
<li>Pre-flight from lab 01:07: <code>which dig || sudo apt install -y dnsutils</code>.</li>
<li><strong>Don't go in yet.</strong></li>
</ol>
<pre><code class="language-bash">bash setup.sh
ls ~/uplink-hunt
which dig || sudo apt install -y dnsutils</code></pre>

<h2>How the hunt works</h2>
<table>
<thead><tr><th>Piece</th><th>What it means</th></tr></thead>
<tbody>
<tr><td><strong>Crews</strong></td><td>Pairs. Each crew gets a Zoom breakout. A station is cleared only when <strong>both</strong> hold the fragment.</td></tr>
<tr><td><strong>Roles (swap every station)</strong></td><td><strong>Driver</strong> shares screen and types while narrating. <strong>Navigator</strong> reads the briefings and calls the next command. You each drive twice.</td></tr>
<tr><td><strong>Rule #1</strong></td><td>Both must fire. Everything on your own machine. The final banner must come from <strong>both terminals</strong>.</td></tr>
<tr><td><strong>Hints</strong></td><td>Three hint tokens. Unlimited free hint: read the briefing again — or read what your last command printed. Machinery quiet? <code>bash power.sh</code>.</td></tr>
</tbody>
</table>

<h2>Tonight's clock</h2>
<table>
<thead><tr><th>Clock</th><th>Block</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>6:00</td><td>Check-in</td><td>✓ in chat when <code>ls ~/uplink-hunt</code> shows four stations. Setup rescue. Crews assigned.</td></tr>
<tr><td>6:05</td><td>The hunt</td><td>60:00 on the clock. First in-story act: <code>bash power.sh</code>.</td></tr>
<tr><td>7:05</td><td>Debrief</td><td>Banners tallied. Crews teach the stations back.</td></tr>
<tr><td>7:15</td><td>Phase-gate</td><td><strong>Module 01 phase-gate (01:11)</strong> — timed, no-help, from memory.</td></tr>
<tr><td>7:55</td><td>Close</td><td>Labs 01:07–11 due Sunday. Week 5: Docker arrives over the link you restored.</td></tr>
</tbody>
</table>

<h2>Train before tonight — six uplink skills</h2>
<table>
<thead><tr><th>#</th><th>Can you…</th><th>Practice</th><th>From lab</th></tr></thead>
<tbody>
<tr><td>1</td><td>Find your machine's own network addresses</td><td><code>ip a</code></td><td>01:07</td></tr>
<tr><td>2</td><td>List every port your machine is listening on</td><td><code>ss -tuln</code></td><td>01:07</td></tr>
<tr><td>3</td><td>Turn a name into an address — and fetch a URL</td><td><code>dig +short example.com</code> · <code>curl</code></td><td>01:07</td></tr>
<tr><td>4</td><td>Find one process in a crowded process table</td><td><code>ps aux | grep name</code></td><td>01:08</td></tr>
<tr><td>5</td><td>Chain a counting pipeline, stage by stage</td><td><code>grep | cut -d: -f1 | sort | uniq -c</code></td><td>01:09</td></tr>
<tr><td>6</td><td>Read your own line of the user manifest</td><td><code>grep $USER /etc/passwd</code> · <code>cut -d: -f7</code></td><td>01:09–10</td></tr>
</tbody>
</table>
<p>Skill 5 is the boss fight — and the same pipeline is waiting on the phase-gate at 7:15.</p>

<h2>Rules of the station</h2>
<ul>
<li>Don't enter <code>~/uplink-hunt</code> before the hunt starts.</li>
<li>The <code>.machinery</code> bay is sealed — snooping voids your completion code.</li>
<li>Coach with words only. No web searches.</li>
<li>Zero <code>rm -r</code> and zero sudo in this game.</li>
<li>Wrecked something? <code>bash setup.sh --reset</code>. Machinery quiet? <code>bash power.sh</code>.</li>
</ul>

<div class="callout lab"><span class="label">🧪 Submit.</span>
Screenshot the victory banner (completion code) and post it in Zoom chat — both crew members. Then sit lesson 01:11. Finish labs 01:07–11 in D2L by Sunday.</div>
`;
}

function dockerRosterPage() {
  return `
<h1>Live lab — Docker signup roster</h1>
<p class="meta">Wednesday live lab · 6:00–8:00 PM · three-person teams · does <strong>not</strong> replace the Module 02 / nginx phase-gate (02:06)</p>
<div class="callout objective"><span class="label">🎯 Learning objective:</span>
Run a two-service Compose stack (API + Postgres) so both containers are healthy, the host browser shows the roster, and <code>psql</code> matches the UI — without ever starting Python on the host.</div>

<p>Everything runs in Docker: the API (<code>web</code>) and Postgres (<code>db</code>). Do not run <code>app.py</code> or uvicorn on the host. This is the stretch Compose lab from cohort 1 — leftover nginx from the Module 02 gate will steal port 8080, so clean that up first.</p>

<h2>Get the lab</h2>
<p>Either clone the public student repo, or unzip the attached packet.</p>
<pre><code class="language-bash">git clone https://github.com/timcarrender04/docker-roster-lab.git
cd docker-roster-lab</code></pre>
<p>Packet (same files, no git): <a href="../files/docker-roster-lab.zip">docker-roster-lab.zip</a>. Unzip, then File → Open Folder on that directory.</p>

<h2>Before you type</h2>
<ul>
<li>VS Code connected to the same Linux as Docker (bottom-left: <code>WSL: Ubuntu</code> or <code>SSH: …</code>). The whale sidebar must not say Failed to connect.</li>
<li>You can run Docker without sudo (<code>docker run hello-world</code> already worked).</li>
<li>Three-person teams. Name a leader. Everyone clones and runs Compose on their own machine — no watching-only.</li>
<li>Suggested split: (1) Docker — compose, logs, sidebar · (2) Research — docs/Hub + <code>RESEARCH.txt</code> · (3) Validate — curl, browser, <code>compose exec psql</code>.</li>
<li>Grok or another LLM <em>outside</em> the IDE is allowed. Still cite a real doc/Hub URL in <code>RESEARCH.txt</code>.</li>
</ul>

<h2>Clock</h2>
<table>
<thead><tr><th>Clock</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>6:00</td><td>Sign-in, form rooms of 3, name a leader, assign roles.</td></tr>
<tr><td>6:10</td><td>Clone, Open Folder, sidebar, free 8080, read compose.</td></tr>
<tr><td>6:25</td><td>Fill <code>RESEARCH.txt</code> (docs/Hub; Grok in a browser is OK).</td></tr>
<tr><td>6:45</td><td><code>docker compose up -d --build</code>. Wait for db healthy.</td></tr>
<tr><td>7:15</td><td>Browser, curl API, <code>compose exec psql</code>, sidebar screenshot.</td></tr>
<tr><td>7:45</td><td>Leaders: 3/3 up? One stuck spot.</td></tr>
<tr><td>7:55</td><td>D2L: screenshot + <code>RESEARCH.txt</code> (three names).</td></tr>
</tbody>
</table>

<h2>Free port 8080, then bring it up</h2>
<pre><code class="language-bash">docker ps
docker ps -aq | xargs -r docker rm -f

# wrong: python3 app.py    /    uvicorn app:app ...
# right:
docker compose up -d --build
docker compose ps</code></pre>
<p>Open <code>docker-compose.yml</code> and <code>Dockerfile</code>. Two services: <code>web</code> builds this folder and serves the form + API on 8080; <code>db</code> is official <code>postgres:16</code>. <code>app.py</code> is copied <em>into</em> the web image. It is not a host command.</p>

<h2>Prove both containers</h2>
<p>Browser: <a href="http://localhost:8080">http://localhost:8080</a> — add a name + email. The table should show the row.</p>
<pre><code class="language-bash">curl -s http://localhost:8080 | grep -i signup
curl -s -X POST http://localhost:8080/api/signups \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ada","email":"ada@example.com"}'
docker compose exec db psql -U roster -d roster -c "SELECT name, email FROM signups;"
docker compose logs web --tail=20</code></pre>
<p>Whale sidebar should show <code>web</code> and <code>db</code> running.</p>

<h2>What “done” looks like</h2>
<ul>
<li><code>docker compose ps</code> shows web Up and db healthy (or Up).</li>
<li>GET/POST <code>/api/signups</code> hit the web container, not a local Python process.</li>
<li>From web, Postgres hostname is the service name <code>db</code> (not localhost).</li>
<li>Named volume <code>pgdata</code> keeps rows after <code>docker compose down</code> then <code>up</code> (<code>down -v</code> wipes data).</li>
<li>You did not run python/uvicorn on the host.</li>
<li>Three names on the team; each person has <code>compose ps</code> green.</li>
</ul>
<p>Fill every question in <code>RESEARCH.txt</code> from <em>your</em> compose file and the linked docs before you treat the lab as done. Official references:</p>
<ul>
<li>Compose file: <a href="https://docs.docker.com/compose/compose-file/">docs.docker.com/compose/compose-file</a></li>
<li>Compose CLI: <a href="https://docs.docker.com/compose/">docs.docker.com/compose</a></li>
<li>Postgres image: <a href="https://hub.docker.com/_/postgres">hub.docker.com/_/postgres</a></li>
<li>Dockerfile: <a href="https://docs.docker.com/reference/dockerfile/">docs.docker.com/reference/dockerfile</a></li>
<li>Compose networking: <a href="https://docs.docker.com/compose/how-tos/networking/">docs.docker.com/compose/how-tos/networking</a></li>
</ul>

<div class="callout lab"><span class="label">🧪 Submit.</span>
One screenshot: VS Code Docker sidebar showing both services running, terminal <code>docker compose ps</code>, and the browser roster with at least one row. Also submit <code>RESEARCH.txt</code> (your answers, not a blank copy) with all three names.</div>
`;
}
