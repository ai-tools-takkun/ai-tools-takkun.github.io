export default {
  async fetch(req, env) {
    if(req.method!=="POST") return new Response("Only POST",{status:405});
    const {message,history=[]}=await req.json();

    const r=await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${env.OPENAI_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"gpt-4.1-mini",
        messages:[
          {role:"system",content:"You are a helpful assistant."},
          ...history,
          {role:"user",content:message}
        ]
      })
    });
    return new Response(await r.text(),{headers:{"Content-Type":"application/json"}});
  }
};
