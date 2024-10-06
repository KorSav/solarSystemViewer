import * as THREE from 'three'

export class CelestialBody {
    constructor(radius, x, y, z) {
        this.radius = radius;
        // console.log('indise')
        this.x = x;
        this.y = y;
        this.z = z;
        this.orbits = [];
    }
    is_position_set() {
        let is_defined = this.x !== undefined &&
            this.y !== undefined &&
            this.z !== undefined;

        return is_defined;
    }
    add_orbit(orbit) {
        this.orbits.push(orbit);
    }
    get_position() {
        return [this.x, this.y, this.z];
    }
    get_satelites() {
        let res = [];
        for (let orbit of this.orbits) {
            res.push(orbit.body);
        }
        return res;
    }
}
