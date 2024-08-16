const urlpaste = async () => {
    try {
        let tabs = await browser.tabs.query({
            currentWindow: true,
            highlighted: true,
        });

        let urls = tabs.map(tab => tab.url);
        let result = urls.join('\n');

        await navigator.clipboard.writeText(result)
        console.log('URLs copied to clipboard');
    } catch (error) {
        console.error('Error copying URLs to clipboard:', error);
    }
};

browser.browserAction.onClicked.addListener(urlpaste);