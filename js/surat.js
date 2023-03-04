function getURL(e) {
  const pageURL = window.location.search.substring(1);
  const urlVariable = pageURL.split("&");

  for (let i = 0; i < urlVariable.length; i++) {
    const parameterName = urlVariable[i].split("=");
    if (parameterName[0] == e) {
      return parameterName[1];
    }
  }
}

const nomorsurat = getURL("nomorsurat");

function getSurat() {
  fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then((response) => response.json())
    .then((response) => {
      //title surat
      const titleSurat = document.querySelector("#title-surat");
      titleSurat.textContent = `Al-Quran | Surat ${response.nama_latin}`;

      //judul surat
      const judulSurat = document.querySelector(".judul-surat");
      const cardJudulSurat = `
      <strong class="text-xl text-center">${response.nama_latin} - ${response.nama}</strong>
      <p>${response.arti} (${response.jumlah_ayat} ayat)</p>
      <button class="audio-button-play text-white bg-cyan-800 hover:bg-cyan-600 rounded-lg text-sm px-2 py-2.5 mt-3 text-center inline-flex items-center">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="-4 -2 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/></svg>
        Dengarkan murrotal
      </button>
      <button class="hidden text-white bg-red-800 hover:bg-red-600 rounded-lg text-sm px-2 py-2.5 mt-3 text-center inline-flex items-center audio-button-pause">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="-4 -2 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/></svg>
        Stop
      </button>
      <audio id="audio-tag" src="${response.audio}"></audio>        
    `;
      judulSurat.innerHTML = cardJudulSurat;
      //end judul surat

      //isi surat
      const surat = response.ayat;
      let isiSurat = "";
      surat.forEach((s) => {
        isiSurat += `
        <div class="card border-right-0 mb-3">
            <div class="card-body">
                <p>${s.nomor}.</p>
                <h3 class="text-end mb-3 arabic">${s.ar}</h3>
                <p class="italic">${s.tr}</p>
                <p>${s.idn}</p>
            </div>
        </div>
        `;
      });

      const cardIsiSurat = document.querySelector(".card-isi-surat");
      cardIsiSurat.innerHTML = isiSurat;

      //ketika button audio diklik
      const buttonPlay = document.querySelector(".audio-button-play");
      const buttonPause = document.querySelector(".audio-button-pause");
      const audioSurat = document.querySelector("#audio-tag");

      //play
      buttonPlay.addEventListener("click", function () {
        buttonPlay.classList.add("hidden");
        buttonPause.classList.remove("hidden");
        audioSurat.play();
      });

      //pause
      buttonPause.addEventListener("click", function () {
        buttonPause.classList.add("hidden");
        buttonPlay.classList.remove("hidden");
        audioSurat.pause();
      });
    });
}

getSurat();
