import React from 'react';
import '../styles/News.css';

const newsData = [
  {
    id: 1,
    title: 'We also plan to make some horse saddle for export as well as local',
    image: 'images/getdownload-1.jpg'
  },
  {
    id: 2,
    title: 'Premium Safety Equipment Now Available',
    image: 'images/3-cat.jpg'
  },
  {
    id: 3,
    title: 'Expanded Product Range for Industrial Safety',
    image: 'images/7-cat.jpg'
  }
];

const News = () => {
  return (
    <div className="news">
      <section className="news__section">
        <div className="news__container">
          <h2 className="news__title">NEWS</h2>
          
          <div className="news__items">
            {newsData.map(item => (
              <article key={item.id} className="news__item">
                <div className="news__item-content">
                  <div className="news__label">NEW</div>
                  <h3 className="news__item-title">{item.title}</h3>
                </div>
                <div className="news__item-image">
                  <img src={item.image} alt={item.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
