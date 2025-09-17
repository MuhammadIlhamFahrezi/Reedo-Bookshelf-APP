const KUNCI_PENYIMPANAN = "BOOKSHELF_APPS";
let dataBuku = [];

document.addEventListener("DOMContentLoaded", function () {
  muatDataDariStorage();
  perbaruiStatistik();
  tampilkanSemuaBuku();

  const formBuku = document.getElementById("bookForm");
  formBuku.addEventListener("submit", tambahBuku);

  const checkboxSelesai = document.getElementById("bookFormIsComplete");
  checkboxSelesai.addEventListener("change", ubahTeksSubmit);

  const formCari = document.getElementById("searchBook");
  formCari.addEventListener("submit", cariBuku);

  const inputCari = document.getElementById("searchBookTitle");
  inputCari.addEventListener("input", function () {
    if (inputCari.value === "") {
      tampilkanSemuaBuku();
    }
  });
});

function pergiKeTambahBuku() {
  var bagianTambahBuku = document.getElementById("sectionTambahBuku");
  if (bagianTambahBuku) {
    bagianTambahBuku.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function pergiKeCariBuku() {
  var bagianCariBuku = document.getElementById("sectionCariBuku");
  if (bagianCariBuku) {
    bagianCariBuku.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function pergiKeBukuBelumDibaca() {
  var bagianBukuBelumDibaca = document.getElementById("sectionBukuBelumDibaca");
  if (bagianBukuBelumDibaca) {
    bagianBukuBelumDibaca.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function pergiKeBukuSudahDibaca() {
  var bagianBukuSudahDibaca = document.getElementById("sectionBukuSudahDibaca");
  if (bagianBukuSudahDibaca) {
    bagianBukuSudahDibaca.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function tampilkanBukuBelumDibaca() {
  pergiKeBukuBelumDibaca();
}

function tampilkanBukuSudahDibaca() {
  pergiKeBukuSudahDibaca();
}

function muatDataDariStorage() {
  const dataString = localStorage.getItem(KUNCI_PENYIMPANAN);
  if (dataString !== null) {
    dataBuku = JSON.parse(dataString);
  }
}

function simpanDataKeStorage() {
  localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(dataBuku));
}

function buatIdUnik() {
  return new Date().getTime();
}

function ubahTeksSubmit() {
  const checkbox = document.getElementById("bookFormIsComplete");
  const tombolSubmit = document.getElementById("bookFormSubmit");
  const spanTeks = tombolSubmit.querySelector("span");

  if (checkbox.checked) {
    spanTeks.textContent = "Selesai dibaca";
  } else {
    spanTeks.textContent = "Belum selesai dibaca";
  }
}

function tampilkanNotifikasiBOM(pesan) {
  window.alert(pesan);
}

function tambahBuku(event) {
  event.preventDefault();

  const judul = document.getElementById("bookFormTitle").value.trim();
  const penulis = document.getElementById("bookFormAuthor").value.trim();
  const tahunInput = document.getElementById("bookFormYear").value.trim();
  const sudahSelesai = document.getElementById("bookFormIsComplete").checked;

  if (!judul || !penulis || !tahunInput) {
    tampilkanNotifikasiBOM("Semua field harus diisi!");
    return;
  }

  const tahun = parseInt(tahunInput);
  if (isNaN(tahun) || tahun < 0) {
    tampilkanNotifikasiBOM("Tahun harus berupa angka yang valid!");
    return;
  }

  const bukuBaru = {
    id: buatIdUnik(),
    title: judul,
    author: penulis,
    year: tahun,
    isComplete: sudahSelesai,
  };

  dataBuku.push(bukuBaru);
  simpanDataKeStorage();
  tampilkanSemuaBuku();
  perbaruiStatistik();

  document.getElementById("bookForm").reset();
  ubahTeksSubmit();

  tampilkanNotifikasiBOM(`Buku "${judul}" berhasil ditambahkan!`);
}

function tampilkanSemuaBuku() {
  const kontainerBelumSelesai = document.getElementById("incompleteBookList");
  const kontainerSudahSelesai = document.getElementById("completeBookList");

  kontainerBelumSelesai.innerHTML = "";
  kontainerSudahSelesai.innerHTML = "";

  if (dataBuku.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent =
      "Belum ada buku yang tersimpan. Tambahkan buku pertama Anda!";
    pesanKosong.className = "pesan-kosong";
    kontainerBelumSelesai.appendChild(pesanKosong);
    return;
  }

  const bukuBelumSelesai = dataBuku.filter((buku) => !buku.isComplete);
  const bukuSudahSelesai = dataBuku.filter((buku) => buku.isComplete);

  if (bukuBelumSelesai.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = "Tidak ada buku yang belum selesai dibaca.";
    pesanKosong.className = "pesan-kosong";
    kontainerBelumSelesai.appendChild(pesanKosong);
  } else {
    bukuBelumSelesai.forEach((buku) => {
      const elemenBuku = buatElemenBuku(buku);
      kontainerBelumSelesai.appendChild(elemenBuku);
    });
  }

  if (bukuSudahSelesai.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = "Tidak ada buku yang sudah selesai dibaca.";
    pesanKosong.className = "pesan-kosong";
    kontainerSudahSelesai.appendChild(pesanKosong);
  } else {
    bukuSudahSelesai.forEach((buku) => {
      const elemenBuku = buatElemenBuku(buku);
      kontainerSudahSelesai.appendChild(elemenBuku);
    });
  }
}

function buatElemenBuku(buku) {
  const div = document.createElement("div");
  div.setAttribute("data-bookid", buku.id);
  div.setAttribute("data-testid", "bookItem");
  div.className = "item-buku";

  const judulBuku = document.createElement("h3");
  judulBuku.setAttribute("data-testid", "bookItemTitle");
  judulBuku.textContent = buku.title;

  const penulisBuku = document.createElement("p");
  penulisBuku.setAttribute("data-testid", "bookItemAuthor");
  penulisBuku.textContent = `Penulis: ${buku.author}`;

  const tahunBuku = document.createElement("p");
  tahunBuku.setAttribute("data-testid", "bookItemYear");
  tahunBuku.textContent = `Tahun: ${buku.year}`;

  const kontainerTombol = document.createElement("div");
  kontainerTombol.className = "tombol-aksi-buku";

  const tombolUbahStatus = document.createElement("button");
  tombolUbahStatus.setAttribute("data-testid", "bookItemIsCompleteButton");
  tombolUbahStatus.textContent = buku.isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";
  tombolUbahStatus.className = buku.isComplete
    ? "tombol-belum-selesai"
    : "tombol-selesai";
  tombolUbahStatus.addEventListener("click", () => ubahStatusBuku(buku.id));

  const tombolHapus = document.createElement("button");
  tombolHapus.setAttribute("data-testid", "bookItemDeleteButton");
  tombolHapus.textContent = "Hapus Buku";
  tombolHapus.className = "tombol-hapus";
  tombolHapus.addEventListener("click", () => hapusBuku(buku.id));

  const tombolEdit = document.createElement("button");
  tombolEdit.setAttribute("data-testid", "bookItemEditButton");
  tombolEdit.textContent = "Edit Buku";
  tombolEdit.className = "tombol-edit";
  tombolEdit.addEventListener("click", () => editBuku(buku.id));

  kontainerTombol.appendChild(tombolUbahStatus);
  kontainerTombol.appendChild(tombolHapus);
  kontainerTombol.appendChild(tombolEdit);

  div.appendChild(judulBuku);
  div.appendChild(penulisBuku);
  div.appendChild(tahunBuku);
  div.appendChild(kontainerTombol);

  return div;
}

function ubahStatusBuku(idBuku) {
  const indeksBuku = dataBuku.findIndex((buku) => buku.id === idBuku);
  if (indeksBuku !== -1) {
    dataBuku[indeksBuku].isComplete = !dataBuku[indeksBuku].isComplete;

    simpanDataKeStorage();
    tampilkanSemuaBuku();
    perbaruiStatistik();
  }
}

function hapusBuku(idBuku) {
  const indeksBuku = dataBuku.findIndex((buku) => buku.id === idBuku);
  if (indeksBuku !== -1) {
    const bukuYangDihapus = dataBuku[indeksBuku];

    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus buku "${bukuYangDihapus.title}"?`
      )
    ) {
      dataBuku.splice(indeksBuku, 1);
      simpanDataKeStorage();
      tampilkanSemuaBuku();
      perbaruiStatistik();

      tampilkanNotifikasiBOM(
        `Buku "${bukuYangDihapus.title}" berhasil dihapus!`
      );
    }
  }
}

function editBuku(idBuku) {
  const buku = dataBuku.find((buku) => buku.id === idBuku);
  if (!buku) {
    tampilkanNotifikasiBOM("Buku tidak ditemukan!");
    return;
  }

  const judulBaru = window.prompt("Masukkan judul buku baru:", buku.title);
  if (judulBaru === null) return;

  if (judulBaru.trim() === "") {
    tampilkanNotifikasiBOM("Judul buku tidak boleh kosong!");
    return;
  }

  const penulisBaru = window.prompt("Masukkan nama penulis baru:", buku.author);
  if (penulisBaru === null) return;

  if (penulisBaru.trim() === "") {
    tampilkanNotifikasiBOM("Nama penulis tidak boleh kosong!");
    return;
  }

  const tahunBaru = window.prompt("Masukkan tahun terbit baru:", buku.year);
  if (tahunBaru === null) return;

  const tahunBaruInt = parseInt(tahunBaru);
  if (isNaN(tahunBaruInt) || tahunBaru.trim() === "" || tahunBaruInt < 0) {
    tampilkanNotifikasiBOM("Tahun harus berupa angka yang valid!");
    return;
  }

  buku.title = judulBaru.trim();
  buku.author = penulisBaru.trim();
  buku.year = tahunBaruInt;

  simpanDataKeStorage();
  tampilkanSemuaBuku();

  tampilkanNotifikasiBOM(`Buku berhasil diperbarui!`);
}

function cariBuku(event) {
  event.preventDefault();

  const kataKunci = document
    .getElementById("searchBookTitle")
    .value.toLowerCase()
    .trim();

  if (kataKunci === "") {
    tampilkanSemuaBuku();
    setTimeout(() => {
      pergiKeBukuBelumDibaca();
    }, 100);
    return;
  }

  const hasilPencarian = dataBuku.filter((buku) =>
    buku.title.toLowerCase().includes(kataKunci)
  );

  tampilkanHasilPencarian(hasilPencarian, kataKunci);

  setTimeout(() => {
    pergiKeBukuBelumDibaca();
  }, 100);
}

function tampilkanHasilPencarian(hasilPencarian, kataKunci) {
  const kontainerBelumSelesai = document.getElementById("incompleteBookList");
  const kontainerSudahSelesai = document.getElementById("completeBookList");

  kontainerBelumSelesai.innerHTML = "";
  kontainerSudahSelesai.innerHTML = "";

  if (hasilPencarian.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = `Tidak ada buku yang ditemukan dengan kata kunci "${kataKunci}". Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda.`;
    pesanKosong.className = "pesan-kosong";
    kontainerBelumSelesai.appendChild(pesanKosong);

    const pesanKosongSudahSelesai = document.createElement("p");
    pesanKosongSudahSelesai.textContent =
      "Tidak ada hasil pencarian untuk buku yang sudah selesai dibaca.";
    pesanKosongSudahSelesai.className = "pesan-kosong";
    kontainerSudahSelesai.appendChild(pesanKosongSudahSelesai);
    return;
  }

  const bukuBelumSelesai = hasilPencarian.filter((buku) => !buku.isComplete);
  const bukuSudahSelesai = hasilPencarian.filter((buku) => buku.isComplete);

  if (bukuBelumSelesai.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = `Tidak ada buku dengan kata kunci "${kataKunci}" di rak "Belum selesai dibaca".`;
    pesanKosong.className = "pesan-kosong";
    kontainerBelumSelesai.appendChild(pesanKosong);
  } else {
    bukuBelumSelesai.forEach((buku) => {
      const elemenBuku = buatElemenBuku(buku);
      kontainerBelumSelesai.appendChild(elemenBuku);
    });
  }

  if (bukuSudahSelesai.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = `Tidak ada buku dengan kata kunci "${kataKunci}" di rak "Selesai dibaca".`;
    pesanKosong.className = "pesan-kosong";
    kontainerSudahSelesai.appendChild(pesanKosong);
  } else {
    bukuSudahSelesai.forEach((buku) => {
      const elemenBuku = buatElemenBuku(buku);
      kontainerSudahSelesai.appendChild(elemenBuku);
    });
  }
}

function perbaruiStatistik() {
  const totalBuku = dataBuku.length;
  const bukuSelesai = dataBuku.filter((buku) => buku.isComplete).length;
  const bukuBelumSelesai = totalBuku - bukuSelesai;

  document.getElementById("totalBuku").textContent = totalBuku;
  document.getElementById("bukuSelesai").textContent = bukuSelesai;
  document.getElementById("bukuBelumSelesai").textContent = bukuBelumSelesai;
}
