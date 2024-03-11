import React, { useState, useEffect } from 'react';
import './HomePage.css';

const cards = [
	{
		id: 1,
		title: 'Card 1',
		description: 'Description de la carte 1',
	},
	{
		id: 2,
		title: 'Card 2',
		description: 'Description de la carte 2',
	},
	{
		id: 3,
		title: 'Card 3',
		description: 'Description de la carte 3',
	},
	{
		id: 4,
		title: 'Card 4',
		description: 'Description de la carte 4',
	},
	{
		id: 5,
		title: 'Card 5',
		description: 'Description de la carte 5',
	},
	{
		id: 6,
		title: 'Card 6',
		description: 'Description de la carte 6',
	},
];

export default function MyCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [startTouchX, setStartTouchX] = useState(null);
	const [endTouchX, setEndTouchX] = useState(null);

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + cards.length) % cards.length
		);
	};

	const handleTouchStart = (event) => {
		setStartTouchX(event.touches[0].clientX);
	};

	const handleTouchMove = (event) => {
		setEndTouchX(event.touches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (endTouchX && startTouchX) {
			const deltaX = endTouchX - startTouchX;

			if (deltaX > 50) {
				// Swipe vers la droite
				prevSlide();
			} else if (deltaX < -50) {
				// Swipe vers la gauche
				nextSlide();
			}
		}

		// Réinitialiser les valeurs
		setStartTouchX(null);
		setEndTouchX(null);
	};

	function Card({ title, description, index }) {
		return (
			<div
				className='card'
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div className='card-content'>
					<h2 className='card-title'>{title}</h2>
					<p className='card-description'>{description}</p>
				</div>
			</div>
		);
	}

	return (
		<div className='carousel'>
			<button onClick={prevSlide} className='prev-button'>
				Précédent
			</button>
			<div className='cards-container'>
				{[0, 1, 2].map((index) => (
					<div key={index} className='slide'>
						<Card
							index={index}
							{...cards[(currentIndex + index) % cards.length]}
						/>
					</div>
				))}
			</div>
			<button onClick={nextSlide} className='next-button'>
				Suivant
			</button>
		</div>
	);
}
