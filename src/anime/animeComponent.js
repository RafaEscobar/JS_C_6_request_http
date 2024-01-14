
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
    setContentNull(element);
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

const showLoading = (element) => {
    element.innerHTML = `
        <div class="w-full h-screen flex justify-center items-center">
            <div class="flex items-center gap-2">
                <span class="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 animate-bounce">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </span>
                <span class="block animate-bounce text-6xl">Cargando...</span>
            </div>
        </div>
    `;
}

const setContentNull = (element) => {
    element.innerHTML = null;
}

/**
 *
 * @param {HTMLDivElement} element
 */
export const animeComponent = async(element, currentPage = 1) => {
    showBtn('hidden');
    setContentNull(element);
    showLoading(element);

    await fetchData(currentPage)
        .then( (data) => generateCard(data, element) );

    showBtn('show');
}