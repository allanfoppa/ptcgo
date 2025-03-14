import img from "@assets/images/placeholder-image.webp";

export const PlaceholderText = () => {
	return <p data-testid="placeholder-text">Error to load</p>;
};

export const PlaceholderImage = () => {
	return <img data-testid="placeholder-image" src={img} alt="Asset not loaded" />;
};
