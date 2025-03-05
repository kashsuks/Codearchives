// components/HomePage.js
import React from 'react';

function HomePage() {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontSize: '1.1rem' }}> {/* Increased font size */}
            <h1 style={{ fontSize: '2.5rem' }}>Welcome to Codearchives</h1> {/* Increased heading font size */}
            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>What is Codearchives?</h2> {/* Increased heading font size */}
                <p>
                    Codearchives is a platform dedicated to providing a comprehensive collection of coding problems and resources.
                    Our goal is to help programmers of all levels improve their problem-solving skills and expand their knowledge.
                </p>
            </section>
            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Our Mission</h2> {/* Increased heading font size */}
                <p>
                    Our mission is to create a valuable resource for the coding community by curating high-quality problems,
                    providing clear explanations, and fostering a collaborative learning environment.
                </p>
            </section>
            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Our Creators</h2> {/* Increased heading font size */}
                <p>
                    Codearchives was created by a team of passionate developers who believe in the power of shared knowledge
                    and continuous learning. We are committed to maintaining and expanding this platform for the benefit of all.
                    The main creators are:
                    <ul>
                        <li>Kashyap Sukshavasi: High School Competitive Programmer</li>
                        <li>Sean Nie: High School Aviation Enthusaist & Competitve Programmer</li>
                    </ul>
                </p>
            </section>
            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>How You Can Contribute</h2> {/* Increased heading font size */}
                <p>
                    There are many ways you can contribute to Codearchives:
                </p>
                <ul>
                    <li>Submit new coding problems and solutions.</li>
                    <li>Provide feedback and suggestions for improvements.</li>
                    <li>Help improve existing problem descriptions and explanations.</li>
                    <li>Share Codearchives with your fellow programmers.</li>
                </ul>
            </section>
        </div>
    );
}

export default HomePage;