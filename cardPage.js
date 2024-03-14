// Koordinatları alma işlemi
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const koordinatlar = JSON.parse(urlParams.get('koordinatlar'));

    // Koordinatları kullanarak tek bir kart oluşturma
    if (koordinatlar && koordinatlar.length > 0) {
        createCard(koordinatlar);
    }
};

// Kart oluşturma işlemi
function createCard(koordinatlar) {
    const main = document.querySelector('main');

    const card = document.createElement('div');
    card.classList.add('card');

    // Yeni Eklendi badge'i ekleniyor
    const newBadge = document.createElement('div');
    newBadge.classList.add('new-badge');
    newBadge.innerText = 'Yeni Eklendi';
    card.appendChild(newBadge);

    const cardContent = `
        <div>
            <h2>Yeni Koordinat</h2>
            <ul>
                ${koordinatlar.map((koordinat, index) => `<li>Location ${index + 1}: (${koordinat.lng.toFixed(6)}, ${koordinat.lat.toFixed(6)})</li>`).join('')}
            </ul>
        </div>
    `;

    card.innerHTML += cardContent; // += kullanarak yeni içeriği ekliyoruz
    main.appendChild(card);
}
