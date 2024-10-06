import * as THREE from 'three'
import { OrbitCalculator } from '../postitionCalculators/orbitCalculator'
import { OrbitParameters } from '../postitionCalculators/orbitParameters'

export class Orbit extends OrbitCalculator {
    constructor(body, orbitParams, color, num_points){
        super(body, orbitParams)
        this.color = color
        this.num_points = num_points
        this.t0 = null
        this.t1 = null
        this.line = null
        this.name = 'orbit_' + this.body.name;
    }
    is_time_defined(){
        return this.t0 != undefined && this.t1 != undefined;
    }
    get_mesh(){
        if (this.is_time_defined() && this.body.time >= this.t0 && this.body.time <= this.t1) {
            return this.line;
        }

        let points = [];
        this.t0 = this.body.time;
        this.t1 = this.body.time + this.params.revolution_time;
        let dt = this.params.revolution_time / this.num_points;

        for (let ti = this.t0; ti <= this.t1; ti += dt) {
            let cords = this.get_position(ti);
            points.push(new THREE.Vector3(...cords))
        }

        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        let material = new THREE.LineBasicMaterial();
        material.color.set(this.color)
        this.line = new THREE.Line(geometry, material);
        this.line.name = this.name;

        return this.line;
    }
}