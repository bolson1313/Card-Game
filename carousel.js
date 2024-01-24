document.addEventListener("DOMContentLoaded", function () 
{
      const prevButton = document.querySelector('#previous');
      const nextButton = document.querySelector('#next');
      const carousel = document.querySelector('#carouselImg');
      

      const cards = [
        //set of cards
        {src: "/images/cards/back.jpg", alt: "Set Of Cards"},
        
        //diamonds cards
        {src: "/images/cards/karo-2.jpg", alt: "Diamonds 2"},
        {src: "/images/cards/karo-3.jpg", alt: "Diamonds 3"},
        {src: "/images/cards/karo-4.jpg", alt: "Diamonds 4"},
        {src: "/images/cards/karo-5.jpg", alt: "Diamonds 5"},
        {src: "/images/cards/karo-6.jpg", alt: "Diamonds 6"},
        {src: "/images/cards/karo-7.jpg", alt: "Diamonds 7"},
        {src: "/images/cards/karo-8.jpg", alt: "Diamonds 8"},
        {src: "/images/cards/karo-9.jpg", alt: "Diamonds 9"},
        {src: "/images/cards/karo-10.jpg", alt: "Diamonds 10"},
        {src: "/images/cards/karo-as.jpg", alt: "Diamonds Ace"},
        {src: "/images/cards/karo-d.jpg", alt: "Diamonds Queen"},
        {src: "/images/cards/karo-j.jpg", alt: "Diamonds Jack"},
        {src: "/images/cards/karo-k.jpg", alt: "Diamonds King"},

        //hearts cards
        {src: "/images/cards/kier-2.jpg", alt: "Hearts 2"},
        {src: "/images/cards/kier-3.jpg", alt: "Hearts 3"},
        {src: "/images/cards/kier-4.jpg", alt: "Hearts 4"},
        {src: "/images/cards/kier-5.jpg", alt: "Hearts 5"},
        {src: "/images/cards/kier-6.jpg", alt: "Hearts 6"},
        {src: "/images/cards/kier-7.jpg", alt: "Hearts 7"},
        {src: "/images/cards/kier-8.jpg", alt: "Hearts 8"},
        {src: "/images/cards/kier-9.jpg", alt: "Hearts 9"},
        {src: "/images/cards/kier-10.jpg", alt: "Hearts 10"},
        {src: "/images/cards/kier-as.jpg", alt: "Hearts Ace"},
        {src: "/images/cards/kier-d.jpg", alt: "Hearts Queen"},
        {src: "/images/cards/kier-j.jpg", alt: "Hearts Jack"},
        {src: "/images/cards/kier-k.jpg", alt: "Hearts King"},

        //spades cards
        {src: "/images/cards/pik-2.jpg", alt: "Spades 2"},
        {src: "/images/cards/pik-3.jpg", alt: "Spades 3"},
        {src: "/images/cards/pik-4.jpg", alt: "Spades 4"},
        {src: "/images/cards/pik-5.jpg", alt: "Spades 5"},
        {src: "/images/cards/pik-6.jpg", alt: "Spades 6"},
        {src: "/images/cards/pik-7.jpg", alt: "Spades 7"},
        {src: "/images/cards/pik-8.jpg", alt: "Spades 8"},
        {src: "/images/cards/pik-9.jpg", alt: "Spades 9"},
        {src: "/images/cards/pik-10.jpg", alt: "Spades 10"},
        {src: "/images/cards/pik-as.jpg", alt: "Spades Ace"},
        {src: "/images/cards/pik-d.jpg", alt: "Spades Queen"},
        {src: "/images/cards/pik-j.jpg", alt: "Spades Jack"},
        {src: "/images/cards/pik-k.jpg", alt: "Spades King"},

        //club cards
        {src: "/images/cards/trefl-2.jpg", alt: "Clubs 2"},
        {src: "/images/cards/trefl-3.jpg", alt: "Clubs 3"},
        {src: "/images/cards/trefl-4.jpg", alt: "Clubs 4"},
        {src: "/images/cards/trefl-5.jpg", alt: "Clubs 5"},
        {src: "/images/cards/trefl-6.jpg", alt: "Clubs 6"},
        {src: "/images/cards/trefl-7.jpg", alt: "Clubs 7"},
        {src: "/images/cards/trefl-8.jpg", alt: "Clubs 8"},
        {src: "/images/cards/trefl-9.jpg", alt: "Clubs 9"},
        {src: "/images/cards/trefl-10.jpg", alt: "Clubs 10"},
        {src: "/images/cards/trefl-as.jpg", alt: "Clubs Ace"},
        {src: "/images/cards/trefl-d.jpg", alt: "Clubs Queen"},
        {src: "/images/cards/trefl-j.jpg", alt: "Clubs Jack"},
        {src: "/images/cards/trefl-k.jpg", alt: "Clubs King"},

        //front
        {src: "/images/cards-description.jpg", alt: "Cards Description"}
    ]
    
      let index = 0;
    
      updateCarousel();
    
      prevButton.addEventListener('click', () => {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel('previous');
      });
    
      //przycisk następne zdjęcie
      nextButton.addEventListener('click', () => {
        index = (index + 1) % cards.length;
        updateCarousel('next');
      });


      function updateCarousel(direction) {
        console.log("karuzela");
        const figure = document.createElement('figure');
        const img = document.createElement('img');
      
        img.src = cards[index].src;
        img.alt = cards[index].alt;
        
        figure.style.opacity = '0';
        figure.appendChild(img);
        
    
        if (direction == 'previous') {
            figure.style.transform = 'translateX(-100%)';
        } else {
            figure.style.transform = 'translateX(100%)';
        }
        carousel.innerHTML = '';
        carousel.appendChild(figure);
        // Wywołaj reflow przed dodaniem klasy animacji
        void figure.offsetWidth;
        figure.style.opacity = '1';
        figure.style.transform = 'translateX(0)';
    
        // Dodaj obsługę zdarzeń dla powiększenia zdjęcia przy najechaniu myszką
        figure.addEventListener('mouseover', () => {
            img.style.transition = '0.5s ease-in';
            img.style.transform = 'scale(1.05)';
        });
    
        figure.addEventListener('mouseout', () => {
            img.style.transition = '0.5s ease-out';
            img.style.transform = 'scale(1)';
        });
      }
});