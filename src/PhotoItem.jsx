import React from 'react';

const PhotoItem = ({ photo }) => {
  return (
    <li className="photo-item">
      <img className="thumbnail" src={photo.thumbnailUrl} alt={photo.title} />
      <p className="title">{photo.title}</p>
    </li>
  );
};

export default PhotoItem;
