async function deleteData(event) {
    const elementId = event.currentTarget.getAttribute('name'); 

    try {
        const response = await fetch(`http://localhost:8000/api/bmi-data/${elementId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error('Eroare la stergerea datelor');
        }

        const rowToRemove = document.getElementById(`row-${elementId}`);
        if (rowToRemove) {
            rowToRemove.remove();
        } else {
            console.warn(`Randul cu id-ul ${elementId} nu a fost gasit in tabel.`);
        }

        console.log(`Stergere reusita pentru elementul cu id-ul ${elementId}`);
    } catch (error) {
        console.error('Eroare la stergerea datelor:', error);
    }
}