const cardsData = [
    {
        "name": "Fonbet",
        "rating": 4.5,
        "bonus": "10 000 ₽",
        "code": "BK_CODE",
        "logoURL": "source/logos/fonbet.png",
        "pros": [
            "Простая регистрация",
            "Большой выбор ставок"
        ],
        "cons": [
            "Мало трансляций"
        ],
        "siteURL": "https://www.fonbet.ru",
        "appleStoreURL": "https://apps.apple.com/app/idXXXXXXXXX",
        "googlePlayURL": "https://play.google.com/store/apps/details?id=XXXXXXX"
    },

    {
        "name": "БЕТСИТИ",
        "rating": 3.6,
        "bonus": "8 000 ₽",
        "code": "AN_CODE",
        "logoURL": "https://betonmobile.ru/wp-content/uploads/2020/09/Betcity-3.png",
        "pros": [
            "Удобный интерфейс",
            "Быстрая регистрация"
        ],
        "cons": [
            "Мало предложений по ставкам"
        ],
        "siteURL": "https://www.betsiti.ru",
        "appleStoreURL": "https://apps.apple.com/app/idXXXXXXXXX",
        "googlePlayURL": "https://play.google.com/store/apps/details?id=XXXXXXX"
    }
];

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const maxStars = 5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<img src="source/star.svg" alt="Full Star">';
    }

    const decimalPart = rating % 1;
    if (decimalPart >= 0.7) {
        starsHTML += '<img src="source/star.svg" alt="Full Star">'; 
    } else if (decimalPart > 0.3) {
        starsHTML += '<img src="source/star-half.svg" alt="Half Star">';
    }

    const totalStars = fullStars + (decimalPart >= 0.8 ? 1 : (decimalPart > 0.3 ? 1 : 0));
    const remainingStars = maxStars - totalStars;

    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<img src="source/star-empty.svg" alt="Empty Star">';
    }

    return starsHTML;
}





window.onload = function() {
    const cardsContainer = document.querySelector('.card-container');

    cardsData.forEach((card, index) => {
        const prosHTML = card.pros.map(pro => 
            `<div class="review pos">
                <img src="source/thumb-up.svg" alt="Thumb Up">
                ${pro}
            </div>`
        ).join('');

        const consHTML = card.cons.map(con => 
            `<div class="review neg">
                <img src="source/thumb-down.svg" alt="Thumb Down">
                ${con}
            </div>`
        ).join('');

        const cardHTML = `
            <div class="card">
                <div class="left-wr">
                    <div class="top-wr">
                        <a href="${card.siteURL}" target="_blank" class="logo-link">
                            <img src="${card.logoURL}" alt="${card.name} Logo" onerror="this.closest('.top-wr').style.display='none'; this.parentElement.style.display='none';">
                        </a>
                        <div class="down-wr phone logo" id="mobile-links-${index}">
                            <a href="${card.appleStoreURL}" class="link-btn" target="_blank">
                                <img src="source/apple-phone.svg" alt="Apple">
                            </a>
                            <a href="${card.googlePlayURL}" class="link-btn" target="_blank">
                                <img src="source/android-phone.svg" alt="Android">
                            </a>
                        </div>
                    </div>
                    
                    <div class="name-wr">
                        <h1>${card.name}</h1>
                        <div class="stars">
                            ${generateStars(card.rating)} ${card.rating}
                        </div>
                        <div class="bonus">
                            <a href="${card.siteURL}" target="_blank">
                                <img src="source/gift.svg">
                                ${card.bonus}
                            </a>
                        </div>
                    </div>
                    <button class="more-btn" data-index="${index}">
                        Подробнее
                        <img src="source/more.svg" alt="More Icon">
                    </button>
                    <div class="btn-wr">
                        <a href="${card.siteURL}" class="link-btn www" target="_blank">
                            Перейти на сайт
                            <img src="source/link.svg" alt="Link Icon">
                        </a>
                        <div class="down-wr">
                            <a href="${card.appleStoreURL}" class="link-btn" target="_blank">
                                <img src="source/apple.svg" alt="Apple">
                            </a>
                            <a href="${card.googlePlayURL}" class="link-btn" target="_blank">
                                <img src="source/android.svg" alt="Android">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="right-wr more-details" id="details-${index}">
                    <div class="more-wr">
                        <h3>Бонус ${card.bonus}</h3>
                        <p>Фрибет за регистрацию по промокоду</p>
                        <button class="copy" data-code="${card.code}" onclick="copyToClipboard(this)">
                            ${card.code} <img src="source/copy.svg" alt="Copy Icon">
                        </button>
                    </div>
                    <div class="reviews-wr">
                        <h3>Плюсы и минусы ${card.name}</h3>
                        ${prosHTML}
                        ${consHTML}
                    </div>
                </div>
                <a href="${card.siteURL}" class="link-btn www phone" target="_blank">
                    Перейти на сайт
                    <img src="source/link.svg" alt="Link Icon">
                 </a>
            </div>
        `;

        cardsContainer.innerHTML += cardHTML;

        // Добавляем разделительную линию, если это не последняя карточка
        if (index < cardsData.length - 1) {
            cardsContainer.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8px" fill="none">
                    <path d="M0 4.47961H900" stroke="#1B252B" stroke-opacity="0.25" stroke-width="7"/>
                </svg>
            `;
        }
    });

    // Добавляем функциональность для кнопки "Подробнее" только для экранов < 640px
    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            const details = document.getElementById(`details-${index}`);
            const icon = button.querySelector('img');
        
            if (details.style.display === 'none' || !details.style.display) {
                details.style.display = 'flex';
                button.innerHTML = 'Скрыть подробности <img src="source/more-rotated.svg" alt="More Icon">';
            } else {
                details.style.display = 'none';
                button.innerHTML = 'Подробнее <img src="source/more.svg" alt="More Icon">';
            }
        });
    });

    
    
    
};
function copyToClipboard(button) {
    const code = button.getAttribute("data-code");
    const tempInput = document.createElement("input");
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Для мобильных устройств
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Показываем уведомление о том, что код скопирован
    button.innerHTML = `Скопировано! <img src="source/copy-check.svg" alt="Copied Icon">`;

    // Через некоторое время возвращаем исходный текст
    setTimeout(() => {
        button.innerHTML = `${code} <img src="source/copy.svg" alt="Copy Icon">`;
    }, 2000);
}
