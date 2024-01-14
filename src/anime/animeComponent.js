
const fetchData = async(newPage) => {
    const queryParams = {
        page: newPage,
    };

    const url = new URL('https://api.jikan.moe/v4/top/anime');
    url.search = new URLSearchParams(queryParams).toString();

    const response = await fetch(url);
    const responseBody = await response.json();
    return responseBody['data'];
}

/**
 *
 * @param {HTMLDivElement} element
 */
export const animeComponent = (element) => {
    const generateCard = (data) => {
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
    fetchData(2)
        .then( generateCard );
}