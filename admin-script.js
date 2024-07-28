document.addEventListener('DOMContentLoaded', () => {
    loadCitiesForForm();
    document.getElementById('city-form').addEventListener('submit', addCity);
    document.getElementById('business-form').addEventListener('submit', addBusinessProfile);
});

function addCity(event) {
    event.preventDefault();
    const cityName = document.getElementById('city-name').value;
    const townName = document.getElementById('town-name').value;
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push({ city: cityName, town: townName });
    localStorage.setItem('cities', JSON.stringify(cities));
    alert('City/Town added successfully!');
    document.getElementById('city-form').reset();
    loadCitiesForForm();
    notifyParentToUpdate();
}

function addBusinessProfile(event) {
    event.preventDefault();
    const name = document.getElementById('business-name').value;
    const category = document.getElementById('business-category').value;
    const description = document.getElementById('business-description').value;
    const imageFile = document.getElementById('business-image').files[0];
    const area = document.getElementById('business-area').value;

    const reader = new FileReader();
    reader.onloadend = () => {
        const image = reader.result;
        const businesses = JSON.parse(localStorage.getItem(category)) || [];
        businesses.push({ name, description, image, area });
        localStorage.setItem(category, JSON.stringify(businesses));
        alert('Business profile added successfully!');
        document.getElementById('business-form').reset();
        notifyParentToUpdate();
    };
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please select an image.');
    }
}

function loadCitiesForForm() {
    const areaSelect = document.getElementById('business-area');
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    areaSelect.innerHTML = cities.map(city => `<option value="${city.city}, ${city.town}">${city.city}, ${city.town}</option>`).join('');
}

function notifyParentToUpdate() {
    window.parent.postMessage('updateData', '*');
}
