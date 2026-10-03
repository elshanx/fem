const form = document.getElementById('ip-form');
const input = document.getElementById('ip-input');
const submitBtn = document.getElementById('submit-btn');
const errorEl = document.getElementById('form-error');

const ipAddressEl = document.getElementById('ip-address');
const locationEl = document.getElementById('location');
const timezoneOffsetEl = document.getElementById('timezone-offset');
const ispEl = document.getElementById('isp');

const markerIcon = L.icon({
  iconUrl: '/images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

let map;
let marker;

const showError = (message) => {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
};

const clearError = () => {
  errorEl.textContent = '';
  errorEl.classList.add('hidden');
};

const setLoading = (isLoading) => {
  submitBtn.disabled = isLoading;
};

const renderInfo = ({ ip, location, isp }) => {
  ipAddressEl.textContent = ip;
  locationEl.textContent = `${location.city}, ${location.region} ${location.postalCode}`.trim();
  timezoneOffsetEl.textContent = location.timezone;
  ispEl.textContent = isp;
};

const renderMap = ({ lat, lng }) => {
  if (!map) {
    map = L.map('map', { zoomControl: false }).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
  } else {
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
  }
};

const fetchIpInfo = async (query) => {
  const path = query ? `/api/ip-lookup?ipAddress=${encodeURIComponent(query)}` : '/api/ip-lookup';
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error('Could not find that IP address or domain. Try another one.');
  }

  return response.json();
};

const lookup = async (query) => {
  clearError();
  setLoading(true);

  try {
    const data = await fetchIpInfo(query);
    renderInfo(data);
    renderMap(data.location);
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(false);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) {
    showError('Please enter an IP address or domain.');
    return;
  }
  lookup(query);
});

lookup();
