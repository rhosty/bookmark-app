const addBookmark = document.getElementById('header');
const form = document.getElementById('bookmark-form');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
let addButton = document.getElementById('add');
const bookingsContainer = document.getElementById('bookingsContainer');
let getWebsiteUrl = document.getElementById('website-url');
let getWebsiteName = document.getElementById('website-name');
let modalOutside = document.getElementById('modalOutside');
let websiteUrl = "";
let websiteName = "";
let bookmarks = [];



//eventlistener
addBookmark.addEventListener('click', toggleModal);
closeModal.addEventListener('click', toggleModal);
modalOutside.addEventListener('click', toggleModal);
form.addEventListener('submit', preventDefault);
form.addEventListener('submit', updateWebsiteUrl);
form.addEventListener('submit', updateWebsiteName);
form.addEventListener('submit', pushIntoBookmarks);
form.addEventListener('submit', loadBookmark);
form.addEventListener('submit', storeBookmarksinLocalStorage);
form.addEventListener('submit', resetForm);


// reset form
function resetForm() {
    document.getElementById('bookmark-form').reset();
}

// function to open the modal
function toggleModal() {
    modal.classList.toggle('active');
    
}

// function that updates websiteUrl
function updateWebsiteUrl() {
    websiteUrl = getWebsiteUrl.value;

}
// updatest website name
function updateWebsiteName() {
    websiteName = getWebsiteName.value;
}

// function to push bookmark info in to array
function pushIntoBookmarks() {
        let bookmark = {
            name: getWebsiteName.value,
            adresse: getWebsiteUrl.value
        }
        bookmarks.push(bookmark);
   
}

// stores bookmarks in local storage
function storeBookmarksinLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}


// load Bookmarks from local storage onLoad
function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else {
        bookmarks = [{
            name: 'Github',
            adresse: 'www.github.com',
        }, ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}
fetchBookmarks()

//load bookmarks on load
function loadBookmark() {
    bookingsContainer.textContent = "";
    bookmarks.forEach((bookmark) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.id = "card";
        const nameWrapper = document.createElement('div');
        nameWrapper.classList.add('name');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid', 'fa-xmark')
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${bookmark.name}')`);
        const newLink = document.createElement('a');
        newLink.classList.add('name');
        newLink.setAttribute('href', `https://${bookmark.adresse}`);
        newLink.target = "_blank";
        newLink.textContent = bookmark.name;
        const newFavIcon = document.createElement('img');
        newFavIcon.src = `https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.adresse}`;
        newFavIcon.style.height = '20px';
        bookingsContainer.append(newDiv);
        newDiv.append(closeIcon);
        newDiv.append(nameWrapper);
        nameWrapper.append(newFavIcon);
        nameWrapper.append(newLink);
    })
};

loadBookmark();

// deletes bookmarks
function deleteBookmark(websiteName) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.name === websiteName) {
            bookmarks.splice(i, 1);

        }
    })
    storeBookmarksinLocalStorage()
    loadBookmark()
};

//function that prefents default on form
function preventDefault(e){
    e.preventDefault();
}
