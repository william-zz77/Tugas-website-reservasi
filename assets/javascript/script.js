const form = document.getElementById("reservationForm");
const table = document.getElementById("dataTable");

let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
let editIndex = -1;

function renderTable() {
  table.innerHTML = "";

  reservations.forEach((res, index) => {
    table.innerHTML += `
      <tr>
        <td>${res.nama}</td>
        <td>${res.band}</td>
        <td>${res.tanggal}</td>
        <td>${res.durasi} jam</td>
        <td>
          <button class="btn-warning" onclick="editData(${index})">Edit</button>
          <button class="btn-danger" onclick="deleteData(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

function saveToLocalStorage() {
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const band = document.getElementById("band").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const durasi = document.getElementById("durasi").value;

  // ✅ VALIDASI (sesuai tugas dosen)
  if (!nama || !band || !tanggal || !durasi) {
    alert("Semua field wajib diisi!");
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(nama)) {
    alert("Nama hanya boleh huruf!");
    return;
  }

  if (nama.length < 3) {
    alert("Nama minimal 3 karakter!");
    return;
  }

  if (durasi <= 0) {
    alert("Durasi harus lebih dari 0!");
    return;
  }

  const data = { nama, band, tanggal, durasi};

  if (editIndex === -1) {
    reservations.push(data); // CREATE
    alert("Reservasi berhasil disimpan!");
  } else {
    reservations[editIndex] = data; // UPDATE
    editIndex = -1;
    alert("Reservasi berhasil diperbarui!");
  }

  saveToLocalStorage();
  renderTable();
  form.reset();
});

window.editData = function(index) {
  const res = reservations[index];

  document.getElementById("nama").value = res.nama;
  document.getElementById("band").value = res.band;
  document.getElementById("tanggal").value = res.tanggal;
  document.getElementById("durasi").value = res.durasi;

  editIndex = index;
};

window.deleteData = function(index) {
  if (confirm("Yakin ingin menghapus reservasi ini?")) {
    reservations.splice(index, 1); // DELETE
    saveToLocalStorage();
    renderTable();
    alert("Reservasi dihapus!");
  }
};

// READ saat load
renderTable();