document.addEventListener('DOMContentLoaded', function() {
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            const targetId = this.getAttribute('href'); // Get the target div's ID
            const targetDiv = document.querySelector(targetId);

            // Scroll to the target div smoothly
            targetDiv.scrollIntoView({ behavior: 'smooth' });

            // Highlight the clicked link
            navbarLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const textElement = document.querySelector('.fade-in-text');
    const isInViewport = function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    const handleScroll = function() {
        if (isInViewport(textElement)) {
            textElement.classList.add('show');
            window.removeEventListener('scroll', handleScroll);
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    function activateLink() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    activateLink();
    window.addEventListener('scroll', activateLink);

    const observerOptions = {
        root: null, // Observe relative to the viewport
        rootMargin: '0px', // No margin
        threshold: 0.1 // Trigger when 10% of the element is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a delay before applying the `in-view` class
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, 2000); // 2000 ms = 2 seconds

                observer.unobserve(entry.target); // Stop observing once in view
            }
        });
    }, observerOptions);

    // Observe the header and skill elements
    const header = document.querySelector('.secondpage-header');
    const skills = document.querySelectorAll('.skill');

    observer.observe(header);
    skills.forEach(skill => observer.observe(skill));
    
});

