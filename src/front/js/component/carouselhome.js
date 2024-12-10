import React from "react";


export const Carousel = () => {
    return (


        <div id="carouselHero" className="carousel slide w-50  h-50 mx-auto" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://images.pexels.com/photos/14774567/pexels-photo-14774567.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 1" />
                </div>
                
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/7937049/pexels-photo-7937049.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd75459b029f544a4ec2/previews/6737dd7b459b029f544a5133/download/ella-olsson-lMcRyBx4G50-unsplash.webp" className="d-block w-100" alt="Slide 3" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/7991936/pexels-photo-7991936.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 4" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd518155bce7f31244ae/previews/6737dd548155bce7f3124daf/download/wesual-click-HK4n3W95F2c-unsplash.webp" className="d-block w-100" alt="Slide 5" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 6" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/7031705/pexels-photo-7031705.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 7" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd75459b029f544a4ec2/previews/6737dd7b459b029f544a5133/download/ella-olsson-lMcRyBx4G50-unsplash.webp" className="d-block w-100" alt="Slide 8" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 8" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};