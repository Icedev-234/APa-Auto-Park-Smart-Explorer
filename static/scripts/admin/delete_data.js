async function deleteData(event) {
    const elementId = event.currentTarget.getAttribute('name'); // Corrected to use 'name' attribute

    try {
        const response = await fetch(`http://localhost:8000/api/bmi-data/${elementId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error('Eroare la ștergerea datelor');
        }

        // Elimină rândul din tabel
        const rowToRemove = document.getElementById(`row-${elementId}`);
        if (rowToRemove) {
            rowToRemove.remove(); // Elimină rândul din DOM
        } else {
            console.warn(`Rândul cu id-ul ${elementId} nu a fost găsit în tabel.`);
        }

        console.log(`Ștergere reușită pentru elementul cu id-ul ${elementId}`);
    } catch (error) {
        console.error('Eroare la ștergerea datelor:', error);
        // Poți adăuga un mesaj de eroare vizibil utilizatorului în interfața ta
    }
}