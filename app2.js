const file = document.getElementById('file');

const toBase64 = async (audio) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(audio)
  })
}

file.addEventListener('change', async (e) => {
  const result = await toBase64(e.target.files[0]);
  console.log(result)
})