document.getElementById('copyBtn').addEventListener('click', async () => {
    try {
        let tabs = await browser.tabs.query({
            currentWindow: true,
            highlighted: true,
        });

        let urls = tabs.map(tab => tab.url);
        let result = urls.join('\n');

        await navigator.clipboard.writeText(result);

        let notification = document.getElementById('notification');
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 1000);
    } catch (error) {
        console.error('Error copying URLs to clipboard:', error);
    }
});

const handlePasteClick = async () => {
    try {
        let pasteArea = document.getElementById('pasteArea');
        pasteArea.value = "";
        pasteArea.style.display = 'block';

        document.body.style.width = '800px';
        document.body.style.height = '400px';
        pasteArea.style.width = '780px';
        pasteArea.style.height = '350px';

        let pasteBtn = document.getElementById('pasteBtn');
        pasteBtn.textContent = 'Open';
        pasteBtn.removeEventListener('click', handlePasteClick);

        pasteBtn.addEventListener('click', () => {
            let urls = pasteArea.value.split('\n').filter(url => url.trim() !== '');
            urls.forEach(url => {
                try {
                    new URL(url);
                    browser.tabs.create({ url: url });
                } catch (e) {
                    console.error(`Invalid URL: ${url}`);
                }
            });
        });
    } catch (error) {
        console.error('Error processing paste operation:', error);
        alert('Failed to process paste operation. Check console for details.');
    }
};

document.getElementById('pasteBtn').addEventListener('click', handlePasteClick);
