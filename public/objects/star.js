import { CelestialBody } from "../postitionCalculators/celestialBody";
import { Orbit } from "../postitionCalculators/orbitCalculator";
import {OrbitLine} from "./orbit"
import * as THREE from 'three'

export class Star extends CelestialBody {
    constructor(radius, x, y, z, time, name, color) {
        super(radius, x, y, z)
        this.update_time(time)
        this.name = name
        this.color = color
    }

    get_mesh(widthSegs, heightSegs) {
        let material = new THREE.MeshStandardMaterial();
        material.emissive.set(this.color);
        material.emissiveIntensity = 1;

        let geometry = new THREE.SphereGeometry(this.radius, widthSegs, heightSegs);
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...this.get_position());
        sphere.name = this.name;

        return sphere;
    }

    get_light(lightIntesity) {
        let light = new THREE.PointLight(0xffffff, lightIntesity);
        light.position.set(...this.get_position());
        return light;
    }

    update_time(time) {
        this.time = time
        this.orbits.forEach((orbit) => {
            orbit.update_time(time);
        })
    }
}