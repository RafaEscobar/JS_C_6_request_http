
const fetchData = async(newPage) => {
    const url = new URL('https://api.jikan.moe/v4/top/anime');
    url.search = new URLSearchParams({
        page: newPage,
    }).toString();

    const response = await fetch(url);
    const responseBody = await response.json();
    return responseBody['data'];
}

const showBtn = (option) => {
    const nextPageBtn = document.querySelector("#nextPageBtn");
    (option == 'hidden') ? nextPageBtn.setAttribute('hidden', true) : nextPageBtn.removeAttribute('hidden');
}

const generateCard = (data, element) => {
    for (const item of data) {
        const animeCard = document.createElement("div");
        animeCard.innerHTML = `
            <div class="p-4 bg-gray-800 w-56 text-white rounded-xl">
                <img src="${item.images.jpg.image_url}" alt="" class="shadow-white shadow-sm h-72">
                <span class="block font-semibold text-center mt-2">${item.title}</span>
                <span class="block text-center text-blue-300 text-sm mt-2 hover:text-blue-200">
                    <a href="${item.trailer.url}" target="_blank">Trailer</a>
                </span>
            </div>
        `;
        element.appendChild(animeCard);
    }
}

/**
 *
 * @param {HTMLDivElement} element
 */
export const animeComponent = async(element, currentPage = 1) => {
    showBtn('hidden');
    element.innerHTML = null;

    await fetchData(currentPage)
        .then( (data) => generateCard(data, element) );

    showBtn('show');
}