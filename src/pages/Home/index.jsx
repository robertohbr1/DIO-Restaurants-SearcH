import React, { useState } from "react";

import { useSelector } from 'react-redux';
import TextField, { Input } from "@material/react-text-field";
import MaterialIcon from '@material/react-material-icon';
import logo from '../../assets/logo.svg'
import restaurante from '../../assets/restaurante-fake.png';
import {Card, RestaurantCard, Modal, Map, Loader, Skeleton} from '../../components';

import { Container, Search, Logo, Wrapper, Carousel, 
    CarouselTitle, ModalTitle, ModalContent } from './styles';

const Home = () => {
const [inputValue, setInputValue] = useState('');
const [query, setQuery] = useState(null);
const [onlyOpenNow, setOnlyOpenNow] = useState(false);
const [placeId, setPlaceId] = useState(null);
const [modalOpened, setModalOpened] = useState(false);
const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
  };

  function handleKeyPress(e) { 
      if (e.key === 'Enter') {          
          setQuery(inputValue);
      }
   }

   function handleOpenModal(placeId) {
       setPlaceId(placeId);
       setModalOpened(true);
   }

   function changedOpenNow() {
        setOnlyOpenNow(onlyOpenNow ? false : true);
   }

return (
    <Wrapper>
        <Container> 
            <Search>
                <Logo src={logo} alt="Restaurant Logo" />
                <TextField
                    label="Pesquisar Restaurantes"
                    outlined
                    //onTrailingIconSelect={() => this.setState({value : ''})}
                    trailingIcon={<MaterialIcon role="button" icon="search"/>}
                    >
                    <Input type="text" value={inputValue} onKeyPress={handleKeyPress}  onChange={(e) => setInputValue(e.target.value)} />                    
                </TextField>
                <div>                    
                    <input type="checkbox" defaultChecked={onlyOpenNow} onChange={(e) => changedOpenNow()} />
                    <label>Aberto agora</label>                
                </div>
                {restaurants.length > 0 ? (
                    <>
                        <CarouselTitle>Na sua Área</CarouselTitle>
                        <Carousel {...settings}>
                        {restaurants.map((restaurant) => (
                            <Card 
                                key={restaurant.place_id}
                                photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                                title={restaurant.name}
                            />
                        ))}                   
                            
                        </Carousel>   
                    </>
                 ): (
                    <Loader />
                 )}                         
            </Search>
            {restaurants.map((restaurant) => (
                <RestaurantCard  onClick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant} />
            ))}
            
        </Container>
        <Map query={query} placeId={placeId} onlyOpenNow={onlyOpenNow} />
        <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
            {restaurantSelected ? (
                <>
            <ModalTitle>{restaurantSelected?.name}</ModalTitle>
            <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
            <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto Agora :-)' : 'Fechado :-('}</ModalContent>
            {restaurantSelected?.opening_hours?.weekday_text ? (
                <>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[0]}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[1]}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[2]}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[3]}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[4]}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[5]}</ModalContent>
            <ModalContent>{restaurantSelected?.opening_hours?.weekday_text[6]}</ModalContent>
            </>
            ) : ( <> </> )}
                </>

            ) : (
                <>
                    <Skeleton width="10px" height="10px" />
                    <Skeleton width="10px" height="10px" />
                    <Skeleton width="10px" height="10px" />
                    <Skeleton width="10px" height="10px" />
                </>

            )   }
        </Modal>
    </Wrapper>
    );
};

export default Home;