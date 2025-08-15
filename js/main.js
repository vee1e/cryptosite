const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.data-sector');
const landingCtaMode = 'recruitment';
const niteCtfUrl = 'https://nitectf.cryptonitemit.in/';

navItems.forEach(anchor => {
    anchor.setAttribute('data-text', anchor.textContent);

    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        }
    });
});

function setActiveLinkById(id) {
    if (!id) return;
    navItems.forEach(item => {
        item.classList.remove('active-link');
        if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active-link');
        }
    });
}

if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLinkById(entry.target.id);
            }
        });
    }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });
} else {
    function updateActiveNavLinkFallback() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });
        setActiveLinkById(currentSectionId);
    }
    window.addEventListener('scroll', updateActiveNavLinkFallback, { passive: true });
    updateActiveNavLinkFallback();
}

const year = new Date().getFullYear();
const footerTextElement = document.getElementById('footer-text');
if (footerTextElement) {
    footerTextElement.textContent = `© ${year} Cryptonite - MIT Manipal. All rights reserved.`;
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeFooter();
    initializeLandingCTA();
});

function initializeNavigation() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        const mobileNavItems = mobileNav.querySelectorAll('.mobile-nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            if (!hamburgerMenu.contains(event.target) && !mobileNav.contains(event.target)) {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }
}

// Initialize immediately in case DOMContentLoaded has already fired
initializeNavigation();

function initializeScrollEffects() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollToTopBtn.addEventListener('click', function() {
            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    }
}

function initializeFooter() {
    const footerTextElement = document.getElementById('footer-text');
    if (footerTextElement) {
        footerTextElement.textContent = `© ${year} Cryptonite - MIT Manipal. All rights reserved.`;
    }
}

function initializeLandingCTA() {
    const btn = document.querySelector('.recruitment-btn');
    if (!btn) return;
    if (landingCtaMode === 'nitectf') {
         btn.setAttribute('href', niteCtfUrl);
         btn.setAttribute('target', '_blank');
         btn.innerHTML = '<i class="fas fa-bolt"></i> niteCTF IS LIVE!';
    } else if (landingCtaMode === 'off') {
         btn.remove();
    }
}

async function fetchCTFtimeStats() {
    const yearlyChart = document.getElementById('yearly-chart');
    if (!yearlyChart) return;

    yearlyChart.innerHTML = '<div class="loading-spinner">Loading CTFtime data...</div>';

    const targetUrl = 'https://ctftime.org/api/v1/teams/62713/';
    const proxyBuilders = [
        (url) => 'https://cors-anywhere.herokuapp.com/' + url,
        (url) => 'https://api.allorigins.win/get?url=' + encodeURIComponent(url),
        (url) => 'https://corsproxy.io/?' + encodeURIComponent(url),
        (url) => 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
        (url) => 'https://thingproxy.freeboard.io/fetch/' + url,
    ];

    const controllers = [];
    const timeouts = [];

    const requests = proxyBuilders.map((build, index) => {
        const controller = new AbortController();
        controllers.push(controller);
        const individualTimeout = 3000 + (index * 500);
        const timeoutId = setTimeout(() => controller.abort(), individualTimeout);
        timeouts.push(timeoutId);

        return fetch(build(targetUrl), {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const actualData = data.contents ? JSON.parse(data.contents) : data;
                if (!actualData || !actualData.rating) throw new Error('Invalid data format received from CTFtime API');
                return actualData;
            });
    });

    const globalTimeout = setTimeout(() => {
        controllers.forEach(c => { if (!c.signal.aborted) c.abort(); });
    }, 5000);

    try {
        const data = await Promise.any(requests);
        clearTimeout(globalTimeout);
        displayCTFtimeStats(data);
    } catch (error) {
        clearTimeout(globalTimeout);
        handleFetchError(error);
    } finally {
        timeouts.forEach(id => clearTimeout(id));
        controllers.forEach(c => { if (!c.signal.aborted) c.abort(); });
    }
}

function handleFetchError(error) {
    console.error('All proxies failed:', error);

    let errorMessage = 'Failed to load CTFtime data from all sources.';
    if (error.name === 'AbortError') {
        errorMessage = 'All requests timed out. Please check your connection.';
    }

    const yearlyChart = document.getElementById('yearly-chart');
    if (yearlyChart) {
        yearlyChart.innerHTML = `<div class="error-message">${errorMessage}<br><button onclick="fetchCTFtimeStats()" class="retry-btn">Retry</button></div>`;
    }

    const statElements = [
        'country-rank', 'global-rank', 'total-points', 'niteCTF-score'
    ];

    statElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = 'N/A';
    });

    displayFallbackData();
}

function displayFallbackData() {
    updateDataSourceIndicator('fallback');

    const fallbackData = {
        rating: {
            "2025": {
                "rating_place": 28,
                "organizer_points": 79.74,
                "rating_points": 457.813339549,
                "country_place": 2
            },
            "2024": {
                "rating_place": 65,
                "organizer_points": 58.66,
                "rating_points": 395.063698537,
                "country_place": 3
            },
            "2023": {
                "rating_place": 217,
                "organizer_points": 48.0,
                "rating_points": 169.494950938,
                "country_place": 5
            },
            "2022": {
                "rating_place": 196,
                "organizer_points": 44.6,
                "rating_points": 148.387899537,
                "country_place": 9
            },
            "2021": {
                "rating_place": 152,
                "organizer_points": 44.6,
                "rating_points": 146.749375686,
                "country_place": 11
            },
            "2019": {
                "rating_place": 815,
                "organizer_points": 0,
                "rating_points": 30.7355743154,
                "country_place": 39
            },
            "2018": {
                "rating_place": null,
                "organizer_points": 0,
                "rating_points": 0,
                "country_place": null
            }
        }
    };

    displayCTFtimeStats(fallbackData);
}

function displayCTFtimeStats(data) {
    const currentYear = '2025';
    const rating = data.rating;

    updateDataSourceIndicator('live');

    if (rating && rating[currentYear]) {
        const currentYearData = rating[currentYear];

        document.getElementById('country-rank').textContent =
            currentYearData.country_place ? `#${currentYearData.country_place}` : '-';
        document.getElementById('global-rank').textContent =
            currentYearData.rating_place ? `#${currentYearData.rating_place}` : '-';
        document.getElementById('total-points').textContent =
            currentYearData.rating_points ? Math.round(currentYearData.rating_points) : '-';
        document.getElementById('niteCTF-score').textContent =
            currentYearData.organizer_points ? (currentYearData.organizer_points / 2).toFixed(2) : '-';
    }

    const yearlyChart = document.getElementById('yearly-chart');
    yearlyChart.innerHTML = createYearlyChart(rating);
}

function updateDataSourceIndicator(type) {
    const dataSourceElement = document.getElementById('ctftime-data-source');
    const dataSourceText = dataSourceElement.querySelector('.data-source-text');

    if (type === 'live') {
        dataSourceElement.style.background = 'rgba(16, 185, 129, 0.1)';
        dataSourceElement.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        dataSourceText.textContent = 'CTFTIME API';
        dataSourceText.className = 'data-source-text';
    } else {
        dataSourceElement.style.background = 'rgba(255, 170, 0, 0.1)';
        dataSourceElement.style.borderColor = 'rgba(255, 170, 0, 0.3)';
        dataSourceText.textContent = 'Using cached data (API unavailable)';
        dataSourceText.className = 'data-source-text fallback';
    }
}

function createYearlyChart(rating) {
    if (!rating) return '<div class="error-message">No rating data available</div>';

    console.log('All rating data:', rating);

    const years = Object.keys(rating).filter(year =>
        year >= '2018' && rating[year] && (rating[year].rating_points !== undefined || rating[year].country_place)
    ).sort();

    console.log('Filtered years:', years);

    if (years.length === 0) return '<div class="error-message">No yearly data available</div>';

    let chartHTML = '<div class="yearly-line-chart">';
    chartHTML += '<div class="chart-area">';

    const points = [];
    years.forEach(year => {
        const yearData = rating[year];
        if (yearData && (yearData.rating_points !== undefined || yearData.country_place)) {
            const ratingPoints = yearData.rating_points || 0; // Treat undefined as 0
            const maxRating = Math.max(...years.map(y => rating[y]?.rating_points || 0));
            const minRating = Math.min(...years.map(y => rating[y]?.rating_points || 0));
            const range = maxRating - minRating;
            const pointHeight = range > 0 ? ((ratingPoints - minRating) / range) * 100 : 0;
            const xPos = (years.indexOf(year) / (years.length - 1)) * 100;

            points.push({ x: xPos, y: pointHeight });

            console.log(`Year ${year}: rating=${ratingPoints}, height=${pointHeight}%, x=${xPos}%`);

            chartHTML += `
                <div class="chart-point" style="left: ${xPos}%; bottom: ${pointHeight}%">
                    <div class="point"></div>
                </div>
            `;
        }
    });

    if (points.length > 1) {
        const pathData = points.map((point, index) => {
            if (index === 0) return `M ${point.x} ${100 - point.y}`;
            return `L ${point.x} ${100 - point.y}`;
        }).join(' ');

        const areaPath = `${pathData} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;

        chartHTML += `
            <svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#00ff88;stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:#00ff88;stop-opacity:0.1" />
                    </linearGradient>
                </defs>
                <path class="chart-area-fill" d="${areaPath}" />
                <path class="chart-line" d="${pathData}" stroke="#00ff88" stroke-width="2" fill="none" />
            </svg>
        `;
    }

    chartHTML += '</div>'; // Close chart-area

    // Add x-axis labels (exclude 2018)
    chartHTML += '<div class="x-axis">';
    years.forEach((year, idx) => {
        if (year !== '2018') {
            const xPos = (years.indexOf(year) / (years.length - 1)) * 100;
            let xAlign = '-50%';
            if (idx === 0) xAlign = '0%';
            if (idx === years.length - 1) xAlign = '-100%';
            chartHTML += `<div class="x-tick" style="left: ${xPos}%; --x-align: ${xAlign}"><span>${year}</span></div>`;
        }
    });
    chartHTML += '</div>';

    const maxRating = Math.max(...years.map(y => rating[y]?.rating_points || 0));
    const minRating = 0; // Always start from 0
    const range = maxRating - minRating;

    chartHTML += '<div class="y-axis">';
    chartHTML += '<div class="y-label">Rating Points</div>';
    chartHTML += `<div class="y-tick" style="bottom: 0%"><span>0</span></div>`;
    chartHTML += `<div class="y-tick" style="bottom: 25%"><span>${Math.round(maxRating * 0.25)}</span></div>`;
    chartHTML += `<div class="y-tick" style="bottom: 50%"><span>${Math.round(maxRating * 0.5)}</span></div>`;
    chartHTML += `<div class="y-tick" style="bottom: 75%"><span>${Math.round(maxRating * 0.75)}</span></div>`;
    chartHTML += `<div class="y-tick" style="bottom: 100%"><span>${Math.round(maxRating)}</span></div>`;
    chartHTML += '</div>';

    chartHTML += '</div>'; // Close yearly-line-chart
    return chartHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCTFtimeStats();
    initializeNavigation();
    initializeScrollEffects();
    initializeFooter();
    initializeLandingCTA();
});
