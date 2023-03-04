function getSurat() {
  fetch("https://equran.id/api/surat")
    .then((response) => response.json())
    .then((response) => {
      let cardSurat = "";
      response.forEach((surat) => {
        cardSurat += `
            <div class="col-lg-6">
                <div class="card mb-4 card-surat">
                    <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
                        <h2 class="card-title font-bold text-lg">${surat.nomor}. ${surat.nama_latin}</h2>
                        <h6 class="card-subtitle mb-2 text-end arabic">${surat.nama}</h6>
                        <p class="card-text text-end">${surat.arti}</p>
                    </div>
                </div>
            </div>
            `;
      });
      const listSurat = document.querySelector(".card-surat-list");
      listSurat.innerHTML = cardSurat;
      console.log(listSurat);
    });
}

getSurat();

document.querySelector("#cari").addEventListener("input", filterList);

function filterList() {
  const cariInput = document.querySelector("#cari");
  const filter = cariInput.value.toLowerCase();
  const listNama = document.querySelectorAll(`. ${surat.nama_latin}`);

  listNama.forEach((item) => {
    let text = item.textContent;
    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}
