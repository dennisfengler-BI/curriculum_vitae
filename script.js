// Google Pixel 9 Palette matching CSS
const colors = {
    accent1: '#C2DFD2', // Wintergreen
    accent2: '#D67185', // Peony
    accent3: '#252525', // Obsidian
    accent4: '#F4F1EC', // Porcelain
    grid: '#D3E4DC',    // Darker Wintergreen
    textMain: '#252525',// Obsidian
    textMuted: '#5e6160'
};

Chart.defaults.color = colors.textMuted;
Chart.defaults.font.family = "'Inter', sans-serif";

const customHtmlLabelsPlugin = {
    id: 'customHtmlLabels',
    afterUpdate(chart) {
        const container = document.getElementById('radar-html-labels');
        if (!container) return;
        
        const scale = chart.scales.r;
        if (!scale || !scale._pointLabelItems) return;

        if (container.children.length !== chart.data.labels.length) {
            container.innerHTML = '';
            chart.data.labels.forEach(labelArray => {
                const div = document.createElement('div');
                div.className = 'radar-html-label';
                div.innerHTML = `
                    <div class="radar-title">${labelArray[0]}</div>
                    <div class="radar-sub">${labelArray[1]}</div>
                    <div class="radar-sub">${labelArray[2]}</div>
                `;
                container.appendChild(div);
            });
        }

        const labelElements = container.children;
        scale._pointLabelItems.forEach((item, index) => {
            const div = labelElements[index];
            div.style.left = item.x + 'px';
            div.style.top = item.y + 'px';
            
            // Align position based on Chart.js native calculation
            if (item.textAlign === 'center') {
                div.style.transform = 'translate(-50%, -50%)';
            } else if (item.textAlign === 'right') {
                div.style.transform = 'translate(-100%, -50%)';
            } else {
                div.style.transform = 'translate(0, -50%)';
            }
        });
    }
};

// Skills Radar Chart (Data & Finance combined)
const radarCtx = document.getElementById('skillsRadar').getContext('2d');
new Chart(radarCtx, {
    type: 'radar',
    data: {
        labels: [
            ['End 2 End Data Management', 'Data Transformation & Modeling [SQL, DAX]', 'ETL, Data Warehousing [SQL]'], 
            ['Ownership-Mentalität', 'Souveräne Kommunikation', 'Change Management'], 
            ['Finance & Accounting', 'Balance Sheet Analysis', 'Income Statement & Cash Flow Analysis'], 
            ['Cost Accounting', 'Cost Center Analysis', 'Product & Project Cost Calculation'], 
            ['Management Reporting', 'Budgeting, Forecasting & Variance Analysis', 'Operations & Strategic Controlling'], 
            ['Data Visualization Engineering', 'UX/UI', 'Report Design & Storytelling']
        ],
        datasets: [{
            label: 'Proficiency Level',
            data: [4, 4, 3, 4, 4, 5],
            backgroundColor: 'rgba(194, 223, 210, 0.3)', // Wintergreen with opacity
            borderColor: colors.accent1, // Wintergreen
            pointBackgroundColor: colors.accent2, // Peony
            pointBorderColor: colors.accent2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors.accent2,
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 5,
                angleLines: { color: colors.grid },
                grid: { color: colors.grid },
                pointLabels: {
                    color: 'transparent', /* Hide default canvas text to use HTML overlay */
                    font: { size: 11, weight: '600' }
                },
                ticks: { display: false, stepSize: 1, count: 6 }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: colors.textMain,
                padding: 10,
                cornerRadius: 6
            }
        }
    },
    plugins: [customHtmlLabelsPlugin]
});
