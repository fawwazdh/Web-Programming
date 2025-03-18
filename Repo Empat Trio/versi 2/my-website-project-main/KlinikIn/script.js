document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("patientForm");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const complaintInput = document.getElementById("complaint");
    const tableBody = document.querySelector("tbody");
  
    let editRow = null;
  
    // Handle form submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const name = nameInput.value.trim();
        const age = ageInput.value.trim();
        const complaint = complaintInput.value.trim();
  
        if (!validateForm(name, age, complaint)) {
            return;
        }
  
        if (editRow) {
            updateRow(name, age, complaint);
        } else {
            addRow(name, age, complaint);
        }
  
        resetForm();
    });
  
  
  function validateForm(name, age, complaint) {
  
      console.log("Before Processing: ", { name, age, complaint });
  
      const nameRegex = /^[A-Za-z\s]+$/;
  
      name = name.trim();
      age = age.trim();  // Hapus spasi dulu biar aman
      complaint = complaint.trim();
  
      console.log("After Trim: ", { name, age, complaint });
  
      // Cek apakah age kosong atau bukan angka
      if (age === "" || isNaN(Number(age))) {
          alert("Umur harus angka antara 1 - 120!");
          return false;
      }
  
      age = parseInt(age); // Baru konversi setelah validasi awal
  
      console.log("Debug: ", { name, age, complaint });
  
      if (name === "") {
          alert("Nama tidak boleh kosong!");
          return false;
      }
  
      if (!nameRegex.test(name)) {
          alert("Nama hanya boleh berisi huruf dan spasi!");
          return false;
      }
  
      if (age <= 0 || age > 120) {
          alert("Umur harus angka antara 1 - 120!");
          return false;
      }
  
      if (complaint.length < 5) {
          alert("Keluhan harus minimal 5 karakter!");
          return false;
      }
  
      return true;
  }
  
  
  
    // Fungsi menambahkan pasien baru ke tabel
    function addRow(name, age, complaint) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${complaint}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
  
        attachRowListeners(row);
    }
  
    // Fungsi untuk mengupdate data pasien
    function updateRow(name, age, complaint) {
        editRow.cells[0].textContent = name;
        editRow.cells[1].textContent = age;
        editRow.cells[2].textContent = complaint;
        editRow = null;
    }
  
    // Fungsi menghapus pasien dari tabel
    function deleteRow(row) {
        row.remove();
    }
  
    // Fungsi untuk mengisi form saat mengedit
    function editRowData(row) {
        nameInput.value = row.cells[0].textContent;
        ageInput.value = row.cells[1].textContent;
        complaintInput.value = row.cells[2].textContent;
        editRow = row;
    }
  
    // Fungsi untuk membersihkan form
    function resetForm() {
        form.reset();
        editRow = null;
    }
  
    // Menambahkan event listener untuk tombol edit dan hapus
    function attachRowListeners(row) {
        row.querySelector(".edit").addEventListener("click", function () {
            editRowData(row);
        });
  
        row.querySelector(".delete").addEventListener("click", function () {
            if (confirm("Yakin ingin menghapus pasien ini?")) {
                deleteRow(row);
            }
        });
    }
  });