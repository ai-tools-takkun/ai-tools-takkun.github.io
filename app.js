const params = new URLSearchParams(location.search);
const tool = params.get("tool");

if (tool) {
  const names = {
    chat: "AIチャット",
    translate: "翻訳",
    summary: "要約"
  };
  document.getElementById("title").textContent = names[tool];
}

function openTool(t) {
  location.href = `tool.html?tool=${t}`;
}

async function run() {
  const text = input.value;
  const res = await fetch("https://ai-tools.takkunmcjp.workers.dev", {
    method: "POST",
    body: JSON.stringify({ tool, prompt: text })
  });
  const data = await res.json();
  output.textContent = data.choices[0].message.content;
}
