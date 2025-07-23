function generateImage() {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) return alert("اكتب وصف الصورة الأول");

  document.getElementById("imageContainer").innerHTML = "جاري توليد الصورة...";

  fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "512x512"
    })
  })
  .then(res => res.json())
  .then(data => {
    const imageUrl = data.data[0].url;
    document.getElementById("imageContainer").innerHTML =
      `<img src="${imageUrl}" id="generatedImage" alt="AI Image" />`;
  })
  .catch(() => {
    document.getElementById("imageContainer").innerHTML = "فشل توليد الصورة.";
  });
}

function downloadImage() {
  const img = document.getElementById("generatedImage");
  if (!img) return alert("مفيش صورة");

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "ai-image.png";
  link.click();
}

function shareImage() {
  const img = document.getElementById("generatedImage");
  if (!img) return alert("مفيش صورة");

  navigator.share
    ? navigator.share({
        title: "AI Image",
        text: "شوف الصورة اللي طلعتها بالذكاء الاصطناعي",
        url: img.src
      })
    : alert("المشاركة مش مدعومة على جهازك");
}
