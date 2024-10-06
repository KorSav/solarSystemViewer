import * as THREE from 'three'
import { CelestialBody } from "../postitionCalculators/celestialBody";

export class Planet extends CelestialBody{
    constructor(radius, name, time, color) {
        super(radius, undefined, undefined, undefined)
        this.update_time(time)
        this.name = name
        this.color = color
    }

    get_mesh(widthSegs, heightSegs) {
        let material = new THREE.MeshLambertMaterial();
        material.color.set(this.color);
        
        let geometry = new THREE.SphereGeometry(this.radius, widthSegs, heightSegs);
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...this.get_position());
        sphere.name = this.name;

        return sphere;
    }

    update_time(time) {
        this.time = time
        this.orbits.forEach((orbit) => {
            orbit.update_time(time);
        })
    }
}