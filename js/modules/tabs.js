function tabs (tabAll, contentTab, activClass) {

    let tabs = document.querySelectorAll(tabAll);
    let tabsContent = document.querySelectorAll(contentTab);

    tabsContent.forEach((item, i) => {
        item.classList.add('tabDisabled');
        tabsContent[0].classList.remove('tabDisabled');
    });

    function disabledTab (collection) {
        collection.forEach(item => {
            item.classList.remove('tabBlock');
            item.classList.add('tabDisabled');
        });
    }

    function deleteClass (collection) {
        collection.forEach(item => {
            item.classList.remove(activClass);
        });
    }

    tabs.forEach( (tab, i) => {
        tab.addEventListener('click', () => {
            deleteClass(tabs);
            disabledTab(tabsContent);
            tab.classList.add(activClass);
            tabsContent[i].classList.remove('tabDisabled');
            tabsContent[i].classList.add('tabBlock');
        });
    });
}

export default tabs;