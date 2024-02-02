async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/HttpAnimation/Flathub-Rewritten/repo/Repo.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function generateFlatpakCards() {
    const container = document.getElementById('content');

    const jsonData = await fetchData();

    jsonData.forEach(entry => {
        const flatpakData = entry.Flatpak;

        for (const appName in flatpakData) {
            const appData = flatpakData[appName];
            const card = document.createElement('div');
            card.classList.add('flatpak-card');

            card.innerHTML = `
                <div class="icon-title">
                    <img src="${appData['Icon']}" alt="${appName} Icon">
                    <h2>${appName}</h2>
                </div>
                <img src="${appData['Main-Photo']}" alt="${appName} Image">
                <p>${appData.Description}</p>
                <p><strong>Publisher:</strong> ${appData.Publisher}</p>
                <p>
                    <strong>Install Command:</strong> <br> 
                    <code class="install-command" onclick="copyToClipboard(this)">${appData['Install command']}</code><br>
                    <strong>Run Command:</strong> <br> 
                    <code class="run-command" onclick="copyToClipboard(this)">${appData['Run command']}</code>
                </p>
                <a href="${appData.Source}" target="_blank">View on Flathub</a>
            `;

            container.appendChild(card);
        }
    });
}

function copyToClipboard(element) {
    const commandText = element.innerText;
    const textarea = document.createElement('textarea');
    textarea.value = commandText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert(`${commandText} copied to clipboard!`);
}

generateFlatpakCards();

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarWidth = sidebar.offsetWidth;

    if (sidebar.style.transform === 'translateX(0px)') {
        sidebar.style.transform = `translateX(-${sidebarWidth}px)`;
        content.style.marginLeft = '0';
    } else {
        sidebar.style.transform = 'translateX(0)';
        content.style.marginLeft = `${sidebarWidth}px`;
    }
}