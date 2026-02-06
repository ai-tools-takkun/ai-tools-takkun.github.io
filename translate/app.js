const API="https://ai-tools.takkunmcjp.workers.dev";
async function run(){
  const r = await fetch(API,{
    method:"POST",
    body:JSON.stringify({
      message:"Translate to Japanese:\n"+document.getElementById("in").value,
      history:[]
    })
  });
  const d=await r.json();
  document.getElementById("out").textContent=d.choices[0].message.content;
}
