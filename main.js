document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('admin-modal');
    const btn = document.getElementById('admin-button');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
        loadAllData();  // Reload data when modal is closed
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            loadAllData();  // Reload data when modal is closed
        }
    }

    document.getElementById('search-form').addEventListener('submit', searchBusinesses);

    loadAllData();  // Initial load of data
});

function loadAllData() {
    loadCategories();
    loadCities();
    loadTopBusinesses('restaurants', 'top-food-content');
    loadTopBusinesses('schools', 'top-schools-content');
    loadTopBusinesses('real estate', 'top-real-estate-content');
    loadTopBusinesses('law firms', 'top-law-firms-content');
    loadTopBusinesses('clinics', 'top-clinics-content');
}

function loadCategories() {
    const categories = ['restaurants', 'schools', 'real estate', 'law firms', 'clinics'];
    const searchCategory = document.getElementById('search-category');
    searchCategory.innerHTML = categories.map(category => `
        <option value="${category}">${category.replace('-', ' ')}</option>
    `).join('');

    const categoriesContent = document.getElementById('categories-content');
    categoriesContent.innerHTML = categories.map(category => `
        <div class="category-card">
            <h3>${category.replace('-', ' ')}</h3>
        </div>
    `).join('');
}

function loadCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const searchArea = document.getElementById('search-area');
    const businessArea = document.getElementById('business-area');
    searchArea.innerHTML = cities.map(city => `
        <option value="${city.city}, ${city.town}">${city.city}, ${city.town}</option>
    `).join('');
    businessArea.innerHTML = searchArea.innerHTML;
}

function loadTopBusinesses(type, elementId) {
    const businesses = JSON.parse(localStorage.getItem(type)) || [];
    const businessList = document.getElementById(elementId);
    businessList.innerHTML = businesses.map(business => `
        <div class="business-card">
            <img src="${business.image}" alt="${business.name}" onerror="this.onerror=null; this.src='placeholder.jpg';">
            <h3>${business.name}</h3>
            <p>${business.description}</p>
            <p><strong>Area:</strong> ${business.area}</p>
        </div>
    `).join('');
}

function searchBusinesses(event) {
    event.preventDefault();
    const area = document.getElementById('search-area').value;
    const category = document.getElementById('search-category').value;
    const businesses = JSON.parse(localStorage.getItem(category)) || [];
    const searchResults = document.getElementById('search-results');
    const filteredBusinesses = businesses.filter(business => business.area === area);
    searchResults.innerHTML = filteredBusinesses.map(business => `
        <div class="business-card">
            <img src="${business.image}" alt="${business.name}" onerror="this.onerror=null; this.src='placeholder.jpg';">
            <h3>${business.name}</h3>
            <p>${business.description}</p>
            <p><strong>Area:</strong> ${business.area}</p>
        </div>
    `).join('');
}
