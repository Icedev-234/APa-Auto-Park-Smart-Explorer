async function createData() {
  const data = {
      judet: document.getElementById('judet').value,
      categorie_nationala: document.getElementById('categorie_nationala').value,
      categorie_comunitara: document.getElementById('categorie_comunitara').value,
      marca: document.getElementById('marca').value
  };

  const response = await fetch("/api/bmi-data", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
  });

  if (response.ok) {
      location.reload();
  } else {
      console.error('Failed to create data');
  }
}