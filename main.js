import { planets } from './star_wars/planets.js';
import { species } from './star_wars/species.js';

const { name: planet_name, rotation_period: planet_rotation, orbital_period: planet_orbit, diameter: planet_diameter, 
    climate: planet_climate, gravity: planet_gravity, terrain: planet_terrain, surface_water: planet_water, population: planet_population, 
    residents: planet_residents, films: planet_films, url: planet_url } = planets;

const { name: species_name, classification: species_classification, designation: species_designation, average_height: species_height, 
    skin_colors: species_skin, hair_colors: species_hair, eye_colors: species_eye, average_lifespan: species_life, homeworld: species_world,
    language: species_language, people: species_people, films: species_films, url: species_url } = species;