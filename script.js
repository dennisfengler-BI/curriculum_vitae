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
            ['ETL & Spark SQL', 'Subpoint 1', 'Subpoint 2'], 
            ['DAX & Data Modeling', 'Subpoint 1', 'Subpoint 2'], 
            ['Power Apps & Intranet', 'Subpoint 1', 'Subpoint 2'], 
            ['T-SQL', 'Subpoint 1', 'Subpoint 2'], 
            ['Management Reporting', 'Subpoint 1', 'Subpoint 2'], 
            ['Cost Accounting', 'Subpoint 1', 'Subpoint 2'], 
            ['Regulatory Compliance', 'Subpoint 1', 'Subpoint 2'], 
            ['Accounting', 'Subpoint 1', 'Subpoint 2']
        ],
        datasets: [{
            label: 'Proficiency Level',
            data: [95, 100, 80, 85, 95, 85, 80, 90],
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
                angleLines: { color: colors.grid },
                grid: { color: colors.grid },
                pointLabels: {
                    color: 'transparent', /* Hide default canvas text to use HTML overlay */
                    font: { size: 11, weight: '600' }
                },
                ticks: { display: false, min: 0, max: 100 }
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
