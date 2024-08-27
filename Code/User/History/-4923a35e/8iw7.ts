// main.ts
document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('homeButton') as HTMLButtonElement;
    const aboutButton = document.getElementById('aboutButton') as HTMLButtonElement;
    const homeView = document.getElementById('home') as HTMLDivElement;
    const aboutView = document.getElementById('about') as HTMLDivElement;

    aboutButton.addEventListener('click', () => {
        homeView.classList.remove('active');
        aboutView.classList.add('active');
    });

    homeButton.addEventListener('click', () => {
        aboutView.classList.remove('active');
        homeView.classList.add('active');
    });
});
