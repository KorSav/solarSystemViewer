import * as THREE from 'three'

export class SystemScene extends THREE.Scene {
    constructor(star, time) {
        super();
        this.star = star;
        this.star.update_time(time);
        this.add(star.get_mesh());
        this.add(star.get_light(100));
        for (let orbit of this.star.orbits){
            this.add(orbit.get_mesh())
        }
    }

    add_planets(){
        for (let planet of this.star.get_satelites()){
            this.add(planet.get_mesh());
        }
    }

    add_orbits(){
        for (let orbit of this.star.orbits){
            this.getObjectByName(orbit.name).visible = true
        }
    }

    remove_orbits(){
        for (let orbit of this.star.orbits){
            this.getObjectByName(orbit.name).visible = false
        }
    }
    
    toggle_orbits(){
        for (let orbit of this.star.orbits){
            let obj = this.getObjectByName(orbit.name); 
            obj.visible = !obj.visible
        }
    }

    update_time(time){
        this.star.update_time(time);
        // redraw planets
        for (let planet of this.star.get_satelites()){
            let obj = this.getObjectByName(planet.name);
            obj.position.set(...planet.get_position());
        }
    }
}