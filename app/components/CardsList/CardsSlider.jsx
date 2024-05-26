import Swiper from 'swiper';
import { AutoPlay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const CardsSlider = (props) => {

    useEffect(() => {
    const options = {
        loop: false,
        spaceBetween: 10,
        allowTouchMove: true,
        slidesPerView: 1,
        autoplay: {
        enabled: false,
    },
        pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        enabled: true,
        clickable: true,
    },
        breakpoints: {
        450: {
            loop: true,
            spaceBetween: 20,
            slidesPerView: "auto",
            allowTouchMove: false,
            speed: 6500,
            autoplay: {
            enabled: true,
            delay: 0,
        },
            pagination: {
                enabled: false,
            },
        },
    },
        modules: [Autoplay, Pagination],
    };
        new Swiper(".swiper", options);
    }, []); 


    return (
    <>
                // Slider main container / Главный контейнер слайдера
        <div className={`swiper ${Styles["slider"]}`}>
                // Additional required wrapper / Дополнительная обёртка для списка карточек 
        <ul className={`swiper-wrapper ${Styles["slider-wrapper"]}`}>
            {props.data.map((item, i) => {
                return (
                        // Slides / Слайды
                    <li className={`swiper-slide ${Styles["slide"]}`} key={i}>
                        <Link href={`/games/${item.id}`}>
                            <Card {...item} />
                        </Link>
                    </li>
                );
            })}
        </ul>
                // If we need pagination / Класс для постраничной нумерации
        <div className={`swiper-pagination ${Styles["pagination"]}`}></div>
      </div>
    </>
  );
};