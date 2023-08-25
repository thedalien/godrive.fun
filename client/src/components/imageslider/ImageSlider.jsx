import Flickity from 'react-flickity-component';
import '../carousel/Flickity.min.css';
import './ImageSlider.css';
//import { useEffect, useState } from 'react';
//import axios from 'axios';
//import { useSelector } from 'react-redux';

const flickityOptions = {
    initialIndex: 1,
    wrapAround: true,
    pageDots: false,
}

export default function ImageSlider({images}) {

    if (!images) {
        return null;
    }

    return (
        <Flickity
            className={'imgSlider'}
            elementType={'div'}
            options={flickityOptions}
            disableImagesLoaded={false}
        >
            {images.map((image) => (
                <img draggable="false" src={image.url} alt="car" key={image.id} />
            ))}
        </Flickity>
    )
}