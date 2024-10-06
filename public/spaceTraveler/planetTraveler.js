export class planetTraveler {
    constructor(camera, landingControls, initialControls) {
        this.camera = camera
        this.landingControls = landingControls
        this.initialControls = initialControls
        this.initialControls.enabled = true
        this.landingControls.enabled = false
        this.controls = initialControls
        this.initialPosition = [...this.camera.position]
        console.log(this.initialPosition)
        this.isTraveled = false
        this.object = undefined
        this.object_look = undefined
    }
    travel_to(celestialObject, lookAt_object) {
        if (this.isTraveled) {
            this.update()
            return
        }
        
        this.object = celestialObject
        this.object_look = lookAt_object
        this.initialControls.enabled = false
        this.landingControls.enabled = true
        // this.initialPosition = [...this.camera.position]
        // this.camera.position.set(...celestialObject.get_position())
        // this.camera.position.y += celestialObject.radius + this.to_au(400);
        // this.camera.lookAt(...lookAt_object.get_position())
        this.look_at(this.object_look)
        this.update()
        this.camera.rotation.z -= Math.PI / 2;
        this.controls = this.landingControls
        this.isTraveled = true
        // this.controls.update(1)
    }
    look_at(object_look){
        if (this.object_look !== undefined){
            this.object_look = undefined
            return
        }
        this.object_look = object_look 
    }
    back() {
        console.log(this.initialPosition)
        this.camera.position.set(...this.initialPosition)
        this.controls = this.initialControls
        this.object = undefined
        this.object_look = undefined
        this.isTraveled = false
        this.initialControls.enabled = true
        this.landingControls.enabled = false
    }
    to_au(km) {
        return km * (1496 ** -8);
    }
    update(){
        if (this.object !== undefined){
            this.camera.position.set(...this.object.get_position())
            this.camera.position.y += this.object.radius + 0.1;
        }
        if (this.object_look !== undefined){
            this.camera.lookAt(...this.object_look.get_position())
        }
        this.controls.update(1)
    }
} 