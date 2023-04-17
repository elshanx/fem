const summaryContainer = document.getElementById('summary-score');

const fetchSummaryData = async () => {
  const data = await fetch('./data.json');
  const json = await data.json();
  return json;
};

fetchSummaryData().then((res) => {
  res.forEach(createSummaryItem);
});

const createSummaryItem = ({ category, score, icon, bgColor, textColor }) => {
  const li = document.createElement('li');

  li.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'rounded-xl');
  li.style.backgroundColor = bgColor;

  li.innerHTML = `
    <div class="flex items-center gap-x-3">
      <img src="${icon}" alt="${category} icon" />
      <span style="color: ${textColor}">${category}</span>
    </div>
    <div class="font-bold">
      <span>${score}</span>
      <span class="text-[#9B989F]">/</span>
      <span class="text-[#9B989F]">100</span>
    </div>
  `;

  summaryContainer.appendChild(li);
};
