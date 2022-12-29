<div
className={`hero-slide__item ${props.className}`}
style={{ backgroundImage: `url(${background})` }}
>
<div className="hero-slide__item__content container">

        <div className="hero-slide__item__content__info">
             <h2 className="title">{item.title}</h2>
             <div className="overview">{item.overview}</div>
        </div>
      
        <div className="hero-slide__item__content__poster">
              <img src={apiConfig.w500Imgage(item.poster_path)} alt="" />
        </div>
</div>




</div>
