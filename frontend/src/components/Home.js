import slide01 from '../static/slide01.jpg'
import slide02 from '../static/slide02.jpg'
import slide033 from '../static/slide033.jpg'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


const Home = () => {
  return (

  <div className="row">
    <Carousel variant="dark" fade>

        <Carousel.Item>
          <div  >
            <img
              className="d-block w-100 "
              src={slide01}
              alt="First slide"
            />
              <Carousel.Caption class="carousesl">
               <div className="carousesl_txt">

                   <div class="cardR">
                   <Link to="/manage">
                      <button data-text="Awesome" class="buttonRR cityR">
                        <span class="actual-textRR">Manage_Events</span>
                        <span class="hover-textRR" aria-hidden="true">Manage_Events</span>
                   </button>
                   </Link>
                     <p class="weatherR">You can manage all Event information </p>
                     <p class="weatherR"> Click on the Manage_Events to see more details </p>
                        <div class="minR">
                        </div>
                </div>
               </div>
             </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div  >
            <img
              className="d-block w-100 "
              src={slide01}
              alt="First slide"
            />
              <Carousel.Caption class="carousesl">
               <div className="carousesl_txt">

                   <div class="cardR">
                   <Link to="/manage">
                      <button data-text="Awesome" class="buttonRR cityR">
                        <span class="actual-textRR">Manage_Events</span>
                        <span class="hover-textRR" aria-hidden="true">Manage_Events</span>
                   </button>
                   </Link>
                     <p class="weatherR">You can manage all Event information </p>
                     <p class="weatherR"> Click on the Manage_Events to see more details </p>
                        <div class="minR">
                        </div>
                </div>
               </div>
             </Carousel.Caption>
          </div>
        </Carousel.Item>

      

      

    </Carousel>
    </div>

  );
};

export default Home;