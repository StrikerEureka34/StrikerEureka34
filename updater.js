const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const octokit = new Octokit({ auth: process.env.GHT });

async function run() {
    try {
        const { data: user } = await octokit.users.getByUsername({ username: "StrikerEureka34" });
        let t = fs.readFileSync("./template.svg", "utf8");
        const pad = (n) => n.toString().padStart(2, "0");
        const r = { "{{USER}}": user.login, "{{REPOS}}": pad(user.public_repos), "{{FOLLOWERS}}": pad(user.followers), "{{GISTS}}": pad(user.public_gists), "{{DATE}}": new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }) };
        Object.entries(r).forEach(([k, v]) => { t = t.replaceAll(k, v); });
        fs.writeFileSync("./template.svg", t, "utf8");
        console.log("stats card updated");
    } catch (err) { console.error(err.message); process.exit(1); }
}

run();
