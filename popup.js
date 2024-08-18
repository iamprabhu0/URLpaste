document.getElementById('copyBtn').addEventListener('click', async () => {
    try {
        let tabs = await browser.tabs.query({
            currentWindow: true,
            highlighted: true,
        });

        let urls = tabs.map(tab => tab.url);
        let result = urls.join('\n');

        await navigator.clipboard.writeText(result);
        console.log('URLs copied to clipboard');
    } catch (error) {
        console.error('Error copying URLs to clipboard:', error);
    }
});

document.getElementById('pasteBtn').addEventListener('click', async () => {
    try {
        let pasteArea = document.getElementById('pasteArea');
        pasteArea.value = "";
        pasteArea.style.display = 'block';

        document.body.style.width = '800px';
        document.body.style.height = '400px';

        pasteArea.style.height = '400px';

        let pasteBtn = document.getElementById('pasteBtn');
        pasteBtn.textContent = 'Open';
        pasteBtn.removeEventListener('click', arguments.callee);

        pasteBtn.addEventListener('click', () => {
            console.log('Open button clicked');
        });
    } catch (error) {
        console.error('Error pasting text from clipboard:', error);
    }
});
